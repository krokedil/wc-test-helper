import { APIRequestContext, Page, request } from "@playwright/test";
import { CreateCoupons, CreateProducts, CreateShippingZonesWithMethods, CreateTaxClassesWithRates, DeleteCoupons, DeleteProducts, DeleteShippingZones, DeleteTaxClasses, SetWcGeneralSettings } from "./setup";

export * as Types from "./types"
export * as WcPages from "./pages/woocommerce"
export * as Reporters from "./reporters"

const {
    ADMIN_USERNAME,
    ADMIN_PASSWORD,
} = process.env;

export const AdminLogin = async (page: Page) => {
    await page.goto('/wp-admin');
    await page.locator('#user_login').click();
    await page.locator('#user_login').fill(ADMIN_USERNAME ?? 'admin');
    await page.locator('#user_pass').click();
    await page.locator('#user_pass').fill(ADMIN_PASSWORD ?? 'password');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForLoadState('networkidle');
}

export const GetWcApiClient = async ( baseURL: string, consumerKey: string, consumerSecret: string ): Promise<APIRequestContext> => {
    return await request.newContext({
        baseURL: `${baseURL}/wp-json/wc/v3/`,
        extraHTTPHeaders: {
            Authorization: `Basic ${Buffer.from(
                `${consumerKey ?? 'admin'}:${consumerSecret ?? 'password'}`
            ).toString('base64')}`,
        },
    });
}

export const GetSystemReportData = async (wcApiClient: APIRequestContext) => {
    // Get the system status.
    const response = await wcApiClient.get('system_status');
    const status = await response.json();

    // Set the environment variables.
    process.env.WC_VERSION = status.environment.version.trim().split(' ')[0];
    process.env.WP_VERSION = status.environment.wp_version.trim().split(' ')[0];
    process.env.PHP_VERSION = status.environment.php_version.trim().split(' ')[0];

    // Get the name and plugin version of the plugin from the active_plugins.
    const activePlugins = status.active_plugins;
    const plugin = activePlugins.find((activePlugin: any) => activePlugin.plugin.includes('klarna-payments-for-woocommerce'));

    if (plugin) {
        process.env.PLUGIN_NAME = plugin.name;
        process.env.PLUGIN_VERSION = plugin.version;
    }
}

export const Setup = async (wcApiClient: APIRequestContext) => {
    // Set all the WC general settings, map wcSettings to
    await SetWcGeneralSettings(wcApiClient);

    // Create all the tax classes and tax rates.
    await CreateTaxClassesWithRates(wcApiClient);

    // Create all the shipping zones.
    await CreateShippingZonesWithMethods(wcApiClient);

    // Create all the coupons.
    await CreateCoupons(wcApiClient);

    // Create all the products.
    await CreateProducts(wcApiClient);
}

export const Teardown = async (wcApiClient: APIRequestContext) => {
    // Delete all the products.
    await DeleteProducts(wcApiClient);

    // Delete all the coupons.
    await DeleteCoupons(wcApiClient);

    // Delete all the shipping zones.
    await DeleteShippingZones(wcApiClient);

    // Delete all the tax classes.
    await DeleteTaxClasses(wcApiClient);
}

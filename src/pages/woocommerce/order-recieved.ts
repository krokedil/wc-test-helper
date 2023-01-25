import { APIRequestContext, Locator, Page } from '@playwright/test';

export default class OrderRecieved {
    readonly page: Page;
    readonly wcApiClient: APIRequestContext;

    readonly orderIdLocator: Locator;

    constructor(page: Page, wcApiClient: APIRequestContext) {
        this.page = page;
        this.wcApiClient = wcApiClient;

        this.orderIdLocator = this.page.locator('li.woocommerce-order-overview__order.order > strong');
    }

    async goto() {
        // No goto for this page, it's reached by placing an order and then redirected to it.
    }

    async getOrderId(): Promise<string> {
        const orderId = await this.orderIdLocator.innerText();
        return orderId;
    }

    async getOrder(): Promise<any> {
        const orderId = await this.getOrderId();
        const response = await this.wcApiClient.get(`orders/${orderId}`);
        const order = await response.json();
        return order;
    }
}

import { APIRequestContext, Page } from '@playwright/test';

export default class Cart {
    readonly page: Page;
    readonly wcApiClient: APIRequestContext | undefined;

    constructor(page: Page, wcApiClient?: APIRequestContext) {
        this.page = page;
        this.wcApiClient = wcApiClient;
    }

    async goto() {
        await this.page.goto('/cart');
    }

    async addtoCart(sku: string | string[]) {
        if (Array.isArray(sku)) {
            await this.addtoCartMultiple(sku);
        } else {
            await this.addtoCartSingle(sku);
        }
    }

    async addtoCartSingle(sku: string) {
        const product = await this.getProduct(sku);

        await this.page.goto(`/cart/?add-to-cart=${product.id}`);
    }

    async addtoCartMultiple(skus: string[]) {
        // Each SKU can be passed multiple times to add multiple products, so create a temporary object for each SKU, with the value being the number of times it should be added.
        const skusToAdd: { [key: string]: number } = {};

        for (const sku of skus) {
            if (skusToAdd[sku]) {
                skusToAdd[sku]++;
            } else {
                skusToAdd[sku] = 1;
            }
        }

        const products = await this.getProducts(skus);

        for (const product of products) {
            for (let i = 0; i < skusToAdd[product.sku]; i++) {
                await this.page.goto(`/cart/?add-to-cart=${product.id}`);
            }
        }
    }

    async getProduct(sku: string): Promise<any> {
        if (!this.wcApiClient) {
            throw new Error('No WooCommerce API client');
        }

        const response = await this.wcApiClient.get(`products`, {
            params: {
                sku: sku,
            }
        });

        const product = await response.json();

        return product;
    }

    async getProducts(skus: string[]): Promise<any[] | any> {
        if (!this.wcApiClient) {
            throw new Error('No WooCommerce API client');
        }

        const response = await this.wcApiClient.get(`products`, {
            params: {
                sku: skus.join(','),
            }
        });

        const products = await response.json();

        return products;
    }
}

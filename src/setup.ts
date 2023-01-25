import { APIRequestContext } from "playwright-chromium";
import { Coupon, Product, ShippingZone, TaxClass } from "./types";

const wcSettings: { [key: string]: string } = {
    woocommerce_price_num_decimals: "2",
    woocommerce_price_decimal_sep: ",",
    woocommerce_price_thousand_sep: ".",
    woocommerce_currency: "SEK",
    woocommerce_currency_pos: "right_space",
    woocommerce_default_country: "SE",
    woocommerce_calc_taxes: "yes",
    woocommerce_terms_page_id: "3",
};

const TaxClasses: TaxClass[] = [
    {
        name: "25",
        rates: [
            {
                name: "25% VAT",
                rate: "25",
                shipping: true,
            },
        ],
    },
    {
        name: "12",
        rates: [
            {
                name: "12% VAT",
                rate: "12",
                shipping: true,
            },
        ],
    },
    {
        name: "06",
        rates: [
            {
                name: "6% VAT",
                rate: "6",
                shipping: true,
            },
        ],
    },
    {
        name: "00",
        rates: [
            {
                name: "00",
                rate: "0",
                shipping: true,
            },
        ],
    },
];

const products: Product[] = [
    {
        name: "Simple 25%",
        sku: "simple-25",
        type: "simple",
        regular_price: 99.99,
        stock_quantity: 100,
        stock_status: "instock",
        manage_stock: true,
        tax_class: "25",
        categories: ["Simple"],
        tags: ["Simple"],
        images: [
            "https://picsum.photos/300/300.jpg?random=1",
            "https://picsum.photos/300/300.jpg?random=2",
            "https://picsum.photos/300/300.jpg?random=3",
        ],
    },
    {
        name: "Simple 12%",
        sku: "simple-12",
        type: "simple",
        regular_price: 158.39,
        stock_quantity: 100,
        stock_status: "instock",
        manage_stock: true,
        tax_class: "12",
        categories: ["Simple"],
        tags: ["Simple"],
        images: [
            "https://picsum.photos/300/300.jpg?random=4",
            "https://picsum.photos/300/300.jpg?random=5",
            "https://picsum.photos/300/300.jpg?random=6",
        ],
    },
    {
        name: "Simple 06%",
        sku: "simple-06",
        type: "simple",
        regular_price: 84.49,
        sale_price: 50,
        stock_quantity: 100,
        stock_status: "instock",
        manage_stock: true,
        tax_class: "06",
        categories: ["Simple"],
        tags: ["Simple"],
        images: [
            "https://picsum.photos/300/300.jpg?random=7",
            "https://picsum.photos/300/300.jpg?random=8",
            "https://picsum.photos/300/300.jpg?random=9",
        ],
    },
    {
        name: "Simple 00%",
        sku: "simple-00",
        type: "simple",
        regular_price: 9.99,
        stock_quantity: 100,
        stock_status: "instock",
        manage_stock: true,
        tax_class: "00",
        categories: ["Simple"],
        tags: ["Simple"],
        images: [
            "https://picsum.photos/300/300.jpg?random=10",
            "https://picsum.photos/300/300.jpg?random=11",
            "https://picsum.photos/300/300.jpg?random=12",
        ],
    },
    {
        name: "Simple Virtual/Downloadable 25%",
        sku: "simple-virtual-downloadable-25",
        type: "simple",
        regular_price: 99.99,
        categories: ["Simple", "Virtual", "Downloadable"],
        tags: ["Simple", "Virtual", "Downloadable"],
        images: [
            "https://picsum.photos/300/300.jpg?random=13",
            "https://picsum.photos/300/300.jpg?random=14",
            "https://picsum.photos/300/300.jpg?random=15",
        ],
        virtual: true,
        downloadable: true,
    },
    {
        name: "Simple Virtual/Downloadable 12%",
        sku: "simple-virtual-downloadable-12",
        type: "simple",
        regular_price: 158.39,
        tax_class: "12",
        categories: ["Simple", "Virtual", "Downloadable"],
        tags: ["Simple", "Virtual", "Downloadable"],
        images: [
            "https://picsum.photos/300/300.jpg?random=16",
            "https://picsum.photos/300/300.jpg?random=17",
            "https://picsum.photos/300/300.jpg?random=18",
        ],
        virtual: true,
        downloadable: true,
    },
    {
        name: "Simple Virtual/Downloadable 6%",
        sku: "simple-virtual-downloadable-06",
        type: "simple",
        regular_price: 84.49,
        tax_class: "25",
        categories: ["Simple", "Virtual", "Downloadable"],
        tags: ["Simple", "Virtual", "Downloadable"],
        images: [
            "https://picsum.photos/300/300.jpg?random=19",
            "https://picsum.photos/300/300.jpg?random=20",
            "https://picsum.photos/300/300.jpg?random=21",
        ],
        virtual: true,
        downloadable: true,
    },
    {
        name: "Simple Virtual/Downloadable 0%",
        sku: "simple-virtual-downloadable-00",
        type: "simple",
        regular_price: 9.99,
        tax_class: "25",
        categories: ["Simple", "Virtual", "Downloadable"],
        tags: ["Simple", "Virtual", "Downloadable"],
        images: [
            "https://picsum.photos/300/300.jpg?random=22",
            "https://picsum.photos/300/300.jpg?random=23",
            "https://picsum.photos/300/300.jpg?random=24",
        ],
        virtual: true,
        downloadable: true,
    },
    {
        name: "Simple Virtual 25%",
        sku: "simple-virtual-25",
        type: "simple",
        regular_price: 199.99,
        tax_class: "25",
        categories: ["Simple", "Virtual"],
        tags: ["Simple", "Virtual"],
        images: [
            "https://picsum.photos/300/300.jpg?random=22",
            "https://picsum.photos/300/300.jpg?random=23",
            "https://picsum.photos/300/300.jpg?random=24",
        ],
        virtual: true,
        downloadable: false,
    },
    {
        name: "Simple Downloadable 25%",
        sku: "simple-downloadable-25",
        type: "simple",
        regular_price: 199.99,
        tax_class: "25",
        categories: ["Simple", "Downloadable"],
        tags: ["Simple", "Downloadable"],
        images: [
            "https://picsum.photos/300/300.jpg?random=22",
            "https://picsum.photos/300/300.jpg?random=23",
            "https://picsum.photos/300/300.jpg?random=24",
        ],
        virtual: false,
        downloadable: true,
    },
    {
        name: "Variable 25%",
        sku: "variable-25",
        type: "variable",
        categories: ["Variable"],
        tags: ["Variable"],
        images: [
            "https://picsum.photos/300/300.jpg?random=25",
            "https://picsum.photos/300/300.jpg?random=26",
            "https://picsum.photos/300/300.jpg?random=27",
        ],
        attributes: [
            {
                name: "Color",
                options: ["Red", "Blue", "Green"],
                visible: false,
                variation: true,
            },
        ],
        variations: [
            {
                sku: "variable-25-red",
                regular_price: 26.75,
                stock_quantity: 100,
                stock_status: "instock",
                manage_stock: true,
                tax_class: "25",
                attributes: [
                    {
                        name: "Color",
                        option: "Red",
                    },
                ],
            },
            {
                sku: "variable-25-blue",
                regular_price: 53.27,
                stock_quantity: 100,
                stock_status: "instock",
                manage_stock: true,
                tax_class: "25",
                attributes: [
                    {
                        name: "Color",
                        option: "Blue",
                    },
                ],
            },
            {
                sku: "variable-25-green",
                regular_price: 96.37,
                stock_quantity: 100,
                stock_status: "instock",
                manage_stock: true,
                tax_class: "25",
                attributes: [
                    {
                        name: "Color",
                        option: "Green",
                    },
                ],
            },
        ],
    },
    {
        name: "Variable 12%",
        sku: "variable-12",
        type: "variable",
        categories: ["Variable"],
        tags: ["Variable"],
        images: [
            "https://picsum.photos/300/300.jpg?random=28",
            "https://picsum.photos/300/300.jpg?random=29",
            "https://picsum.photos/300/300.jpg?random=30",
        ],
        attributes: [
            {
                name: "Color",
                options: ["Red", "Blue", "Green"],
                visible: false,
                variation: true,
            },
        ],
        variations: [
            {
                sku: "variable-12-red",
                regular_price: 73.21,
                stock_quantity: 100,
                stock_status: "instock",
                manage_stock: true,
                tax_class: "12",
                attributes: [
                    {
                        name: "Color",
                        option: "Red",
                    },
                ],
            },
            {
                sku: "variable-12-blue",
                regular_price: 21.67,
                stock_quantity: 100,
                stock_status: "instock",
                manage_stock: true,
                tax_class: "12",
                attributes: [
                    {
                        name: "Color",
                        option: "Blue",
                    },
                ],
            },
            {
                sku: "variable-12-green",
                regular_price: 55.91,
                stock_quantity: 100,
                stock_status: "instock",
                manage_stock: true,
                tax_class: "12",
                attributes: [
                    {
                        name: "Color",
                        option: "Green",
                    },
                ],
            },
        ],
    },
];

const coupons: Coupon[] = [
    {
        code: "fixed-10",
        amount: 10,
        discount_type: "fixed_cart",
    },
    {
        code: "percent-10",
        amount: 10,
        discount_type: "percent",
    },
    {
        code: "percent-100",
        amount: 100,
        discount_type: "percent",
    },
    {
        code: "totalfreeshipping",
        amount: 0,
        discount_type: "percent",
        free_shipping: true,
    }
];

const shippingZones: ShippingZone[] = [
    {
        name: "Everywhere",
        methods: [
            {
                id: "flat_rate",
                title: "Flat Rate",
                settings: { "cost": "49" },
            },
            {
                id: "free_shipping",
                title: "Free Shipping",
            }
        ],
    },
];

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

const SetWcGeneralSettings = async (wcApiClient: APIRequestContext) => {
    await wcApiClient.post("settings/general/batch", {
        data: {
            update: Object.entries(wcSettings).map(([key, value]) => ({
                id: key,
                value: value,
            })),
        }
    });
}

const CreateTaxClassesWithRates = async (wcApiClient: APIRequestContext) => {
    await Promise.all(
        TaxClasses.map(async (tax_class) => {
            const response = await wcApiClient.post("taxes/classes", {
                data: {
                    name: tax_class.name,
                },
            });
            const data = await response.json();

            await Promise.all(
                tax_class.rates.map(async (rate) => {
                    await wcApiClient.post("taxes", {
                        data: {
                            class: data.slug,
                            name: rate.name,
                            rate: rate.rate,
                            shipping: rate.shipping,
                        },
                    });
                })
            );
        })
    );
}

const CreateShippingZonesWithMethods = async (wcApiClient: APIRequestContext) => {
    await Promise.all(
        shippingZones.map(async (zone) => {
            const response = await wcApiClient.post("shipping/zones", {
                data: {
                    name: zone.name,
                },
            });
            const data = await response.json();

            if (zone?.methods?.length === 0 ?? true) {
                return;
            }

            await Promise.all(
                zone!.methods!.map(async (method) => {
                    await wcApiClient.post(`shipping/zones/${data.id}/methods`, {
                        data: {
                            method_id: method.id,
                            settings: method.settings,
                        },
                    });
                })
            );
        })
    );
}

const CreateCoupons = async (wcApiClient: APIRequestContext) => {
    await wcApiClient.post("coupons/batch", {
        data: {
            create: coupons.map((coupon) => ({
                code: coupon.code,
                amount: coupon.amount,
                discount_type: coupon.discount_type,
                free_shipping: coupon.free_shipping,
            }))
        }
    });
}

const CreateProducts = async (wcApiClient: APIRequestContext) => {
    // First create all products.
    const response = await wcApiClient.post("products/batch", {
        data: {
            create: products.map((product) => ({
                name: product.name,
                sku: product.sku,
                type: product.type,
                regular_price: product.regular_price,
                stock_quantity: product.stock_quantity,
                stock_status: product.stock_status,
                manage_stock: product.manage_stock,
                tax_class: product.tax_class,
                attributes: product.attributes,
            }))
        }
    });

    const data = await response.json();

    // Then create all variations for all the variable products.
    await Promise.all(
        data.create.map(async (product: any, index: number) => {
            if (product.type === "variable") {
                // Find the product in the products array with matching sku.
                const productIndex = products.findIndex((p) => p.sku === product.sku);
                const variations = products[productIndex].variations;

                if (!variations) {
                    return;
                }

                await wcApiClient.post(`products/${product.id}/variations/batch`, {
                    data: {
                        create: variations.map((variation) => ({
                            sku: variation.sku,
                            regular_price: variation.regular_price,
                            attributes: variation.attributes,
                        }))
                    }
                });
            }
        })
    );
}

const DeleteProducts = async (wcApiClient: APIRequestContext) => {
    // Get a list of all the products with the skus we created.
    const response = await wcApiClient.get("products", {
        params: {
            per_page: 100,
            sku: products.map((product) => product.sku).join(","),
        }
    });

    const data = await response.json();

    // Delete all the products.
    await wcApiClient.post("products/batch", {
        data: {
            delete: data.map((product: any) => product.id),
        }
    });
}

const DeleteCoupons = async (wcApiClient: APIRequestContext) => {
    // Get a list of all the coupons with the codes we created.
    const response = await wcApiClient.get("coupons", {
        params: {
            per_page: 100,
            code: coupons.map((coupon) => coupon.code).join(","),
        }
    });

    const data = await response.json();

    // Delete all the coupons.
    await wcApiClient.post("coupons/batch", {
        data: {
            delete: data.map((coupon: any) => coupon.id),
        }
    });
}

const DeleteShippingZones = async (wcApiClient: APIRequestContext) => {
    // Get a list of all the shipping zones with the names we created.
    const response = await wcApiClient.get("shipping/zones", {
        params: {
            per_page: 100,
            search: shippingZones.map((zone) => zone.name).join(","),
        }
    });

    const data = await response.json();

    // Delete all the shipping zones.
    await wcApiClient.post("shipping/zones/batch", {
        data: {
            delete: data.map((zone: any) => zone.id),
        }
    });
}

const DeleteTaxClasses = async (wcApiClient: APIRequestContext) => {
    // Get a list of all the tax classes with the names we created.
    const response = await wcApiClient.get("taxes/classes", {
        params: {
            per_page: 100,
            search: TaxClasses.map((tax_class) => tax_class.name).join(","),
        }
    });

    const data = await response.json();

    // Delete all the tax classes separately.
    await Promise.all(
        data.map(async (tax_class: any) => {
            await wcApiClient.delete(`taxes/classes/${tax_class.slug}`);
        })
    );
}

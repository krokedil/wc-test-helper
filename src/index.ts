import { APIRequestContext, request } from "@playwright/test";

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

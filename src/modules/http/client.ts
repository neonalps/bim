import axios from "axios";

import { Dispatcher } from "undici";
import { ApiResponse, HTTP_METHOD } from "@src/modules/http/constants";

type RequestOptions = { dispatcher?: Dispatcher } & Omit<Dispatcher.RequestOptions, 'origin' | 'path' | 'method'> & Partial<Pick<Dispatcher.RequestOptions, 'method'>>;

export class HttpClient {

    public async post<T>(url: string, options?: RequestOptions): Promise<ApiResponse<T>> {
        return this.performRequest(url, { ...options, method: HTTP_METHOD.POST });
    }

    private async performRequest<T>(url: string, options?: RequestOptions): Promise<ApiResponse<T>> {
        try {
            const response = await axios({
                url,
                method: options?.method,
                data: options?.body,
            });

            return {
                statusCode: response.status,
                body: response.data as T,
            };
        } catch (ex) {
            console.error(ex);
            throw new Error("Something went wrong");
        }
    }

}
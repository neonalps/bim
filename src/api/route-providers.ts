import { RouteProvider } from "@src/router/types";
import { getStationsRouteProviders } from "@src/api/v1/stations/route-providers";

export function getRouteProviders(): RouteProvider<any, any>[] {
    return [
        ...getStationsRouteProviders(),
    ];
}
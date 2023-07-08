import dependencyManager from "@src/di/manager";
import { RouteProvider } from "@src/router/types";
import { FindStationsByNameHandler } from "@src/api/v1/stations/find-by-name/handler";
import { FindStopsByNameRouteProvider } from "@src/api/v1/stations/find-by-name/route-provider";
import { Dependencies } from "@src/di/dependencies";
import { BusBahnBimService } from "@src/modules/busbahnbim/service";

export function getStationsRouteProviders(): RouteProvider<any, any>[] {
    const busBahnBimService = dependencyManager.get<BusBahnBimService>(Dependencies.BusBahnBimService);

    const findStationsByNameHandler = new FindStationsByNameHandler(busBahnBimService);

    return [
        new FindStopsByNameRouteProvider(findStationsByNameHandler),
    ];
}
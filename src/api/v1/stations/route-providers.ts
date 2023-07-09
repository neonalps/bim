import dependencyManager from "@src/di/manager";
import { RouteProvider } from "@src/router/types";
import { FindStationsByNameHandler } from "@src/api/v1/stations/find-by-name/handler";
import { Dependencies } from "@src/di/dependencies";
import { BusBahnBimService } from "@src/modules/busbahnbim/service";
import { GetStationDeparturesHandler } from "@src/api/v1/stations/get-departures/handler";
import { GetStationDeparturesRouteProvider } from "@src/api/v1/stations/get-departures/route-provider";
import { FindStationsByNameRouteProvider } from "@src/api/v1/stations/find-by-name/route-provider";
import { GetStationByIdentifierHandler } from "@src/api/v1/stations/get-by-identifier/handler";
import { GetStationByIdentifierRouteProvider } from "@src/api/v1/stations/get-by-identifier/route-provider";
import { ApiHelper } from "@src/api/helper";

export function getStationsRouteProviders(): RouteProvider<any, any>[] {
    const apiHelper = dependencyManager.get<ApiHelper>(Dependencies.ApiHelper);
    const busBahnBimService = dependencyManager.get<BusBahnBimService>(Dependencies.BusBahnBimService);

    const getStationByIdentifierHandler = new GetStationByIdentifierHandler(apiHelper, busBahnBimService);
    const getStationDeparturesHandler = new GetStationDeparturesHandler(apiHelper, busBahnBimService);
    const findStationsByNameHandler = new FindStationsByNameHandler(busBahnBimService);

    return [
        new GetStationByIdentifierRouteProvider(getStationByIdentifierHandler),
        new GetStationDeparturesRouteProvider(getStationDeparturesHandler),
        new FindStationsByNameRouteProvider(findStationsByNameHandler),
    ];
}
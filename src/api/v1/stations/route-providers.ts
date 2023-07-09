import dependencyManager from "@src/di/manager";
import { RouteProvider } from "@src/router/types";
import { FindStationsByNameHandler } from "@src/api/v1/stations/find-by-name/handler";
import { Dependencies } from "@src/di/dependencies";
import { BusBahnBimService } from "@src/modules/busbahnbim/service";
import { FindStationDeparturesHandler } from "@src/api/v1/stations/find-departures/handler";
import { FindStationDeparturesRouteProvider } from "@src/api/v1/stations/find-departures/route-provider";
import { FindStationsByNameRouteProvider } from "@src/api/v1/stations/find-by-name/route-provider";
import { GetStationByIdentifierHandler } from "@src/api/v1/stations/get-by-identifier/handler";
import { GetStationByIdentifierRouteProvider } from "@src/api/v1/stations/get-by-identifier/route-provider";

export function getStationsRouteProviders(): RouteProvider<any, any>[] {
    const busBahnBimService = dependencyManager.get<BusBahnBimService>(Dependencies.BusBahnBimService);

    const getStationByIdentifierHandler = new GetStationByIdentifierHandler(busBahnBimService);
    const findStationDeparturesHandler = new FindStationDeparturesHandler(busBahnBimService);
    const findStationsByNameHandler = new FindStationsByNameHandler(busBahnBimService);

    return [
        new GetStationByIdentifierRouteProvider(getStationByIdentifierHandler),
        new FindStationDeparturesRouteProvider(findStationDeparturesHandler),
        new FindStationsByNameRouteProvider(findStationsByNameHandler),
    ];
}
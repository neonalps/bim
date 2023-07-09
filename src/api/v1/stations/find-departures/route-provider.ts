import { RequestSchema, RouteDefinition, RouteProvider } from "@src/router/types";
import { requireNonNull } from "@src/util/common";
import { FindStationDeparturesRequestDto } from "@src/models/api/find-station-departures-request";
import { StationDeparturesResponseDto } from "@src/models/api/station-departures-response";
import { FindStationDeparturesHandler } from "@src/api/v1/stations/find-departures/handler";

export class FindStationDeparturesRouteProvider implements RouteProvider<FindStationDeparturesRequestDto, StationDeparturesResponseDto> {

    private readonly handler: FindStationDeparturesHandler;

    constructor(handler: FindStationDeparturesHandler) {
        this.handler = requireNonNull(handler);
    }

    provide(): RouteDefinition<FindStationDeparturesRequestDto, StationDeparturesResponseDto> {
        const schema: RequestSchema = {
            body: {
                type: 'object',
                required: ['name'],
                properties: {
                    name: {
                        type: 'string',
                    }
                },
            },
        };

        return {
            name: 'FindStationDepartures',
            method: 'POST',
            path: '/api/v1/stations/find-departures',
            schema, 
            handler: this.handler,
            authenticated: false,
            response: {
                statusCode: 200,
            },
        };
    }
}
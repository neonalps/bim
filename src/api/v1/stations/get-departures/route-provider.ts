import { RequestSchema, RouteDefinition, RouteProvider } from "@src/router/types";
import { requireNonNull } from "@src/util/common";
import { GetStationDeparturesRequestDto } from "@src/models/api/get-station-departures-request";
import { StationDeparturesResponseDto } from "@src/models/api/station-departures-response";
import { GetStationDeparturesHandler } from "@src/api/v1/stations/get-departures/handler";

export class GetStationDeparturesRouteProvider implements RouteProvider<GetStationDeparturesRequestDto, StationDeparturesResponseDto> {

    private readonly handler: GetStationDeparturesHandler;

    constructor(handler: GetStationDeparturesHandler) {
        this.handler = requireNonNull(handler);
    }

    provide(): RouteDefinition<GetStationDeparturesRequestDto, StationDeparturesResponseDto> {
        const schema: RequestSchema = {
            body: {
                type: 'object',
                required: ['identifier', 'displayName'],
                properties: {
                    identifier: {
                        type: 'string',
                    },
                    displayName: {
                        type: 'string',
                    },
                    filter: {
                        type: 'string',
                    },
                },
            },
        };

        return {
            name: 'GetStationDepartures',
            method: 'POST',
            path: '/api/v1/stations/get-departures',
            schema, 
            handler: this.handler,
            authenticated: false,
            response: {
                statusCode: 200,
            },
        };
    }
}
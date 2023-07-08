import { RequestSchema, RouteDefinition, RouteProvider } from "@src/router/types";
import { FindStationsByNameHandler } from "@src/api/v1/stations/find-by-name/handler";
import { requireNonNull } from "@src/util/common";
import { FindStationsByNameRequestDto } from "@src/models/api/find-stops-by-name-request";
import { FindStationsByNameResponseDto } from "@src/models/api/find-stops-by-name-response";

export class FindStopsByNameRouteProvider implements RouteProvider<FindStationsByNameRequestDto, FindStationsByNameResponseDto> {

    private readonly handler: FindStationsByNameHandler;

    constructor(handler: FindStationsByNameHandler) {
        this.handler = requireNonNull(handler);
    }

    provide(): RouteDefinition<FindStationsByNameRequestDto, FindStationsByNameResponseDto> {
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
            name: 'FindStationsByName',
            method: 'POST',
            path: '/api/v1/stations/find-by-name',
            schema, 
            handler: this.handler,
            authenticated: false,
            response: {
                statusCode: 200,
            },
        };
    }
}
import { RequestSchema, RouteDefinition, RouteProvider } from "@src/router/types";
import { requireNonNull } from "@src/util/common";
import { GetStationRequestDto } from "@src/models/api/get-station-request";
import { StationDetailsResponseDto } from "@src/models/api/station-details-response";
import { GetStationByIdentifierHandler } from "./handler";

export class GetStationByIdentifierRouteProvider implements RouteProvider<GetStationRequestDto, StationDetailsResponseDto> {

    private readonly handler: GetStationByIdentifierHandler;

    constructor(handler: GetStationByIdentifierHandler) {
        this.handler = requireNonNull(handler);
    }

    provide(): RouteDefinition<GetStationRequestDto, StationDetailsResponseDto> {
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
                },
            },
        };

        return {
            name: 'GetStationByIdentifier',
            method: 'POST',
            path: '/api/v1/stations/get-by-identifier',
            schema, 
            handler: this.handler,
            authenticated: false,
            response: {
                statusCode: 200,
            },
        };
    }
}
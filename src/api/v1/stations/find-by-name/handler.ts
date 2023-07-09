import { FindStationsByNameRequestDto as FindStationsByNameRequestDto } from "@src/models/api/find-stations-by-name-request";
import { FindStationsByNameResponseDto as FindStationsByNameResponseDto } from "@src/models/api/find-stations-by-name-response";
import { StationDto } from "@src/models/api/station";
import { Station } from "@src/models/classes/station";
import { BusBahnBimService } from "@src/modules/busbahnbim/service";
import { RouteHandler } from "@src/router/types";
import { requireNonNull } from "@src/util/common";

export class FindStationsByNameHandler implements RouteHandler<FindStationsByNameRequestDto, FindStationsByNameResponseDto> {

    private readonly service: BusBahnBimService;

    constructor(service: BusBahnBimService) {
        this.service = requireNonNull(service);
    }

    public async handle(dto: FindStationsByNameRequestDto): Promise<FindStationsByNameResponseDto> {
        const stations = await this.service.findStationsByName(dto.name);

        return {
            stations: stations.map(item => this.convertStationToDto(item)),
        };
    }

    private convertStationToDto(item: Station): StationDto {
        return {
            identifier: item.identifier,
            displayName: item.displayName,
            externalId: item.externalId,
        };
    }

}
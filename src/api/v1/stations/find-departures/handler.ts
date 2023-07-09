import { FindStationDeparturesRequestDto } from "@src/models/api/find-station-departures-request";
import { StationDeparturesResponseDto } from "@src/models/api/station-departures-response";
import { BusBahnBimService } from "@src/modules/busbahnbim/service";
import { RouteHandler } from "@src/router/types";
import { requireNonNull } from "@src/util/common";

export class FindStationDeparturesHandler implements RouteHandler<FindStationDeparturesRequestDto, StationDeparturesResponseDto> {

    private readonly service: BusBahnBimService;

    constructor(service: BusBahnBimService) {
        this.service = requireNonNull(service);
    }

    public async handle(dto: FindStationDeparturesRequestDto): Promise<StationDeparturesResponseDto> {
        return {
            
        };
    }

}
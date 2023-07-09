import { IllegalStateError } from "@src/api/errors/illegal-state-error";
import { ApiHelper } from "@src/api/helper";
import { GetStationDeparturesRequestDto } from "@src/models/api/get-station-departures-request";
import { StationDeparturesResponseDto } from "@src/models/api/station-departures-response";
import { DepartureBoardItem } from "@src/models/classes/departure-board-item";
import { StationDetails } from "@src/models/classes/station-details";
import { BusBahnBimService } from "@src/modules/busbahnbim/service";
import { RouteHandler } from "@src/router/types";
import { isDefined, isNotDefined, requireNonNull } from "@src/util/common";

export class GetStationDeparturesHandler implements RouteHandler<GetStationDeparturesRequestDto, StationDeparturesResponseDto> {

    private readonly apiHelper: ApiHelper;
    private readonly service: BusBahnBimService;

    constructor(apiHelper: ApiHelper, service: BusBahnBimService) {
        this.apiHelper = requireNonNull(apiHelper);
        this.service = requireNonNull(service);
    }

    public async handle(dto: GetStationDeparturesRequestDto): Promise<StationDeparturesResponseDto> {
        const stationDetails = await this.service.getStationDetailsByIdentifier(dto.identifier, dto.displayName);

        if (isNotDefined(stationDetails)) {
            throw new IllegalStateError("No station details found");
        }

        const departures = this.applyFilterOptions((stationDetails as StationDetails).departures, dto.filter);

        return {
            identifier: dto.identifier,
            displayName: dto.displayName,
            departures: this.apiHelper.convertDepartureBoardItems(departures),
        }
    }

    private applyFilterOptions(departures: DepartureBoardItem[], filter: string): DepartureBoardItem[] {
        if (isNotDefined(filter)) {
            return departures;
        }

        const options: any[] = JSON.parse(Buffer.from(filter, 'base64').toString());

        for (const option of options) {
            const optionGoesVia = option["goesVia"];
            if (isDefined(optionGoesVia)) {
                departures = departures.filter(departure => departure.followingStops.some(stop => stop.station.displayName === optionGoesVia));
            }

            const optionFinalStop = option["finalStop"];
            if (isDefined(optionFinalStop)) {
                departures = departures.filter(departure => departure.directionText === optionFinalStop);
            }

            const optionLine = option["line"];
            if (isDefined(optionLine)) {
                departures = departures.filter(departure => departure.service.line === optionLine);
            }
        }

        return departures;
    }

}
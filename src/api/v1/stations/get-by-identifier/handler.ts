import { IllegalStateError } from "@src/api/errors/illegal-state-error";
import { DepartureBoardItemDto } from "@src/models/api/departure-board-item";
import { GetStationRequestDto } from "@src/models/api/get-station-request";
import { ServiceDto } from "@src/models/api/service";
import { StationDto } from "@src/models/api/station";
import { StationDepartureDto } from "@src/models/api/station-departure";
import { StationDetailsResponseDto } from "@src/models/api/station-details-response";
import { DepartureBoardItem } from "@src/models/classes/departure-board-item";
import { Service } from "@src/models/classes/service";
import { Station } from "@src/models/classes/station";
import { StationDeparture } from "@src/models/classes/station-departure";
import { StationDetails } from "@src/models/classes/station-details";
import { BusBahnBimService } from "@src/modules/busbahnbim/service";
import { RouteHandler } from "@src/router/types";
import { isNotDefined, requireNonNull } from "@src/util/common";

export class GetStationByIdentifierHandler implements RouteHandler<GetStationRequestDto, StationDetailsResponseDto> {

    private readonly service: BusBahnBimService;

    constructor(service: BusBahnBimService) {
        this.service = requireNonNull(service);
    }

    public async handle(dto: GetStationRequestDto): Promise<StationDetailsResponseDto> {
        const stationDetails = await this.service.getStationDetailsByIdentifier(dto.identifier, dto.displayName);

        if (isNotDefined(stationDetails)) {
            throw new IllegalStateError("No station details found");
        }
        
        return this.convertToResponseDto(dto.identifier, dto.displayName, stationDetails as StationDetails);
    }

    private convertToResponseDto(identifier: string, displayName: string, item: StationDetails): StationDetailsResponseDto {
        // filter out all stops that start with "Graz", as they are twice in the destination array, then make sure all elements are only in there once
        const reachableDestinations = item.reachableDestinations.filter(station => this.includeInReachableDestinations(station, displayName));
        const destinationSet = new Set(reachableDestinations.map(station => station.displayName));
        const filteredReachableDestinations = Array.from(destinationSet)
                .map(displayName => reachableDestinations.find(stop => stop.displayName === displayName) as Station)
                .sort(this.sortByDisplayName())

        return {
            identifier,
            displayName,
            departures: item.departures.slice(0, 10).map(departure => this.convertToDepartureBoardItemDto(departure)),
            reachableDestinations: filteredReachableDestinations.map(station => this.convertToStationDto(station as Station)),
        }
    }

    private sortByDisplayName(): ((a: Station, b: Station) => number) {
        return (a: Station, b: Station) => {
            const nameA = a.displayName.toLocaleUpperCase();
            const nameB = b.displayName.toLocaleUpperCase();

            return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        };
    }

    private includeInReachableDestinations(station: Station, displayName: string): boolean {
        return !station.displayName.startsWith("Graz ") && station.displayName !== this.getNormalisedDisplayName(displayName);
    }

    private getNormalisedDisplayName(name: string): string {
        if (!name.startsWith("Graz ")) {
            return name;
        }

        return name.substring("Graz ".length);
    }

    private convertToDepartureBoardItemDto(item: DepartureBoardItem): DepartureBoardItemDto {
        return {
            journeyIdentifier: item.journeyIdentifier,
            date: item.date,
            directionText: item.directionText,
            service: this.convertToServiceDto(item.service),
            departure: this.convertToStationDepartureDto(item.departure),
            followingStops: item.followingStops.map(stop => this.convertToStationDepartureDto(stop)),
        };
    }

    private convertToStationDepartureDto(item: StationDeparture): StationDepartureDto {
        return {
            stationDisplayName: item.station.displayName,
            scheduled: item.departureScheduled,
            prognosed: item.departurePrognosed,
        };
    }

    private convertToStationDto(item: Station): StationDto {
        return {
            identifier: item.identifier,
            externalId: item.externalId,
            displayName: item.displayName,
        };
    }

    private convertToServiceDto(item: Service): ServiceDto {
        return {
            displayName: item.displayName,
            line: item.line,
            lineId: item.lineId,
            num: item.num,
        };
    }

}
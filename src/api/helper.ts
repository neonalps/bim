import { DepartureBoardItemDto } from "@src/models/api/departure-board-item";
import { ServiceDto } from "@src/models/api/service";
import { StationDto } from "@src/models/api/station";
import { StationDepartureDto } from "@src/models/api/station-departure";
import { DepartureBoardItem } from "@src/models/classes/departure-board-item";
import { Service } from "@src/models/classes/service";
import { Station } from "@src/models/classes/station";
import { StationDeparture } from "@src/models/classes/station-departure";

export class ApiHelper {

    constructor() {}

    public convertDepartureBoardItems(items: DepartureBoardItem[]): DepartureBoardItemDto[] {
        return items.map(item => this.convertDepartureBoardItem(item));
    }

    public convertDepartureBoardItem(item: DepartureBoardItem): DepartureBoardItemDto {
        return {
            journeyIdentifier: item.journeyIdentifier,
            date: item.date,
            directionText: item.directionText,
            service: this.convertService(item.service),
            departure: this.convertStationDeparture(item.departure),
            followingStops: item.followingStops.map(stop => this.convertStationDeparture(stop)),
        };
    }

    public convertStationDeparture(item: StationDeparture): StationDepartureDto {
        return {
            stationDisplayName: item.station.displayName,
            scheduled: item.departureScheduled,
            prognosed: item.departurePrognosed,
        };
    }

    public convertStation(item: Station): StationDto {
        return {
            identifier: item.identifier,
            externalId: item.externalId,
            displayName: item.displayName,
        };
    }

    public convertService(item: Service): ServiceDto {
        return {
            displayName: item.displayName,
            line: item.line,
            lineId: item.lineId,
            num: item.num,
        };
    }

}
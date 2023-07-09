import { ServiceDto } from "@src/models/api/service";
import { StationDepartureDto } from "@src/models/api/station-departure";

export interface DepartureBoardItemDto {
    journeyIdentifier: string;
    service: ServiceDto;
    date: string;
    departure: StationDepartureDto;
    directionText: string;
    followingStops: StationDepartureDto[];
}
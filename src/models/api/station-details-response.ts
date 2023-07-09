import { StationDto } from "@src/models/api/station";
import { DepartureBoardItemDto } from "@src/models/api/departure-board-item";

export interface StationDetailsResponseDto {
    identifier: string;
    displayName: string;
    departures: DepartureBoardItemDto[];
    reachableDestinations: StationDto[];
}
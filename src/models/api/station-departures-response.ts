import { DepartureBoardItemDto } from "@src/models/api/departure-board-item";

export interface StationDeparturesResponseDto {
    identifier: string;
    displayName: string;
    departures: DepartureBoardItemDto[];
}
import { StationDto } from "@src/models/api/station";

export interface FindStationsByNameResponseDto {
    stations: StationDto[];
}
import { DepartureBoardItem } from "@src/models/classes/departure-board-item";
import { Service } from "@src/models/classes/service";
import { Station } from "@src/models/classes/station";
import { StationDeparture } from "@src/models/classes/station-departure";
import { StationDetails } from "@src/models/classes/station-details";
import { BusBahnBimGateApiResponseDto, LocationMatchApiResponseDto, LocationMatchItemApiResponseDto, ServiceApiResponseDto, StationBoardApiResponseDto, StationBoardDestinationApiResponseDto } from "@src/modules/busbahnbim/api-types";
import { isNotDefined } from "@src/util/common";

export class BusBahnBimApiConverter {

    private constructor() {}

    public static convertGateLocationMatchApiResponse(response: BusBahnBimGateApiResponseDto<LocationMatchApiResponseDto>): Station[] {
        const items = response?.svcResL[0]?.res?.match?.locL;

        if (isNotDefined(items) || items.length === 0) {
            return [];
        }

        return items.map(item => BusBahnBimApiConverter.convertToStation(item));
    }

    public static convertGateStationBoardApiResponse(response: BusBahnBimGateApiResponseDto<StationBoardApiResponseDto>): StationDetails | null {
        const board = response?.svcResL[0]?.res;

        if (isNotDefined(board)) {
            return null;
        }

        const reachableDestinations = board.common.locL.map(item => BusBahnBimApiConverter.convertToStation(item));
        const services = board.common.prodL.map(item => BusBahnBimApiConverter.convertToService(item));
        
        const stationDepartures = board.jnyL.map(item => {
            const departure = StationDeparture.Builder
                .withStation(reachableDestinations[item.stopL[0].locX])
                .withDepartureScheduled(item.stbStop.dTimeS)
                .withDeparturePrognosed(item.stbStop.dTimeR)
                .build();

            const followingStops = item.stopL.slice(1).map(stop => {
                return StationDeparture.Builder
                    .withStation(reachableDestinations[stop.locX])
                    .withDepartureScheduled(stop.aTimeS)
                    .build();
            });

            const service = services[item.prodL[0].prodX];

            return DepartureBoardItem.Builder
                .withJourneyIdentifier(item.jid)
                .withDate(item.date)
                .withDirectionText(item.dirTxt)
                .withDeparture(departure)
                .withService(service)
                .withFollowingStops(followingStops)
                .build();
        });

        return StationDetails.Builder
            .withReachableDestinations(reachableDestinations)
            .withDepartures(stationDepartures)
            .build();
    }

    private static convertToStation(item: LocationMatchItemApiResponseDto | StationBoardDestinationApiResponseDto): Station {
        return Station.Builder
                .withIdentifier(item.lid)
                .withExternalId(item.extId)
                .withDisplayName(item.name)
                .build();
    }

    private static convertToService(item: ServiceApiResponseDto): Service {
        return Service.Builder
            .withLine(item.prodCtx.line)
            .withLineId(item.prodCtx.lineId)
            .withIdentifier(item.pid)
            .withDisplayName(item.name)
            .withNum(item.prodCtx.num)
            .withMatchId(item.prodCtx.matchId)
            .build();
    }

}
import { Station } from "@src/models/classes/station";
import { BusBahnBimGateApiResponseDto, LocationMatchApiResponseDto } from "./api-types";
import { isNotDefined } from "@src/util/common";

export class BusBahnBimApiConverter {

    private constructor() {}

    public static convertGateLocationMatchApiResponse(response: BusBahnBimGateApiResponseDto<LocationMatchApiResponseDto>): Station[] {
        const items = response?.svcResL[0]?.res?.match?.locL;

        if (isNotDefined(items) || items.length === 0) {
            return [];
        }

        return items.map(item => {
            return Station.Builder
                .withIdentifier(item.lid)
                .withExternalId(item.extId)
                .withDisplayName(item.name)
                .build();
        });
    }

}
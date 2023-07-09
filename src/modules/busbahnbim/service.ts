import { requireNonNull } from "@src/util/common";
import { BusBahnBimClient } from "@src/modules/busbahnbim/client";
import { validateNotBlank } from "@src/util/validation";
import { Station } from "@src/models/classes/station";
import { StationDetails } from "@src/models/classes/station-details";

export class BusBahnBimService {

    private static readonly CLIENT_VERSION = "202306028";

    private client: BusBahnBimClient;

    constructor(client: BusBahnBimClient) {
        this.client = requireNonNull(client);
    }

    public async findStationsByName(name: string): Promise<Station[]> {
        validateNotBlank(name, "name");

        return this.client.fetchStationsByName(name, BusBahnBimService.CLIENT_VERSION);
    }

    public async findStationDeparturesByIdentifier(identifier: string, displayName: string): Promise<number[]> {
        validateNotBlank(identifier, "identifier");
        validateNotBlank(displayName, "displayName");

        return [];
    }

    public async getStationDetailsByIdentifier(identifier: string, displayName: string): Promise<StationDetails | null> {
        validateNotBlank(identifier, "identifier");
        validateNotBlank(displayName, "displayName");

        return this.client.fetchStationDetailsByIdentifier(identifier, displayName, BusBahnBimService.CLIENT_VERSION);
    }

}
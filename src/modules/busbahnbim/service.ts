import { requireNonNull } from "@src/util/common";
import { BusBahnBimClient } from "@src/modules/busbahnbim/client";
import { validateNotBlank } from "@src/util/validation";
import { Station } from "@src/models/classes/station";

export class BusBahnBimService {

    private client: BusBahnBimClient;

    constructor(client: BusBahnBimClient) {
        this.client = requireNonNull(client);
    }

    public async findStationsByName(name: string): Promise<Station[]> {
        validateNotBlank(name, "name");

        return this.client.fetchStationsByName(name, "202306028");
    }

}
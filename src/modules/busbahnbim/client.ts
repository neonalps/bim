import { generateRandomString, requireNonNull } from "@src/util/common";
import { HttpClient } from "@src/modules/http/client";
import { TimeSource } from "@src/util/time";
import { CONTENT_TYPE, HEADER, HTTP_STATUS } from "@src/modules/http/constants";
import { BusBahnBimGateApiResponseDto, LocationMatchApiResponseDto, StationBoardApiResponseDto } from "@src/modules/busbahnbim/api-types";
import { BusBahnBimApiConverter } from "./converter";
import { Station } from "@src/models/classes/station";
import { StationDetails } from "@src/models/classes/station-details";

export interface BusBahnBimClientConfig {
    authAid: string;
    gateUrl: string;
}

export class BusBahnBimClient {

    private readonly config: BusBahnBimClientConfig;
    private readonly httpClient: HttpClient;
    private readonly timeSource: TimeSource;

    constructor(config: BusBahnBimClientConfig, httpClient: HttpClient, timeSource: TimeSource) {
        this.config = requireNonNull(config);
        this.httpClient = requireNonNull(httpClient);
        this.timeSource = requireNonNull(timeSource);
    }

    public async fetchStationsByName(stopName: string, clientVersion: string): Promise<Station[]> {
        const response = await this.httpClient.post<BusBahnBimGateApiResponseDto<LocationMatchApiResponseDto>>(this.getRandomisedGateUrl(), {
            headers: { 
                [HEADER.ACCEPT]: '*/*',
                [HEADER.CONTENT_TYPE]: CONTENT_TYPE.JSON,
            },
            body: this.buildFetchStopsByNameBody(stopName, clientVersion),
        });
    
        if (response.statusCode !== HTTP_STATUS.OK) {
            throw new Error("something went wrong while fetching stops by name");
        }
    
        return BusBahnBimApiConverter.convertGateLocationMatchApiResponse(response.body);
    }

    public async fetchStationDetailsByIdentifier(identifier: string, displayName: string, clientVersion: string): Promise<StationDetails | null> {
        const response = await this.httpClient.post<BusBahnBimGateApiResponseDto<StationBoardApiResponseDto>>(this.getRandomisedGateUrl(), {
            headers: { 
                [HEADER.ACCEPT]: '*/*',
                [HEADER.CONTENT_TYPE]: CONTENT_TYPE.JSON,
            },
            body: this.buildFetchStationDetailsByIdentifierBody(identifier, displayName, clientVersion),
        });
    
        if (response.statusCode !== HTTP_STATUS.OK) {
            throw new Error("something went wrong while fetching stops by name");
        }
    
        return BusBahnBimApiConverter.convertGateStationBoardApiResponse(response.body);
    }

    private getRandomisedGateUrl(): string {
        return `${this.config.gateUrl}?rnd=${this.timeSource.getNow().getTime()}`;
    }

    private buildFetchStopsByNameBody(stopName: string, clientVersion: string): string {
        const body = {
            "id": this.generateRequestId(),
            "ver":"1.59",
            "lang":"deu",
            "auth":{
               "type":"AID",
               "aid": this.config.authAid,
            },
            "client":{
               "id":"VAO",
               "type":"WEB",
               "name":"webapp",
               "l":"vs_stv",
               "v": clientVersion,
            },
            "formatted":false,
            "ext":"VAO.20",
            "svcReqL":[
               {
                  "req":{
                     "input":{
                        "field":"S",
                        "loc":{
                           "type":"S",
                           "dist":1000,
                           "name": `${stopName}?`
                        },
                        "maxLoc":7
                     }
                  },
                  "meth":"LocMatch",
                  "id":"1|1|"
               }
            ]
        };

        return JSON.stringify(body);
    }

    private buildFetchStationDetailsByIdentifierBody(identifier: string, displayName: string, clientVersion: string): string {
        const body = {
            "id": this.generateRequestId(),
            "ver":"1.59",
            "lang":"deu",
            "auth":{
               "type":"AID",
               "aid": this.config.authAid
            },
            "client":{
               "id":"VAO",
               "type":"WEB",
               "name":"webapp",
               "l":"vs_stv",
               "v": clientVersion,
            },
            "formatted":false,
            "ext":"VAO.20",
            "svcReqL":[
               {
                  "req":{
                     "stbLoc":{
                        "name": displayName,
                        "lid": identifier,
                     },
                     "jnyFltrL":[
                        {
                           "type":"PROD",
                           "mode":"INC",
                           "value":4087
                        }
                     ],
                     "type":"DEP",
                     "sort":"PT",
                     "maxJny":40
                  },
                  "meth":"StationBoard",
                  "id":"1|2|"
               }
            ]
        };

        return JSON.stringify(body);
    }

    private generateRequestId(): string {
        return generateRandomString(16);
    }

}
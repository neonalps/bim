import { DepartureBoardItem } from "@src/models/classes/departure-board-item";
import { Station } from "@src/models/classes/station";

export class StationDetails {
    private _departures!: DepartureBoardItem[];
    private _reachableDestinations!: Station[];
 
    constructor(builder: StationDetailsBuilder) {
       this._departures = builder.departures;
       this._reachableDestinations = builder.reachableDestinations;
    }
 
    public get departures(): DepartureBoardItem[] {
       return this._departures;
    }
 
    public get reachableDestinations(): Station[] {
       return this._reachableDestinations;
    }
 
    public static get Builder(): StationDetailsBuilder {
       return new StationDetailsBuilder();
    }
 }
 
 class StationDetailsBuilder {
    private _departures!: DepartureBoardItem[];
    private _reachableDestinations!: Station[];
 
    public withDepartures(departures: DepartureBoardItem[]): StationDetailsBuilder {
       this._departures = departures;
       return this;
    }
 
    public withReachableDestinations(reachableDestinations: Station[]): StationDetailsBuilder {
       this._reachableDestinations = reachableDestinations;
       return this;
    }
 
    public get departures(): DepartureBoardItem[] {
       return this._departures;
    }
 
    public get reachableDestinations(): Station[] {
       return this._reachableDestinations;
    }
 
    build(): StationDetails {
       return new StationDetails(this);
    }
 }
import { Station } from "@src/models/classes/station";

export class StationDeparture {
    private _station!: Station;
    private _departureScheduled!: string;
    private _departurePrognosed!: string;
 
    constructor(builder: StationDepartureBuilder) {
       this._station = builder.station;
       this._departureScheduled = builder.departureScheduled;
       this._departurePrognosed = builder.departurePrognosed;
    }
 
    public get station(): Station {
       return this._station;
    }
 
    public get departureScheduled(): string {
       return this._departureScheduled;
    }
 
    public get departurePrognosed(): string {
       return this._departurePrognosed;
    }
 
    public static get Builder(): StationDepartureBuilder {
       return new StationDepartureBuilder();
    }
 }
 
 class StationDepartureBuilder {
    private _station!: Station;
    private _departureScheduled!: string;
    private _departurePrognosed!: string;
 
    public withStation(station: Station): StationDepartureBuilder {
       this._station = station;
       return this;
    }
 
    public withDepartureScheduled(departureScheduled: string): StationDepartureBuilder {
       this._departureScheduled = departureScheduled;
       return this;
    }
 
    public withDeparturePrognosed(departurePrognosed: string): StationDepartureBuilder {
       this._departurePrognosed = departurePrognosed;
       return this;
    }
 
    public get station(): Station {
       return this._station;
    }
 
    public get departureScheduled(): string {
       return this._departureScheduled;
    }
 
    public get departurePrognosed(): string {
       return this._departurePrognosed;
    }
 
    build(): StationDeparture {
       return new StationDeparture(this);
    }
 }
import { Service } from "@src/models/classes/service";
import { StationDeparture } from "@src/models/classes/station-departure";

export class DepartureBoardItem {
    private _journeyIdentifier!: string;
    private _service!: Service;
    private _date!: string;
    private _departure!: StationDeparture;
    private _directionText!: string;
    private _followingStops!: StationDeparture[];
 
    constructor(builder: DepartureBoardItemBuilder) {
       this._journeyIdentifier = builder.journeyIdentifier;
       this._service = builder.service;
       this._date = builder.date;
       this._departure = builder.departure;
       this._directionText = builder.directionText;
       this._followingStops = builder.followingStops;
    }
 
    public get journeyIdentifier(): string {
       return this._journeyIdentifier;
    }
 
    public get service(): Service {
       return this._service;
    }
 
    public get date(): string {
       return this._date;
    }
 
    public get departure(): StationDeparture {
       return this._departure;
    }
 
    public get directionText(): string {
       return this._directionText;
    }
 
    public get followingStops(): StationDeparture[] {
       return this._followingStops;
    }
 
    public static get Builder(): DepartureBoardItemBuilder {
       return new DepartureBoardItemBuilder();
    }
 }
 
 class DepartureBoardItemBuilder {
    private _journeyIdentifier!: string;
    private _service!: Service;
    private _date!: string;
    private _departure!: StationDeparture;
    private _directionText!: string;
    private _followingStops!: StationDeparture[];
 
    public withJourneyIdentifier(journeyIdentifier: string): DepartureBoardItemBuilder {
       this._journeyIdentifier = journeyIdentifier;
       return this;
    }
 
    public withService(service: Service): DepartureBoardItemBuilder {
       this._service = service;
       return this;
    }
 
    public withDate(date: string): DepartureBoardItemBuilder {
       this._date = date;
       return this;
    }
 
    public withDeparture(departure: StationDeparture): DepartureBoardItemBuilder {
       this._departure = departure;
       return this;
    }
 
    public withDirectionText(directionText: string): DepartureBoardItemBuilder {
       this._directionText = directionText;
       return this;
    }
 
    public withFollowingStops(followingStops: StationDeparture[]): DepartureBoardItemBuilder {
       this._followingStops = followingStops;
       return this;
    }
 
    public get journeyIdentifier(): string {
       return this._journeyIdentifier;
    }
 
    public get service(): Service {
       return this._service;
    }
 
    public get date(): string {
       return this._date;
    }
 
    public get departure(): StationDeparture {
       return this._departure;
    }
 
    public get directionText(): string {
       return this._directionText;
    }
 
    public get followingStops(): StationDeparture[] {
       return this._followingStops;
    }
 
    build(): DepartureBoardItem {
       return new DepartureBoardItem(this);
    }
 }
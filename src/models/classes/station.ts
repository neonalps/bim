export class Station {
    private _identifier!: string;
    private _externalId!: string;
    private _displayName!: string;
 
    constructor(builder: StationBuilder) {
       this._identifier = builder.identifier;
       this._externalId = builder.externalId;
       this._displayName = builder.displayName;
    }
 
    public get identifier(): string {
       return this._identifier;
    }
 
    public get externalId(): string {
       return this._externalId;
    }
 
    public get displayName(): string {
       return this._displayName;
    }
 
    public static get Builder(): StationBuilder {
       return new StationBuilder();
    }
 }
 
 class StationBuilder {
    private _identifier!: string;
    private _externalId!: string;
    private _displayName!: string;
 
    public withIdentifier(identifier: string): StationBuilder {
       this._identifier = identifier;
       return this;
    }
 
    public withExternalId(externalId: string): StationBuilder {
       this._externalId = externalId;
       return this;
    }
 
    public withDisplayName(displayName: string): StationBuilder {
       this._displayName = displayName;
       return this;
    }
 
    public get identifier(): string {
       return this._identifier;
    }
 
    public get externalId(): string {
       return this._externalId;
    }
 
    public get displayName(): string {
       return this._displayName;
    }
 
    build(): Station {
       return new Station(this);
    }
 }
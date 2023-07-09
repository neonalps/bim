export class Service {
    private _identifier!: string;
    private _displayName!: string;
    private _name!: string;
    private _num!: string;
    private _line!: string;
    private _lineId!: string;
    private _matchId!: string;
 
    constructor(builder: ServiceBuilder) {
       this._identifier = builder.identifier;
       this._displayName = builder.displayName;
       this._name = builder.name;
       this._num = builder.num;
       this._line = builder.line;
       this._lineId = builder.lineId;
       this._matchId = builder.matchId;
    }
 
    public get identifier(): string {
       return this._identifier;
    }
 
    public get displayName(): string {
       return this._displayName;
    }
 
    public get name(): string {
       return this._name;
    }
 
    public get num(): string {
       return this._num;
    }
 
    public get line(): string {
       return this._line;
    }
 
    public get lineId(): string {
       return this._lineId;
    }
 
    public get matchId(): string {
       return this._matchId;
    }
 
    public static get Builder(): ServiceBuilder {
       return new ServiceBuilder();
    }
 }
 
 class ServiceBuilder {
    private _identifier!: string;
    private _displayName!: string;
    private _name!: string;
    private _num!: string;
    private _line!: string;
    private _lineId!: string;
    private _matchId!: string;
 
    public withIdentifier(identifier: string): ServiceBuilder {
       this._identifier = identifier;
       return this;
    }
 
    public withDisplayName(displayName: string): ServiceBuilder {
       this._displayName = displayName;
       return this;
    }
 
    public withName(name: string): ServiceBuilder {
       this._name = name;
       return this;
    }
 
    public withNum(num: string): ServiceBuilder {
       this._num = num;
       return this;
    }
 
    public withLine(line: string): ServiceBuilder {
       this._line = line;
       return this;
    }
 
    public withLineId(lineId: string): ServiceBuilder {
       this._lineId = lineId;
       return this;
    }
 
    public withMatchId(matchId: string): ServiceBuilder {
       this._matchId = matchId;
       return this;
    }
 
    public get identifier(): string {
       return this._identifier;
    }
 
    public get displayName(): string {
       return this._displayName;
    }
 
    public get name(): string {
       return this._name;
    }
 
    public get num(): string {
       return this._num;
    }
 
    public get line(): string {
       return this._line;
    }
 
    public get lineId(): string {
       return this._lineId;
    }
 
    public get matchId(): string {
       return this._matchId;
    }
 
    build(): Service {
       return new Service(this);
    }
 }
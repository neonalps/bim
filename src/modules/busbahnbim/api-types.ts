export interface BusBahnBimGateApiResponseDto<T> {
    ver: string;
    ext: string;
    lang: string;
    id: string;
    err: string;
    svcResL: [{
        id: string;
        meth: string;
        err: string;
        res: T;
    }];
}

export interface LocationMatchApiResponseDto {
    match: {
        field: string;
        state: string;
        locL: LocationMatchItemApiResponseDto[];
    }
}

export interface LocationMatchItemApiResponseDto {
    lid: string;
    type: string;
    name: string;
    icoX: number;
    extId: string;
    state: string;
    crd: {
        x: number;
        y: number;
        floor: number;
    };
    meta: boolean;
    pCls: number;
    wt: number;
    isMainMast: boolean;
    isSelectable: boolean;
    isRoutable: boolean;
    globalIdL: { id: string; type: string }[];
    TZOffset: number;
    chgTime: string;
}

export interface StationBoardApiResponseDto {
    common: {
        locL: StationBoardDestinationApiResponseDto[];
        prodL: ServiceApiResponseDto[];
    };
    type: string;
    jnyL: RealTimeDepartureApiResponseDto[];
}

export interface StationBoardDestinationApiResponseDto {
    lid: string;
    type: string;
    name: string;
    icoX: number;
    extId: string;
    state: string;
    crd: {
        x: number;
        y: number;
        floor: number;
    };
    meta: boolean;
    pCls: number;
    PRefL: number[];
    entry: boolean;
    mMastLocX: number;
    globalIdL: { id: string; type: string }[];
    chgTime: string;
}

export interface RealTimeDepartureApiResponseDto {
    jid: string;
    date: string;
    dirTxt: string;
    dirFlg: string;
    status: string;
    isRchbl: boolean;
    stbStop: {
        locX: number;
        idx: number;
        dProdX: number;
        dTimeS: string;
        dTimeR: string;
        dTimeFR: {
            txtA: string;
        };
        dProgType: string;
        type: string;
    };
    stopL: JourneyDestinationApiResponseDto[];
    prodL: {
        prodX: number;
        fLocX: number;
        tLocX: number;
        fIdx: number;
        tIdx: number;
    }[];
}

export interface JourneyDestinationApiResponseDto {
    locX: number;
    idx: number;
    dTimeS: string;
    dTimeR: string;
    aTimeS: string;
    isImp: boolean;
    type: string;
}

export interface ServiceApiResponseDto {
    pid: string;
    name: string;
    nameS: string;
    number: string;
    prodCtx: {
        name: string;
        num: string;
        line: string;
        lineId: string;
        matchId: string;
        catOutS: string;
        catOutL: string;
        catCode: string;
    }
}
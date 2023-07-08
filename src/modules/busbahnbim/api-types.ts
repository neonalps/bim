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
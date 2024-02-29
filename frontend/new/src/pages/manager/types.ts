export interface TableListItem  {
    key:number;
    name:string;
    count:number;
}

export interface PartItem  {
    id:number;
    key: number;
    mesh: number;
    partName: string;
    index: number;
    script: string;
    progress: number;
    prop: string;
    status: string;
    isSingle: boolean;
    alias: string;
};

export interface RawData  {
    data: PartItem[];
    group: string;
}
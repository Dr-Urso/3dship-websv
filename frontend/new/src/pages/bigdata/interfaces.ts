export interface utils{
    count: number;
    countFinished: number;
    countGroup: number;
    multibarData: multiBar[];
}

export interface multiBar{
    Group: string;
    count: number;
    type: string;
}
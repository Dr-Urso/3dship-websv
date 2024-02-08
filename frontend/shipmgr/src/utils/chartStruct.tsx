import {ProColumns} from "@ant-design/pro-components";

export type PartItem = {
    mesh: number;
    name: string;
    index: number;
    script: string;
    prop: string;
    single: boolean;
};

export const PartChartColumns: ProColumns<PartItem>[] = [
    {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
    },
    {
        title:'部件名',
        dataIndex: 'name',
        copyable:true,
        ellipsis:true,

    },
    {
        title:'部件mesh编号',
        dataIndex: 'mesh',
        ellipsis:true,
    },
    {
        title:'状态编号',
        dataIndex: 'index',
        ellipsis:true,
        search:false,
    },
    {
        title:'状态',
        dataIndex: 'prop',
        ellipsis:true,
        search:false,
    },
];
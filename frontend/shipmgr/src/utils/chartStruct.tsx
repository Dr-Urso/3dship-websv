import {ProColumns} from "@ant-design/pro-components";
import {Button, Progress} from "antd";

export type PartItem = {
    mesh: number;
    name: string;
    index: number;
    script: string;
    progress: number;
    prop: string;
    status: string;
    single: boolean;
};

export const getPartChartColumns = (Click: (record: PartItem) => void) : ProColumns<PartItem>[] => {return [
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
        title:'进度',
        dataIndex: 'progress',
        ellipsis:true,
        search:false,
        render: (_,{progress})=>{
            return (
                <Progress percent={progress} size={"small"}></Progress>
            )
        }
    },
    {
        title:'状态',
        dataIndex: 'status',
        ellipsis:true,
        search:false,
    },
    {
        title:'操作',
        key: 'action',
        render:(_, record) =>(
            <Button onClick={()=> Click(record)}>
                操作
            </Button>
        )
    },
];}


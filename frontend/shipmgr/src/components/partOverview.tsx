import {PageContainer, ProTable} from "@ant-design/pro-components";
import {getPartChartColumns, PartItem} from "../utils/chartStruct.tsx";
import {useState} from "react";
import UpdateModal from "./updatePart.tsx";

async function fetchData(params: {[key: string]: any}): Promise<{ data: PartItem[]; success: boolean; }> {
    // 将查询参数转换为URL查询字符串
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`/part?${queryString}`);
    const data = await response.json(); // 假设后端返回的是JSON格式的数据
    console.log(data);
    const ret:PartItem[] = data.data.Data;
    console.log(ret);
    for (const partItem of ret) {
        partItem.status = JSON.parse(partItem.prop).status;
        partItem.progress = JSON.parse(partItem.prop).progress;
    }
    return {
        data: ret,
        success: response.ok, // 使用HTTP响应状态来判断请求是否成功
    };
}

function PartOverview(){
    const [modalOpen, setModalOpen] = useState(false);
    const [mesh, setMesh] = useState<number>(0);
    function onDetailClick(record:PartItem){
        setMesh(record.mesh);

        setModalOpen(true);
    }

    function onDetailCancel(){
        setModalOpen(false);
    }



    return(
        <>
        <UpdateModal open={modalOpen} mesh={mesh} cancel={onDetailCancel}>

        </UpdateModal>
        <PageContainer
        title={"状态列表"}>

            <ProTable<PartItem>
                columns={getPartChartColumns(onDetailClick)}
                cardBordered
                params={{modalOpen}}
                request={(params, sorter, filter) => fetchData({ ...params, sorter, filter })}
                rowKey="key">

            </ProTable>
        </PageContainer>
        </>
    )
}

export default PartOverview;
import {PageContainer, ProTable} from "@ant-design/pro-components";
import {PartChartColumns, PartItem} from "../utils/chartStruct.tsx";

async function fetchData(params: {[key: string]: any}): Promise<{ data: PartItem[]; success: boolean; }> {
    // 将查询参数转换为URL查询字符串
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`/part?${queryString}`);
    const data = await response.json(); // 假设后端返回的是JSON格式的数据

    return {
        data: data.data.Data,
        success: response.ok, // 使用HTTP响应状态来判断请求是否成功
    };
}

function PartOverview(){
    return(
        <>
        <PageContainer
        title={"状态列表"}>
            <ProTable<PartItem>
                columns={PartChartColumns}
                cardBordered
                request={(params, sorter, filter) => fetchData({ ...params, sorter, filter })}
                rowKey="key">

            </ProTable>
        </PageContainer>
        </>
    )
}

export default PartOverview;
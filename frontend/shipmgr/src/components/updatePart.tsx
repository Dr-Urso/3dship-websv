import {Input, InputNumber, Modal, Space} from "antd";
import {useState} from "react";






export default function UpdateModal ({open, mesh, cancel}){
    function send(){
        console.log(pgs);
        console.log(sts);
        fetch("/part",{
            method:"PUT",
            body:JSON.stringify({Mesh:mesh,Progress:pgs,Status:sts}),
        }).then((response)=>{
            console.log(response);
        });
        cancel();
    }
    const [pgs,setPgs] = useState(0);
    const [sts,setSts] = useState("");

    return (<Modal
        open={open}
        onCancel={cancel}
        onOk={send}
    >
        <Space direction="vertical" style={{ width: '100%' }}>
        <InputNumber
            addonBefore={"进度"}
            defaultValue={0}
            min={0}
            max={100}
            formatter={(value) => `${value}%`}
            parser={(value) => Number(value!.replace('%', ''))}
            onChange={(e: number) => {
                setPgs(e)
            }}
        />

            <Input addonBefore={"状态"}  onChange={(e) => {
                setSts(e.target.value)
            }}></Input>
            </Space>

    </Modal>
)

}
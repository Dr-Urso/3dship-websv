import {message, UploadProps} from "antd";
import {RcFile} from "antd/lib/upload";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from '@ant-design/icons';
import {PageContainer} from "@ant-design/pro-components";

const customRequest = async (file:RcFile) => {
    // 读取文件
    return new Promise<boolean>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e:ProgressEvent<FileReader>) => {
            try {
                // @ts-ignore
                const content = JSON.parse(e.target.result as string);

                await fetch('/part/gltf', { method: 'POST', body: JSON.stringify(content), headers: {'Content-Type': 'application/json'} });
                message.success('文件上传成功');
                resolve(true);
            } catch (error) {
                message.error('文件解析失败');
                reject(error);
            }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
    });
};


const props: UploadProps = {
    name: 'file',
    multiple: false,
    beforeUpload:(file)=>{return customRequest(file);},
}


function ImportGltf(){
    return (<>
        <PageContainer
        title={"导入GLTF"}>
        <Dragger {...props}>
        <p className="ant-upload-drag-icon">
            <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或者拖拽到此处以导入</p>
        <p className="ant-upload-hint">
            别往里拖乱起八糟，没写校验
        </p>
    </Dragger>
        </PageContainer>
        </>)
}

export default ImportGltf;
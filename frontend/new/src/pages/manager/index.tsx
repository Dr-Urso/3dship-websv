import { Button, Layout, Progress, Table } from 'antd';
import { useEffect, useState } from 'react';

import PartUpdateModal from '@/components/PartUpdateModal';
import { PartItem, RawData, TableListItem } from '@/pages/manager/types';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { ColumnsType } from 'rc-table';

export default function Page() {
  const [listData, setListData] = useState<TableListItem[]>([]);
  const [itemData, setItemData] = useState<PartItem>();
  const [rawData, setRawData] = useState<RawData[]>();
  const [modalOpen, setModalOpen] = useState(false);
  const [mesh, setMesh] = useState<number>(0);
  function onDetailClick(record: PartItem) {
    setMesh(record.mesh);

    setModalOpen(true);
  }

  function onDetailCancel() {
    setModalOpen(false);
  }
  async function fetchData(params: {
    [key: string]: any;
  }): Promise<{ data: RawData[]; success: boolean }> {
    // 将查询参数转换为URL查询字符串
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`/api/parts?${queryString}`);
    const data = await response.json(); // 假设后端返回的是JSON格式的数据
    console.log(data);
    const ret: RawData[] = data;
    console.log(ret);

    return {
      data: ret,
      success: response.ok, // 使用HTTP响应状态来判断请求是否成功
    };
  }

  useEffect(() => {
    fetchData({}).then((res) => {
      setRawData(res.data);
    });
  }, [modalOpen]);

  useEffect(() => {
    if (rawData) {
      console.log(rawData);
      const newListData = rawData.map((item, index) => ({
        key: index.toString(), // 确保key是字符串类型
        name: item.group,
        count: item.data.length,
      }));
      setListData(newListData);
    }
  }, [rawData]); // 直接依赖于rawData来更新listData

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '部件类别',
      width: 100,
      dataIndex: 'name',
    },
    {
      title: '部件数量',
      width: 100,
      dataIndex: 'count',
    },
  ];

  const getPartChartColumns = (
    Click: (record: PartItem) => void,
  ): ColumnsType<PartItem>[] => {
    return [
      {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
      },
      {
        title: '部件名',
        dataIndex: 'alias',
        copyable: true,
        ellipsis: true,
      },
      {
        title: '部件mesh编号',
        dataIndex: 'mesh',
        ellipsis: true,
      },
      {
        title: '进度',
        dataIndex: 'progress',
        ellipsis: true,
        search: false,
        render: (_, { progress }) => {
          return <Progress percent={progress} size={'small'}></Progress>;
        },
      },
      {
        title: '状态',
        dataIndex: 'status',
        ellipsis: true,
        search: false,
      },
      {
        title: '操作',
        key: 'action',
        render: (_, record) => (
          <Button onClick={() => Click(record)}>操作</Button>
        ),
      },
    ];
  };

  const ExpandableRender = ({ keyy }: { keyy: number }) => {
    if (rawData) {
      const set = rawData[keyy].data.map((item, index) => ({
        ...item,
        alias: rawData[keyy].group + index,
      }));
      const data = set;

      console.log(data);

      return (
        <Table<PartItem>
          columns={getPartChartColumns(onDetailClick)}
          dataSource={data}
          rowKey="key"
          pagination={{ pageSize: 5, hideOnSinglePage: true }}
        />
      );
    }
    return <></>;
  };

  return (
    <>
      <PartUpdateModal open={modalOpen} mesh={mesh} cancel={onDetailCancel} />
      <Layout>
        <div className="h-5" />
        <div>
          <ProTable<TableListItem>
            columns={columns}
            rowKey="key"
            dataSource={listData}
            pagination={{
              showQuickJumper: true,
            }}
            expandable={{
              expandedRowRender: (record, index) => (
                <ExpandableRender keyy={index} />
              ),
            }}
          />
        </div>
      </Layout>
    </>
  );
}

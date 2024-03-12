import GroupBar from '@/components/GroupBar';
import GroupRose from '@/components/GroupRose';
import HistoryLine from '@/components/HistoryLine';
import { Card, Col, Layout, Row } from 'antd';
import { useEffect, useState } from 'react';
import { utils } from './interfaces';

export default function Page() {
  const [utils, setUtils] = useState<utils>({
    count: 0,
    countFinished: 0,
    countGroup: 0,
  });
  const fetchData = async (): Promise<utils> => {
    const response = await fetch('/api/parts/bigdata');
    return await response.json();
  };

  useEffect(() => {
    const fetch = async () => {
      const ass: utils = await fetchData();
      setUtils(ass);
    };
    fetch();
  }, []);
  return (
    <Layout style={{ height: '100vh' }}>
      <div
        style={{ marginLeft: '60px', marginRight: '60px', marginTop: '20px' }}
      >
        <Row>
          <Col span={8}>
            <Card style={{ marginLeft: '5px', marginRight: '5px' }}>
              <div className="text-center">
                <div
                  className="bg-red-500 h-2 w-full"
                  style={{ marginTop: '-25px' }}
                ></div>
                <div className="h-5"></div>
                <p className="text-2xl">部件总数</p>
                <p className="text-4xl text-red-500 font-bold">{utils.count}</p>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ marginLeft: '5px', marginRight: '5px' }}>
              <div className="text-center">
                <div
                  className="bg-blue-500 h-2 w-full"
                  style={{ marginTop: '-25px' }}
                ></div>
                <div className="h-5"></div>
                <p className="text-2xl">建造完成个数</p>

                <p className="text-4xl text-blue-500 font-bold">
                  {utils.countFinished}
                </p>
              </div>
            </Card>
          </Col>

          <Col span={8}>
            <Card style={{ marginLeft: '5px', marginRight: '5px' }}>
              <div className="text-center">
                <div
                  className="bg-green-500 h-2 w-full"
                  style={{ marginTop: '-25px' }}
                ></div>
                <div className="h-5"></div>
                <p className="text-2xl">部件组数</p>
                <p className="text-4xl text-green-500 font-bold">
                  {utils.countGroup}
                </p>
              </div>
            </Card>
          </Col>
        </Row>
        <div className="h-5" />
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card>
              <GroupBar data={utils.multibarData} />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <HistoryLine data={utils.multibarData} />
            </Card>
          </Col>
        </Row>
        <div className="h-5" />
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card>
              <GroupRose data={utils.multibarData} />
            </Card>
          </Col>
          <Col span={16}>
            <Card></Card>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

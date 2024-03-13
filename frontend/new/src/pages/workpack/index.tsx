import MainMenuBar from '@/components/MainMenuBar';
import { utils } from '@/pages/bigdata/interfaces';
import { StandardTooltipContent } from '@/pages/workpack/Components/Tooltips';
import { Edges, Nodes } from '@/pages/workpack/types';
import { DecompositionTreeGraph } from '@ant-design/charts';
import {
  AimOutlined,
  ApartmentOutlined,
  AreaChartOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { Card, Col, Layout, Row } from 'antd';
import { Gantt, Task } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import { useEffect, useState } from 'react';
import { Header } from './Components/Header';
import styles from './index.less';

export default function Page() {
  const [Node, setNode] = useState<Nodes[]>([]);
  const [Edge, setEdge] = useState<Edges[]>([]);
  const [Data, setData] = useState<utils>();
  const [DecompsData, setDecompsData] = useState();
  const [loading, setLoading] = useState(true);
  async function fetchNodes(): Promise<{
    nodes: Nodes[];
    edges: Edges[];
    data: utils;
    DecompsData: any;
  }> {
    const response = await fetch('/api/workpacks/nodes');
    const response2 = await fetch('/api/parts/bigdata');
    const response3 = await fetch('/api/workpacks/tree');
    const nds = await response.json();
    const nds2 = await response2.json();
    const nds3 = await response3.json();
    return {
      nodes: nds.nodes,
      edges: nds.edges,
      data: nds2,
      DecompsData: nds3,
    };
  }

  useEffect(() => {
    fetchNodes()
      .then((par) => {
        setNode(par.nodes);
        setEdge(par.edges);
        setData(par.data);
        setDecompsData(par.DecompsData);
      })
      .then(() => setLoading(false));
  }, []);

  const tasks: Task[] = Node?.map((node) => {
    return {
      start: new Date(node.start_date),
      end: new Date(node.end_date),
      name: node.name,
      id: node.id.toString(),
      type: 'task',
      dependencies: getDependencies(node),
      progress: node.progress,
    };
  });
  function getDependencies(node: Nodes): string[] {
    let dep: string[] = [];
    for (const edge of Edge) {
      if (edge.target == node.id) {
        dep.push(edge.source.toString());
      }
    }
    return dep;
  }
  const nds = Node.map((node) => {
    return {
      label: node.name,
      id: node.id.toString(),
    };
  });
  const egs = Edge.map((edge) => {
    return {
      source: edge.source.toString(),
      target: edge.target.toString(),
      id: edge.source.toString() + '-' + edge.target.toString(),
      label: edge.source.toString() + '-' + edge.target.toString(),
    };
  });
  const decompsConfig = {
    data: DecompsData,
    markerCfg: (cfg) => {
      const { children } = cfg;
      return {
        show: children?.length,
      };
    },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <MainMenuBar keyy="workpack" />
      <Layout style={{ paddingLeft: '10vw', paddingRight: '10vw' }}>
        <div className="h-5" />
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card
              style={{
                backgroundImage:
                  'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
              }}
              className={styles.propcard}
            >
              <div className={styles.cardlabel}>
                <AreaChartOutlined />
              </div>
              <div className={styles.cardtitle}>船舶部件完成情况</div>
              <div className={styles.cardstat}>
                <div className="text-green-700 inline-block">
                  {Data?.countFinished}
                </div>
                <div
                  className="text-gray-500 inline-block"
                  style={{ fontSize: '40px' }}
                >
                  {'/' + Data?.count}
                </div>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              style={{
                backgroundImage:
                  'linear-gradient(to top, #4481eb 0%, #04befe 100%)',
              }}
              className={styles.propcard}
            >
              <div className={styles.cardlabel}>
                <AimOutlined />
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              style={{
                backgroundImage:
                  'linear-gradient(to right, #3ab5b0 0%, #3d99be 31%, #56317a 100%)',
              }}
              className={styles.propcard}
            >
              <div className={styles.cardlabel}>
                <ApartmentOutlined />
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              style={{
                backgroundImage:
                  'linear-gradient(to top, #b3ffab 0%, #12fff7 100%)',
              }}
              className={styles.propcard}
            >
              <div className={styles.cardlabel}>
                <CalendarOutlined />
              </div>
            </Card>
          </Col>
        </Row>
        <div className="h-5" />
        <Card>
          <div
            className="text-center font-bold text-2xl text-gray-500"
            style={{ top: '-10px', position: 'relative' }}
          >
            工程时间图
          </div>
          <Gantt
            tasks={tasks}
            locale="zh-CN"
            TaskListHeader={Header}
            TooltipContent={StandardTooltipContent}
            listCellWidth={''}
          />
        </Card>
        <div className="h-5" />
        <Row>
          <Col span={24}>
            <Card>
              <div
                className="text-center font-bold text-2xl text-gray-500"
                style={{ top: '-10px', position: 'relative' }}
              >
                工作包树形图
              </div>
              <DecompositionTreeGraph {...decompsConfig} />
            </Card>
          </Col>
        </Row>
      </Layout>
    </>
  );
}

import MainMenuBar from '@/components/MainMenuBar';
import { StandardTooltipContent } from '@/pages/workpack/Components/Tooltips';
import { Edges, Nodes } from '@/pages/workpack/types';
import {Card, Col, Layout, Row} from 'antd';
import { Gantt, Task } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import { useEffect, useState } from 'react';
import { GraphCanvas } from 'reagraph';
import { Header } from './Components/Header';

export default function Page() {
  const [Node, setNode] = useState<Nodes[]>([]);
  const [Edge, setEdge] = useState<Edges[]>([]);
  const [loading, setLoading] = useState(true);
  async function fetchNodes(): Promise<{ nodes: Nodes[]; edges: Edges[] }> {
    const response = await fetch('/api/workpacks/nodes');
    const nds = await response.json();
    return {
      nodes: nds.nodes,
      edges: nds.edges,
    };
  }

  useEffect(() => {
    fetchNodes()
      .then((par) => {
        setNode(par.nodes);
        setEdge(par.edges);
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
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Layout>

      <MainMenuBar keyy="workpack" />
<Row>
    <Col span={6}>
        <Card style={{backgroundImage: "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)";}}
    </Col>
</Row>
      <Gantt
        tasks={tasks}
        locale="zh-CN"
        TaskListHeader={Header}
        TooltipContent={StandardTooltipContent}
      />
      <div
        style={{
          border: 'solid 1px red',
          height: 350,
          width: 350,
          margin: 15,
          position: 'relative',
        }}
      >
        <GraphCanvas nodes={nds} edges={egs} />
      </div>
    </Layout>
  );
}

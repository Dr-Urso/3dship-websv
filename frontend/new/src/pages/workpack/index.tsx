import MainMenuBar from '@/components/MainMenuBar';
import { StandardTooltipContent } from '@/pages/workpack/Components/Tooltips';
import { Edges, Nodes } from '@/pages/workpack/types';
import { Layout } from 'antd';
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
      progress: 0,
    };
  });

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

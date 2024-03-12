import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link } from 'umi';

export default function MainMenuBar({ keyy }: { keyy: string }) {
  const items: MenuProps['items'] = [
    {
      label: <Link to="/manage">船舶部件表格视图</Link>,
      key: 'manage',
    },
    {
      label: <Link to="/workpack">工作包管理</Link>,
      key: 'workpack',
    },
  ];
  return (
    <>
      <Menu mode="horizontal" selectedKeys={[keyy]} items={items} />
    </>
  );
}

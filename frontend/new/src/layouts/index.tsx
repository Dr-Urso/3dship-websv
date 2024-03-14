import { ProLayout } from '@ant-design/pro-layout';
import { Outlet } from 'umi';

export default function Layout() {
  return (
    <ProLayout>
      <Outlet />
    </ProLayout>
  );
}

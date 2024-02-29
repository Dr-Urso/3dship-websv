import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import {Link} from "umi";


export default function MainMenuBar({keyy}:{keyy:string}) {
  const items : MenuProps['items'] = [
    {
      label:(<Link to="/manage">船舶部件表格视图</Link>),
      key:'manage',
    },
  ];
  return (
      <>
        <Menu mode="horizontal" selectedKeys={[keyy]} items={items} />

      </>
  )
}

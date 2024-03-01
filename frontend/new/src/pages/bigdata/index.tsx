import React from 'react';
import './index.less'
// @ts-ignore
import * as datav from '@jiaminghi/data-view-react'
import TopLeft from "./TopLeft";
import {Col, Row} from "antd";
import bg from './img/bg.png'
export default function Page() {
  return (
    <>
        <div>
      <datav.FullScreenContainer  style={{backgroundImage:bg}}>
        <Row>
            <Col span={24}>
                <div className="h-3"/>
                <div className="font-bold text-white text-4xl text-center">测试</div>
                <div className="h-3"/>
            </Col>
        </Row>
          <datav.BorderBox1>
              <div>
            <Row>
                <Col span={8}>

        <TopLeft />

                </Col>
            </Row>
              </div>
          </datav.BorderBox1>
      </datav.FullScreenContainer>
        </div>
    </>
  );
}

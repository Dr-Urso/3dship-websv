import React, {useEffect} from 'react'
import {Bar} from "@ant-design/charts";

// @ts-ignore
export default function GroupBar({data}) {
const [barData, setBarData] = React.useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/parts/bigdata');
            const result = await response.json();
            // @ts-ignore
            setBarData(result.multiBarData);
        }
        fetchData();
    }, []);


    const config = {
        data: barData,
        isStack: true,
        xField: 'count',
        yField: 'Group',
        seriesField: 'type',
        label: {
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'left', 'middle', 'right'
            // 可配置附加的布局方法
            layout: [
                // 柱形图数据标签位置自动调整
                {
                    type: 'interval-adjust-position',
                }, // 数据标签防遮挡
                {
                    type: 'interval-hide-overlap',
                }, // 数据标签文颜色自动调整
                {
                    type: 'adjust-color',
                },
            ],
        },
    };

  return (
      <>
          <Bar {...config}/>
      </>
  )
}

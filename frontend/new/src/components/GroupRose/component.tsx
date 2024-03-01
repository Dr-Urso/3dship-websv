import React, {useEffect} from 'react'
import {Bar, Rose} from "@ant-design/charts";

export default function GroupRose() {
  const [barData, setBarData] = React.useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/parts/bigdata');
      const result = await response.json();
      // @ts-ignore
      setBarData(result.roseData);
    }
    fetchData();
  }, []);


  const config = {
    data: barData,
    isStack: true,
    xField: 'type',
    yField: 'count',
    seriesField: 'type',
    radius: 0.9,
    label: {
      offset: -15,
    },
  };

  return (
      <>
        <Rose {...config}/>
      </>
  )
}

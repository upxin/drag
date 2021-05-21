import React, { useState, useEffect } from "react";
import { Table } from "@alifd/next";
import { tableList } from "./config";
import { mockData } from "../../mock"; // 假设是后端提供的
import SetTableTitle from "../SetTableTitle";
function ActiveTable() {
  const [titleData, setTitleData] = useState(mockData);
  const getNewData = (e) => {
    setTitleData(e.detail.newData);
  };
  useEffect(() => {
    // 模仿后台 直接本地修改了
    window.addEventListener("updateTableTitle", getNewData);
    return () => {
      window.removeEventListener("updateTableTitle", getNewData);
    };
  }, []);
  return (
    <section style={{ padding: 20 }}>
      <Table dataSource={[]} hasBorder={false} crossline={false}>
        {tableList(titleData).map((item, i) => {
          return (
            <Table.Column
              width={item.width}
              lock={i === 0 ? "left" : item.lock}
              key={item.dataIndex}
              title={item.title}
              dataIndex={item.dataIndex}
            />
          );
        })}
      </Table>
      <SetTableTitle titleList={titleData} />
    </section>
  );
}

export default ActiveTable;

import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import update from "immutability-helper";
import "./index.scss";
import { titleListLocal, titleListLocalMap } from "./config";
const Container = ({ titleList }) => {
  const [cards, setCards] = useState([]);
  const tableTitleListRef = useRef([]);

  const _updateTableTitle = (newData) => {
    const evt = new CustomEvent("updateTableTitle", {
      detail: {
        newData,
      },
    });
    window.dispatchEvent(evt);
  };
  // 拖拽事件处理
  const moveCard = (dragIndex, hoverIndex) => {
    const dragCard = tableTitleListRef.current[dragIndex];

    // tableTitleListRef.current用户可能先勾选再拖 这时候card被勾的状态不是最新的 所以用ref
    const afterDragData = update(tableTitleListRef.current, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCard],
      ],
    });
    tableTitleListRef.current = afterDragData;
    const isTrueData = tableTitleListRef.current
      .filter((item) => item.checked)
      .map((item) => item.dataIndex);
    _updateTableTitle(isTrueData);
  };
  // 点击事件处理
  const customEvtClickCheckboxItem = (e) => {
    const {
      checked,
      info: { id },
    } = e.detail;
    // 修改check状态
    const newTableTitleList = tableTitleListRef.current.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          checked,
        };
      }
      return { ...item };
    });

    // 点击后的最新状态
    tableTitleListRef.current = newTableTitleList;
    setCards(tableTitleListRef.current);

    const isTrueData = tableTitleListRef.current
      .filter((item) => item.checked)
      .map((item) => item.dataIndex);
    _updateTableTitle(isTrueData);
  };
  useEffect(() => {
    // dispatch('handleCheckBoxItem') in ./Card.jsx
    window.addEventListener("handleCheckBoxItem", customEvtClickCheckboxItem);
  }, []);
  const filterTitle = () => {
    // 没有被勾选的
    const diff = titleListLocal
      .filter((item) => {
        return !titleList.includes(item);
      })
      .map((item) => {
        return { ...titleListLocalMap[item], checked: false };
      });

    // 接口返回被勾选的
    const remoteChecked = titleList
      .filter((item) => {
        if (titleListLocal.includes(item)) {
          return true;
        }
      })
      .map((item) => {
        return { ...titleListLocalMap[item], checked: true };
      });
    const temp = [...remoteChecked, ...diff].filter((item) => item); // 过滤undefined 测试环境容易出现
    tableTitleListRef.current = temp; // 初始化设置处理后的
    setCards(temp);
  };
  useEffect(() => {
    // titleList 接口取到的按顺序排列的，所以用titleList遍历去titleListLocalMap取值 省得排序错误
    filterTitle();
  }, [titleList]);
  return (
    <div
      style={{
        width: 200,
      }}
    >
      {cards.map((card, i) => (
        <Card
          key={card.id}
          index={i}
          id={card.id}
          text={card.title}
          moveCard={moveCard}
          checked={card.checked}
        />
      ))}
    </div>
  );
};
export default Container;

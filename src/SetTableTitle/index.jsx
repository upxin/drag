import React from "react";
import Container from "./Container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
function SetTableTitle({titleList = []}) {
  return (
    <div>
      <h1>拖拽更改顺序，勾选增删表头</h1>
      <DndProvider backend={HTML5Backend}>
        <Container titleList={titleList} />
      </DndProvider>
    </div>
  );
}
export default SetTableTitle;

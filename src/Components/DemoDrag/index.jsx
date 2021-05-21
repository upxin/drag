import React from "react";
import Container from "./Container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
 function TableTitle() {
  return (
    <div>
      <h1>Demo</h1>
      <DndProvider backend={HTML5Backend}>
         <Container />
        </DndProvider>
    </div>
  );
}
export default TableTitle;

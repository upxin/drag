import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { DragSource, DropTarget } from "react-dnd";
import { Checkbox } from "@alifd/next";
const ItemTypes = {
  CARD: "card",
};
const style = {
  border: "1px dashed gray",
  padding: "6px 0",
  marginBottom: "1px",
  backgroundColor: "white",
  cursor: "move",
};
const handleClick = (props) => {
  console.log("click Item", props);
};
const CustomComponent = forwardRef(function Card(props, ref) {
  const { text, isDragging, connectDragSource, connectDropTarget } = props;
  const elementRef = useRef(null);
  connectDragSource(elementRef);
  connectDropTarget(elementRef);
  const opacity = isDragging ? 0 : 1;
  useImperativeHandle(ref, () => ({
    getNode: () => elementRef.current,
  }));
  return (
    <div
      ref={elementRef}
      style={{ ...style, opacity }}
      onClick={() => handleClick(props)}
    >
      <Checkbox>{text}</Checkbox>
    </div>
  );
});
export default DropTarget(
  ItemTypes.CARD,
  {
    hover(props, monitor, component) {
      if (!component) {
        return null;
      }
      const node = component.getNode();
      if (!node) {
        return null;
      }
      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = node.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      props.moveCard(dragIndex, hoverIndex);
      monitor.getItem().index = hoverIndex;
    },
  },
  (connect) => ({
    connectDropTarget: connect.dropTarget(),
  })
)(
  DragSource(
    ItemTypes.CARD,
    {
      beginDrag: (props) => ({
        id: props.id,
        index: props.index,
      }),
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    })
  )(CustomComponent)
);

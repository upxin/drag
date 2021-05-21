import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { Checkbox } from '@alifd/next';
import  './index.scss';
const ItemTypes = {
  CARD: 'card',
};
// 可被拖动的组件
const CustomComponent = forwardRef(function Card(props, ref) {
  // 点击checkbox 勾选或取消表头
  const handleClick = (v, current) => {
    // addEventListener in './Container.jsx'
    const handleCheckBoxItemEvt = new CustomEvent('handleCheckBoxItem', {
      detail: {
        checked: v,
        info: current,
      },
    });
    window.dispatchEvent(handleCheckBoxItemEvt);
  };
  const { text, isDragging, connectDragSource, connectDropTarget } = props;
  const elementRef = useRef(null);
  connectDragSource(elementRef);
  connectDropTarget(elementRef);
  const opacity = isDragging ? 0 : 1;
  useImperativeHandle(ref, () => ({
    getNode: () => elementRef.current,
  }));
  return (
    <div className='card' ref={elementRef} style={{ opacity }}>
      <div className='cardItem'>
        <span>{text}</span>
        <Checkbox
          defaultChecked={props.checked}
          onChange={(v) => handleClick(v, props)}
        />
      </div>
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

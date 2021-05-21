import React, { useState } from "react";
import Card from "./Card";
import update from "immutability-helper";
const style = {
  width: 300,
};
const Container = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      text: "Write a cool JS library",
    },
    {
      id: 2,
      text: "Make it generic enough",
    },
    {
      id: 3,
      text: "GGG",
    },
  ]);
  const moveCard = (dragIndex, hoverIndex) => {
    console.log("befroe move Card", cards);
    const dragCard = cards[dragIndex];
    let temp = update(cards, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCard],
      ],
    });
    setCards(temp);
    console.log("after move cards", temp);
  };
  return (
    <div style={style}>
      {cards.map((card, i) => (
        <Card
          key={card.id}
          index={i}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
        />
      ))}
    </div>
  );
};
export default Container;

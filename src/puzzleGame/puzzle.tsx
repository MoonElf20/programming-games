import { useEffect, useState } from "react";
import { cardsDealt } from "../puzzleGame/puzzleGameFunctions";
import { Point, DisplayCard } from "./displayPuzzleCard";
import { Card } from "../shared/cardInterfaces";

let IntialpuzzlePieces: Card[] = [
  { rank: "a", suit: "hearts", value: 1 },
  { rank: 2, suit: "hearts", value: 2 },
  { rank: 3, suit: "hearts", value: 3 },
  { rank: 4, suit: "hearts", value: 4 },
  { rank: 5, suit: "hearts", value: 5 },
  { rank: 6, suit: "hearts", value: 6 },
  { rank: 7, suit: "hearts", value: 7 },
  { rank: 8, suit: "hearts", value: 8 },
  { rank: 9, suit: "hearts", value: 9 },
  
];

export const buildPuzzle = (puzzlePieces: Card[]) => {
  let row1: Card[] = [
    cardsDealt(puzzlePieces),
    cardsDealt(puzzlePieces),
    cardsDealt(puzzlePieces),
  ];
  let row2: Card[] = [
    cardsDealt(puzzlePieces),
    cardsDealt(puzzlePieces),
    cardsDealt(puzzlePieces),
  ];
  let row3: Card[] = [
    cardsDealt(puzzlePieces),
    cardsDealt(puzzlePieces),
    cardsDealt(puzzlePieces),
  ];
  return [row1, row2,row3];
};

const findAce = (puzzlePieces: Card[][]) => {
  for (let y = 0; y < puzzlePieces.length; y++) {
    const rowOfCards = puzzlePieces[y];
    const x = rowOfCards.findIndex(card =>card.rank === "a");
    if (x !== -1)
   { 
     return {y,x}
    }
    // for (let x = 0; x < rowOfCards.length; x++) {
    //   const card = rowOfCards[x];
    //   if (card.rank === "a") {
    //     return { y, x };
    //   }
    // }
  }
  return { x: -100, y: -100 };
};
const clickableCards = (ace: Point) => {
  let top: Point = { x: ace.x, y: ace.y - 1 };
  let bottom: Point = { x: ace.x, y: ace.y + 1 };
  let left: Point = { x: ace.x - 1, y: ace.y };
  let right: Point = { x: ace.x + 1, y: ace.y };
  return [top, bottom, left, right];
};
export const PuzzleGame = () => {
  const [puzzlePieces, setPuzzlePieces] = useState<Card[][]>([]);
  useEffect(() => {
    handleReset();
  }, []);
  const handleReset = () => {
    setPuzzlePieces(buildPuzzle(IntialpuzzlePieces));
  };
  
  const ace = findAce(puzzlePieces);
  const handleSwap = (currentPoint:Point) => {
   let tempCard = puzzlePieces[ace.y][ace.x]
   puzzlePieces[ace.y][ace.x]= puzzlePieces[currentPoint.y][currentPoint.x]
   puzzlePieces[currentPoint.y][currentPoint.x]= tempCard
   setPuzzlePieces([...puzzlePieces]) //... creates a new object 
     };

  const checkIsComplete=(puzzlePieces:Card[][]):Boolean=>{
    let counter = 1
    for (let y = 0; y < puzzlePieces.length; y++) {
      const rowOfCards = puzzlePieces[y];
      for (let x = 0; x < rowOfCards.length; x++) {
        const card = rowOfCards[x];
        if (card.value === counter){
          counter++
        }
        else return false 
      }
}
return true
  }
const isComplete = checkIsComplete(puzzlePieces)
  const clickPoints = clickableCards(ace);
  return (
    <div className="playingCards faceImages">
      {puzzlePieces.map((row, y) => {
        return (
          <div>
            {row.map((card, x) => (
              <DisplayCard
                suit={card.suit}
                rank={card.rank}
                currentPoint={{ x, y }}
                ace={ace}
                clickableCards={clickPoints}
                onSwap={(currentPoint)=>handleSwap(currentPoint)}
              />
            ))}
          </div>
        );
      })}{isComplete?"Completed":""}
    </div>
  );
};

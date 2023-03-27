import { useState } from 'react'
import Image from './image'

import whiteeye from './img/whiteeye.png';
import doge from './img/doge.png';
import Facepalm from './img/Facepalm.png';
import hey from './img/hey.png';
import NosePick from './img/NosePick.png';
import shock from './img/shock.png';

const defaultItems = [
    { id: 1, img: whiteeye, stat: '', disable: false },
    { id: 1, img: whiteeye, stat: '', disable: false },
    { id: 2, img: doge, stat: '', disable: false },
    { id: 2, img: doge, stat: '', disable: false },
    { id: 3, img: Facepalm, stat: '', disable: false },
    { id: 3, img: Facepalm, stat: '', disable: false },
    { id: 4, img: hey, stat: '', disable: false },
    { id: 4, img: hey, stat: '', disable: false },
    { id: 5, img: NosePick, stat: '', disable: false },
    { id: 5, img: NosePick, stat: '', disable: false },
    { id: 6, img: shock, stat: '', disable: false },
    { id: 6, img: shock, stat: '', disable: false }
  ].sort(() => Math.random() - 0.5);
  
  function Images() {
    const [items, setItems] = useState(defaultItems);
    const [prev, setPrev] = useState(-1);
    const [gameCount, setGameCount] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);
    const [turnCount, setTurnCount] = useState(0);
    // const [isGameCompleted, setIsGameCompleted] = useState(false);
  
    function check(current) {
      if (items[current].id === items[prev].id) {
        items[current].stat = 'correct';
        items[prev].stat = 'correct';
        items[current].disable = true;
        items[prev].disable = true;
        setItems([...items]);
        setPrev(-1);
        setSelectedItems([]);

        const isAllCorrect = items.every(item => item.stat === 'correct');
        if (isAllCorrect) {
            // setIsGameCompleted(true);
            setTimeout(() => {
                alert(`Congratulations, you completed the game in ${turnCount} turns`);
            }, 500);
        }
      } else {
        items[current].stat = 'wrong';
        items[prev].stat = 'wrong';
        setItems([...items]);
        setTimeout(() => {
          items[current].stat = '';
          items[prev].stat = '';
          items[current].disable = false;
          items[prev].disable = false;
          setItems([...items]);
          setPrev(-1);
          setSelectedItems([]);
        }, 1000);
      }
      setTurnCount(turnCount + 1);
    }
  
    function userclick(id) {
      if (items[id].disable) {
        return;
      }
  
      if (selectedItems.length >= 2) {
        return;
      }
  
      setSelectedItems((prevState) => [...prevState, id]);
  
      if (prev === -1) {
        items[id].stat = 'active';
        items[id].disable = true;
        setItems([...items]);
        setPrev(id);
      } else {
        check(id);
      }
    }
  
    function restartGame() {
      const newItems = defaultItems.map((item) => (
        {...item, stat: '', disable: false}
      ));
      setItems(newItems.sort(() => Math.random() - 0.5));
      setPrev(-1);
      setSelectedItems([]);
      setGameCount(gameCount + 1);
      setTurnCount(0);
    }
  
    return (
        <div className="container">
          {items.map((item, index) => (
            <Image key={`${gameCount}-${index}`} item={item} id={index} userclick={userclick} />
          ))}
          <button className="new-game-button" onClick={restartGame}>
            New Game
          </button>
          <div className="turnCount">Turn: {turnCount}</div>
        </div>
      );
}

export default Images
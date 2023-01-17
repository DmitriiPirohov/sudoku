import { useState } from "react";
import { Records } from "../records/Records";
import { GameSection } from "../gameSection/GameSection";

export const ChooseLevel = ({ name: namePage }) => {
  const [level, SetLevel] = useState('');

  function handleSubmit(el){
    return (
      SetLevel(el)
      // SetTime(timer.toLocaleString().slice(12, 20))
    )
  }

  return (
    <>{(level === '') &&
      ['easy', 'medium', 'very-hard', 'insane', 'inhuman'].map(el => (
        <button
          key={el}
          onClick={() => handleSubmit(el)}
        >
          {el}
        </button>
      ))}
      {(namePage === 'game' && level !== '') && <GameSection level={level} />}
      {(namePage === 'records' && level !== '') && <Records level={level} />}
    </>
  );
};

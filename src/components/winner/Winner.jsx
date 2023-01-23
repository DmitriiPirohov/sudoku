import { useState } from 'react';
import { Records } from '../records/Records';
import axios from 'axios';

export const Winner = ({ level, time }) => {
  const [winner, SetWinner] = useState('');
  const [record, SetRecord] = useState(false);

  const token = '5620111707:AAGf1rrRIh-boX02KLe10gWw-RtymFzQgq0';
  const chat_id = '-1001893354678';
  const URL_API = `https://api.telegram.org/bot${token}/sendMessage`;
  const timer = new Date().toLocaleString().slice(12, 20);

  function counterTime() {
    const firstTimer = +time.replace(/[:]/g, '');
    const secondTimer = +timer.replace(/[:]/g, '');
    let count = 0;

    for (let i = firstTimer; i <= secondTimer; i++) {
      count ++;
    }

    return count;
  }
  
  counterTime()
  

  const handleSubmit = () => {
    SetRecord(true);

    axios.post(URL_API, {
      chat_id: chat_id,
      text: `,{"${level}" : [{"name" : "${winner}", "time" : "${counterTime()}"}]}`
    });

  };
  return (
    <>
      {(record) ? <Records level={level} /> :
        <>
          <div>You are the best of the best!!!</div>
          <br />
          Please enter your name for history.
          <br />
          <input
            type="text"
            value={winner}
            onChange={(event) => SetWinner(prev => event.target.value)} />
          <br />
          <button onClick={() => handleSubmit()}>Ok</button></>}
    </>
  );
};

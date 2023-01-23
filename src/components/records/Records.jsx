import record from '../../data/records.json';
import { nanoid } from 'nanoid';
import '../records/records.scss';

export const Records = ({ level }) => {
  function getTime(par) {
    let hour = 0;
    let minutes = 0;
    let seconds = 0;
    let count = 0;

    for(let i = Number(par); i>=0; i--) {
      if(count === 60) {
        minutes++;
        count = 0;
      }

      if(minutes === 60) {
        hour++;
        minutes = 0;
      }

      if(i === 0) {
        seconds = count;
      }

      count ++;
    }

    const dubleZero = (a) => a === 0 ? '00' : a;

    return hour > 0 ? `0${hour} : ${dubleZero(minutes)} : ${dubleZero(seconds)}` : `${dubleZero(minutes)} : ${dubleZero(seconds)}`;
  }

  let arrWidthRecords = record.filter(element => element[`${level}`]).sort((a, b) => a[`${level}`].map(a => a.time) - b[`${level}`].map(a => a.time)).map(a => a[`${level}`].map(a =>`${a.name} - ${getTime(a.time)}`));

  return (
    <>
      <section className='Records'>
        <ol className='Records__list'>
          {
            arrWidthRecords.map(a => (
              <li key={nanoid(2)}>{a}</li>
            ))
          }
        </ol>
      </section>

    </>
  );
};



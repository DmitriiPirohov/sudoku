import record from '../../data/records.json';
import { nanoid } from 'nanoid';
import '../records/records.scss';

export const Records = ({ level }) => {
  let arrWidthRecords = record.filter(element => element[`${level}`]).map(a => a[`${level}`].map(a => `${a.name} - ${new Date(a.time * 1000).toUTCString().split(/ /)[4].slice(3)}`)).flat().sort((a, b) => a.split('-')[1] - b.split('-')[1]).splice(0, 10);

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



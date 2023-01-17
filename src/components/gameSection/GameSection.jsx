import '../gameSection/gameSectionStyle.scss';
import classNames from 'classnames'
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid'

import { getSudoku } from '../../lib/sudokufill.js';
import { Winner } from '../winner/Winner';

export const GameSection = ({ level, time }) => {
  const [chooseFill, SetChooseFill] = useState(-1);
  const [visibleArray, SetVisibleArray] = useState([]);
  const [button, SetButton] = useState(false);
  const [chooseRow, SetChooseRow] = useState(-1);
  const [chooseColumn, SetChooseColumn] = useState(-1);
  const [indexError, SetIndexError] = useState([-1]);
  const [solveString, SetSolveString] = useState('');
  const [draft, SetDraft] = useState(false);
  const [win, SetWin] = useState(false);

  const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const bottomBorder = [19, 20, 21, 22, 23, 24, 25, 26, 27, 46, 47, 48, 49, 50, 51, 52, 53, 54];

  useEffect(() => {
    SetVisibleArray(getSudoku().board_string_to_grid(getSudoku().generate(level)));
    // level
  }, []);

  // console.log(indexError);


  useEffect(() => {
    let ask = false;
    setMistake()
    // if (visibleArray.flat().join('').replace(/[+]/g, '').length === 81) {
    //   SetSolveString(getSudoku().solve(getSudoku().board_grid_to_string(visibleArray)));
    // }

    if(visibleArray.flat().toString().replace(/[,.+]/g, '').length === 81 && !visibleArray.flat().toString().includes('+')) {
      console.log(visibleArray.flat().toString().replace(/[,.+]/g, '').length);
      console.log(ask);
      console.log(indexError);
      if(ask === false && indexError.length === 1) {
        SetWin(true);
      }
    }
    
    function setMistake() {
      if (chooseRow !== -1 && chooseColumn !== -1) {
        let arrRowForCheck = visibleArray[chooseRow].map(a => a.replace(/[.]/g, ''));
        let value = visibleArray[chooseRow][chooseColumn].replace(/[.]/g, '');
        let arrColumnCheck = visibleArray.map(elem => elem[chooseColumn].replace(/[.]/g, ''));
        let arrBlockCheck = cub(chooseRow, chooseColumn).map(a => a.replace(/[.]/g, ''));
  
        function cub(r, c) {
          let start = (n) => n >= 6 ? 6 : n >= 3 ? 3 : 0;
  
          let arr = [];
          for (let i = 0; i < 3; i++) {
            arr.push(visibleArray[start(r) + i].slice(start(c), start(c) + 3))
          }
          return arr.flat();
        }
  
        if (visibleArray[chooseRow][chooseColumn] === '.') {
          return (
            ask = false,
            SetIndexError(prev => [...prev].filter(a => a !== chooseFill)));
        }
  
        if (arrRowForCheck.filter(a => a === value).length > 1) {
          return (
            ask = true,
            SetIndexError(prev => [...prev, chooseFill])
          )
        }
  
        if (arrBlockCheck.filter(a => a === value).length > 1) {
          return (
            ask = true,
            SetIndexError(prev => [...prev, chooseFill]));
        }
  
        if (arrColumnCheck.filter(a => a === value).length > 1) {
          return (
            ask = true,
            SetIndexError(prev => [...prev, chooseFill]));
        }
  
        if (arrRowForCheck.filter(a => a === value).length === 1) {
          return (
            SetIndexError(prev => [...prev].filter(a => a !== chooseFill))
          )
        }
  
        if (arrColumnCheck.filter(a => a === value).length === 1) {
          return (
            SetIndexError(prev => [...prev].filter(a => a !== chooseFill))
          )
        }
  
        if (arrBlockCheck.filter(a => a === value).length === 1) {
          return (
            SetIndexError(prev => [...prev].filter(a => a !== chooseFill))
          )
        }
      }
    }

    // setMistake()
  }, [visibleArray]);

  const selectedSell = (sell) => {
    const delenator = () => {
      let n = sell;
      let m = 0;
      while (n > 9) {
        n -= 9;
        m++;
      }

      return m;
    }

    if (sell !== chooseFill) {
      return (
        SetChooseFill(sell),
        SetButton(true),
        SetChooseColumn((sell - ((delenator()) * 9) - 1)),
        SetChooseRow(delenator())
      )
    }
    return (
      SetChooseFill(-1),
      SetButton(false)
    )
  }

  function drawCheker(n) {
    let arr = visibleArray;
    let start = (n) => n >= 6 ? 6 : n >= 3 ? 3 : 0;
    const firstCheker = arr[chooseRow].filter(a => a === `${n}`).length;
    const secondCheker = arr.map((a, i) => arr[i][chooseColumn]).filter(a => a === `${n}`).length;
    const thirdCheker = () => {
      let arrForChek = [];
      for (let i = 0; i < 3; i++) {
        for (let k = 0; k < 3; k++) {
          arrForChek.push(arr[start(chooseRow) + i][start(chooseColumn) + k])
        }
      }

      return arrForChek.filter(a => a === `${n}`).length;
    }

    if (firstCheker === 0 && secondCheker === 0 && thirdCheker() === 0) {
      arr[chooseRow] = arr[chooseRow].map((a) => a.includes('+') ? a.replace(n, '') : a);
    }

    if (secondCheker === 0 && firstCheker === 0 && thirdCheker() === 0) {
      for (let i = 0; i < 9; i++) {
        if (arr[i][chooseColumn].includes('+')) {
          arr[i][chooseColumn] = arr[i][chooseColumn].replace(n, '');
        }
      }
    }

    if (firstCheker === 0 && secondCheker === 0 && thirdCheker() === 0) {
      for (let i = 0; i < 3; i++) {
        for (let k = 0; k < 3; k++) {
          if (arr[start(chooseRow) + i][start(chooseColumn) + k].includes('+')) {
            arr[start(chooseRow) + i][start(chooseColumn) + k] = arr[start(chooseRow) + i][start(chooseColumn) + k].replace(n, '');
          }
        }
      }
    }

    SetVisibleArray(arr);
  }

  const fillSell = (number) => {
    if (!draft) {
      if (visibleArray[chooseRow][chooseColumn] !== `.${number}`) {
        drawCheker(number);
        SetVisibleArray(visibleArray.map((el, i) => i === chooseRow ? el.map((a, i) => i === chooseColumn ? `.${number}` : a) : el));
      } else {
        SetVisibleArray(visibleArray.map((el, i) => i === chooseRow ? el.map((a, i) => i === chooseColumn ? `.` : a) : el));
      }
    } else {
      let arr = [visibleArray[chooseRow][chooseColumn]].join('').replace(/[.,+]/g, '').split('');
      if (arr.filter(a => a !== '').length < 9) {
        if (!arr.includes(`${number}`)) {
          arr.push(number);
        } else {
          arr = arr.filter(a => a !== `${number}`);
        }
      } else {
        arr = arr.filter(a => a !== `${number}`);
      }
      if (arr.length >= 1) {
        SetVisibleArray(visibleArray.map((el, i) => i === chooseRow ? el.map((a, i) => i === chooseColumn ? `.${arr.sort((a, b) => a - b)}+` : a) : el));
      } else {
        SetVisibleArray(visibleArray.map((el, i) => i === chooseRow ? el.map((a, i) => i === chooseColumn ? `.` : a) : el));
      }
    }
  }

  function getDraft(res = '') {
    if(res === 'restart') {
      serviceButton('restart')
    }
    let candidate;

    if (visibleArray.flat().join('').length === 81) {
      candidate = getSudoku().get_candidates(getSudoku().board_grid_to_string(visibleArray));
    } else (
      candidate = getSudoku().get_candidates(getSudoku().board_grid_to_string(visibleArray.map(a => a.map(a => a.includes('.') ? '.' : a))))
    )

    SetVisibleArray(prev => prev.map((a, i) => a.map((a, k) => a === '.' ? a = `.${candidate[i][k]}+` : a)));
  }

  function serviceButton(val) {
    switch (val) {
      case 'chit':

        return getDraft('restart');

      case 'del':

        return SetVisibleArray(prev => prev.map((a, i) => i === chooseRow ? a.map((a, i) => i === chooseColumn ? '.' : a) : a));

      case 'restart':

        return (
          SetVisibleArray(prev => prev.map(a => a.map(a => a.includes('.') ? '.' : a))),
          SetIndexError([-1])
          );

      default:
        break;
    }
  }

  return (
    <section>
      {(win) ?
        <Winner level={level} time={time} /> :
        <>
          <table className='GameBord'>
            <tbody className='GameBord__body'>
              {
                rows.map(row => {
                  return (

                    <tr key={row} className='GameBord__row'>
                      {
                        rows.map((column, i) => {
                          const index = (row * 9 + column) + 1;

                          return (
                            <td
                              className={
                                classNames('GameBord__column', (index === chooseFill) && 'red',
                                  (index % 3 === 0) && 'right-border',
                                  (bottomBorder.includes(index)) && 'bottom-border')
                              }
                              key={index}
                            >
                              {
                                (visibleArray.length > 0 && !visibleArray[row][i].includes('.')) ?
                                  <div
                                    className='GameBord__father_number'
                                  >
                                    <div className='GameBord__father_number--num'>
                                      {visibleArray[row][i]}
                                    </div>
                                  </div>
                                  :
                                  <div
                                    type="text"
                                    onClick={() => selectedSell(index)}
                                    className={
                                      classNames('GameBord__input',
                                        (index === chooseFill && !indexError.includes(index) && !visibleArray[row][i].includes('+')) && 'GameBord__input--active',
                                        (indexError.includes(index) && !visibleArray[row][i].includes('+')) && 'GameBord__error error',
                                        (visibleArray.length > 0 && visibleArray[row][i].includes('+') && (visibleArray[row][i].replace(/[^1-9]/g, '').length >= 1)) && 'GameBord__input--draw',
                                        ((visibleArray.length > 0) && visibleArray[row][i].replace(/[.,]/g, '').split('').length <= 1) && 'GameBord__input--oneNum',
                                      )
                                    }
                                  >
                                    {(visibleArray.length > 0) &&
                                      (visibleArray[row][i]).replace(/[.,+]/gui, '')
                                    }
                                  </div>
                              }
                            </td>
                          )
                        })
                      }
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <section className='GameBord__buttons_container'>
            {
              (button) &&
              rows.map((push) => (
                <button
                  className={
                    classNames('GameBord__buttons',
                      (chooseRow !== -1 && chooseColumn !== -1 && visibleArray[chooseRow][chooseColumn].includes(`${push + 1}`)) &&
                      'GameBord__buttons GameBord__buttons--active'
                    )}
                  onClick={() => fillSell(push + 1)}
                  key={push + 1}
                >
                  {push + 1}
                </button>
              ))
            }
            {
              (button) &&
              <button
                className={
                  classNames('GameBord__buttons',
                    (draft) && 'selected'
                  )
                }
                onClick={() => SetDraft(prev => !prev)}
              >
                draft
              </button>
            }
            <br />
            {['chit', 'del', 'res'].map((el, i) => (
              <button
                className='GameBord__buttons'
                onClick={() => serviceButton(el === 'res' ? 'restart' : el)}
                key={el}
              >
                {el}
              </button>
            ))
            }
          </section>
        </>
      }
    </section>
  );
};

import { useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import './App.scss';

import { ChooseLevel } from "./components/chooseLevel/ChooseLevel";

function App() {
  const [activeExit, SetActiveExit] = useState(false)

  return (
    <div className="App">
      <div className="App__home">
        <nav>
          {
            (activeExit === false) ?
              <>
                <div className="App__botton_link">
                  <div>1</div>
                  {/* <Link
                    to="/play"
                    onClick={() => SetActiveExit(prev => !prev)}
                    className='App__link'
                  >
                    Play
                  </Link> */}
                </div>

                <br />

                <div className="App__botton_link">
                  {/* <Link
                    to="/chooseLevel"
                    onClick={() => SetActiveExit(prev => !prev)}
                    className='App__link'
                  >
                    Records
                  </Link> */}
                </div>

              </>
              :
              <div className="App__botton_link">
                {/* <Link
                  to="/"
                  onClick={() => SetActiveExit(prev => !prev)}
                  className='App__link'
                >
                  Exit
                </Link> */}
              </div>
          }
        </nav>

        {/* <Routes>
          <Route
            path="play"
            element={<ChooseLevel name={'game'} />}
          />

          <Route
            path="chooseLevel"
            element={<ChooseLevel name={'records'} />}
          />
        </Routes> */}
      </div>
    </div>
  );
}

export default App;

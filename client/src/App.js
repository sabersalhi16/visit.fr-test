/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect, useState } from 'react';
import Doughnut from './chart';
import axios from 'axios';
import './App.css';
function App() {
  const [results, setResults] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState([]);
  const data = [
    results.FIRST_INPUT_DELAY_MS?.percentile,
    results.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile,
    results.FIRST_CONTENTFUL_PAINT_MS?.percentile,
    results.LARGEST_CONTENTFUL_PAINT_MS?.percentile,
  ];

  const labels = [
    `FIRST INPUT DELAY MS ${results.FIRST_INPUT_DELAY_MS?.category}`,
    `CUMULATIVE LAYOUT SHIFT SCORE ${results.CUMULATIVE_LAYOUT_SHIFT_SCORE?.category}`,
    `FIRST CONTENTFUL PAINT MS ${results.CUMULATIVE_LAYOUT_SHIFT_SCORE?.category}`,
    `LARGEST CONTENTFUL PAINT MS ${results.CUMULATIVE_LAYOUT_SHIFT_SCORE?.category}`,
  ];
  function getRequest() {
    axios.get('http://localhost:5000/performance').then(res => {
      if (res.status === 200) {
        setResults(res.data);
        setLoaded(true);
      }
    });
  }
  useEffect(() => {
    setLoading(true);
    getRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {}, [loaded]);

  console.log('results', results, score);
  return (
    <div className="App">
      <div className="chart-container">
        {loaded ? (
          <>
            <Doughnut labels={labels} data={data} />

            <h1>Performance Score {score}</h1>
          </>
        ) : (
          loading && (
            <div className="container-loading">
              <div className="loader"></div>
            </div>
          )
        )}
      </div>
      )
    </div>
  );
}

export default App;

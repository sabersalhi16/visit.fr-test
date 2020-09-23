/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect, useState } from "react";
import Doughnut from "./chart";
import "./App.css";
function App() {
  const CLIENT_ID = process.env.CLIENT_ID;
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  const URL_TESTED = process.env.URL_TESTED;
  const [signingIn, setSigningIn] = useState(false);
  const [results, setResults] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState([]);
  const data = [
    (results["first-contentful-paint"]?.score * 100).toFixed(0),
    (results["speed-index"]?.score * 100).toFixed(0),
    (results["largest-contentful-paint"]?.score * 100).toFixed(0),
    (results["total-blocking-time"]?.score * 100).toFixed(0),
    results["cumulative-layout-shift"]?.score < 0
      ? (results["cumulative-layout-shift"]?.score * 100).toFixed(0)
      : results["cumulative-layout-shift"]?.score,
  ];

  const labels = [
    "First Contentful Paint",
    "Speed Index",
    "Largest Contentful Paint",
    "Time to Interactive",
    "Cumulative Layout Shift",
  ];
  useEffect(() => {
    window.gapi.load("client:auth2", function () {
      window.gapi.auth2.init({
        client_id: CLIENT_ID,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (loaded) {
      setScore(data.slice(0, 5).map((row) => +row));
    }
  }, [loaded]);
  function execute() {
    setLoading(true);
    setLoaded(false);
    return window.gapi.client.pagespeedonline.pagespeedapi
      .runpagespeed({
        category: ["performance"],
        strategy: "mobile",
        url: URL_TESTED,
      })
      .then(
        function (response) {
          if (response.status === 200) {
            setResults(response.result.lighthouseResult.audits);
            setLoaded(true);
            setLoading(false);
            // console.log("results", results);
          }
          // Handle the results here (response.result has the parsed body).
        },
        function (err) {
          console.error("Execute error", err);
        }
      );
  }
  function loadClient() {
    window.gapi.client.setApiKey(GOOGLE_API_KEY);
    return window.gapi.client
      .load(
        "https://content.googleapis.com/discovery/v1/apis/pagespeedonline/v5/rest"
      )
      .then(
        function () {
          console.log("GAPI client loaded for API");
        },
        function (err) {
          console.error("Error loading GAPI client for API", err);
        }
      );
  }
  function authenticate() {
    return window.gapi.auth2
      .getAuthInstance()
      .signIn({ scope: "openid" })
      .then(
        function () {
          setSigningIn(true);
          console.log("Sign-in successful");
        },
        function (err) {
          console.error("Error signing in", err);
        }
      );
  }
  console.log("results", results, score);
  return (
    <div className='App'>
      {signingIn ? (
        <button className='login_with_google' onClick={() => execute()}>
          Executez les analyses de performance
        </button>
      ) : (
        <button
          className='login_with_google'
          onClick={() => authenticate().then(loadClient)}
        >
          Connectez-vous avec google
        </button>
      )}
      {signingIn && (
        <div className='chart-container'>
          {loaded ? (
            <>
              <Doughnut labels={labels} data={data} />
              <h1>Performance Score{}</h1>
            </>
          ) : (
            loading && (
              <div className='container-loading'>
                <div className='loader'></div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default App;

import React from "react";
import { useEffect } from "react";

import "./App.css";
const CLIENT_ID = process.env.CLIENT_ID;
function App() {
  useEffect(() => {
    window.gapi.load("client:auth2", function () {
      window.gapi.auth2.init({
        client_id: CLIENT_ID,
      });
    });
  }, []);
  function execute() {
    return window.gapi.client.pagespeedonline.pagespeedapi
      .runpagespeed({
        category: ["performance"],
        strategy: "mobile",
        url: "https://www.voici.fr/",
      })
      .then(
        function (response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response);
        },
        function (err) {
          console.error("Execute error", err);
        }
      );
  }
  function loadClient() {
    window.gapi.client.setApiKey("AIzaSyDzBl7JJLD1D0GFh_RXsqwHg4rKUJJZz8k");
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
          console.log("Sign-in successful");
        },
        function (err) {
          console.error("Error signing in", err);
        }
      );
  }
  return (
    <div className='App'>
      <button onClick={() => authenticate().then(loadClient)}>
        authorize and load
      </button>
      <button onClick={() => execute}>execute</button>
    </div>
  );
}

export default App;

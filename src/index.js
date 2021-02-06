import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Lobby from "./Lobby"
import axios from "axios"
// import { lobbyClient } from 'boardgame.io/react'

// const ping = async () => {
//   const x = await axios.get("http://localhost:8000/games")
//   console.log(x)
// }

// ping()
// const 

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

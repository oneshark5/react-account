import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios'

// // GET
// axios.get("/items").then((response) => {
//   console.log(response);
// })

// // POST
// const newItem = {
//   "title": "喝茶",
//   "price": 200,
//   "date": "2022-05-29",
//   "monthCategory": "2022-05",
//   "id": "_fghjkls34",
//   "cid": 2,
//   "timestamp": 1653782400000
// }
// axios.post('/items', newItem).then((response) => {
//   console.log(response);
// }).catch(err => {
	
// })


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

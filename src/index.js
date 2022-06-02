import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Table from "./componenets/table";
import Add from "./componenets/add";
import Edit from './componenets/edit';
import Details from "./componenets/details";




const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route path = "view" element={<Table/>}></Route>
          <Route path = "add" element={<Add/>}></Route>
          <Route path = "edit/:id" element={<Edit/>}></Route>
          <Route path = "/view/details/:id/:index" element={<Details/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>

    
  </React.StrictMode>
);


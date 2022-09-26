import React from "react";
import { BrowserRouter, Route,Routes } from "react-router-dom";
import Home from "./component/Home";
import Tv from "./component/Tv";
import Header from "./common/Header";
function App() {
  return (
    <div>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/tv" element={<Tv/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

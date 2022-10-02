import React from "react";
import { BrowserRouter, Route,Routes } from "react-router-dom";
import Home from "./component/Home";
import Tv from "./component/Tv";
import Header from "./common/Header";
import { ReactQueryDevtools } from 'react-query/devtools'
import Search from "./component/Search";
function App() {
  return (
    <div>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={< Home />}>
            <Route path="/moive/:nick/:movieId" />
            <Route path="/moive/:movieId" />
            <Route path="/movie/*"/>
          </Route>
          <Route path="/tv" element={<Tv/>}/>
          <Route path="/search" element={<Search/>}/>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}

export default App;

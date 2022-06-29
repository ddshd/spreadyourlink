import React, {Fragment, ReactNode} from 'react';
import './App.css';
import {Instructions} from "./Instructions/Instructions";
import Navigation from "./Navigation";
import {Route, Router, Routes} from "react-router";
import {BrowserRouter} from "react-router-dom";
import {Home} from "./Home/Home";

class App extends React.Component {
  public render(): ReactNode {
    return (
      <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/:userId" element={<Home/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/instructions" element={<Instructions/>}/>
                </Routes>
                <Navigation></Navigation>
            </BrowserRouter>
        </div>
    );
  }
}

export default App;

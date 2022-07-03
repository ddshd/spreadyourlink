import React, {ReactNode} from 'react';
import './App.css';
import {Instructions} from "./Instructions/Instructions";
import Navigation from "./Navigation";
import {Route, Routes} from "react-router";
import {BrowserRouter} from "react-router-dom";
import {Home} from "./Home/Home";
import {Legal} from "./Legal/Legal";

class App extends React.Component {
    public render(): ReactNode {
        return (
            <BrowserRouter>
                <div className="content">
                    <Routes>
                        <Route path="/:userId" element={<Home/>}/>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/instructions" element={<Instructions/>}/>
                        <Route path="/legal" element={<Legal/>}/>
                    </Routes>
                </div>
                <Navigation></Navigation>
            </BrowserRouter>
        );
    }
}

export default App;

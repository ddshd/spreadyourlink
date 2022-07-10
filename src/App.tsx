import React, {ReactNode} from 'react';
import './App.css';
import Navigation from "./Navigation";
import {Route, Routes} from "react-router";
import {BrowserRouter, HashRouter} from "react-router-dom";
import Home from "./Home/Home";
import {NON_HOME_ROUTES} from "./other/variables";

export default function App() {
    return (
        <Router>
            <div className="content">
                <Routes>
                    <Route path="/:userId" element={<Home/>}/>
                    <Route path="/" element={<Home/>}/>
                    {
                        NON_HOME_ROUTES.map(route => <Route key={route.location} path={route.location}
                                                            element={route.component}/>)
                    }
                </Routes>
            </div>
            <Navigation/>
        </Router>
    );
}

function Router(props: { children: ReactNode }) {
    let {children} = props;
    if (process.env.REACT_APP_REAL_SERVER) {
        return (
            <BrowserRouter>
                {children}
            </BrowserRouter>
        )
    } else {
        return (
            <HashRouter basename='/'>
                {children}
            </HashRouter>
        );
    }
}

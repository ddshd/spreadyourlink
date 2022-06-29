import React, {Component, Fragment, ReactNode} from "react";
import './Home.css';
import LoggedInHome from "../LoggedInHome/LoggedInHome";
import {useParams} from "react-router-dom";
import NewUserHome from "../NewUserHome/NewUserHome";

export function Home() {
    let link: string = "https://example.com/users/https://example.com/users/https://example.com/users/https://example.com/users/https://example.com/users/https://examp";
    let {userId} = useParams();

    return (
        <Fragment>
            {userId ? <LoggedInHome id={userId}/> : <NewUserHome/>}
        </Fragment>
    )
}

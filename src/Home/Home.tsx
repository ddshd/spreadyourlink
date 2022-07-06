import React, {Fragment} from "react";
import './Home.css';
import LoggedInHome from "../LoggedInHome/LoggedInHome";
import {useParams} from "react-router-dom";
import NewUserHome from "../NewUserHome/NewUserHome";
import {getSecretCodeCookie} from "../other/cookies";


export function Home() {
    let {userId} = useParams();
    userId = userId || getSecretCodeCookie();

    return (
        <Fragment>
            {userId ? <LoggedInHome id={userId}/> : <NewUserHome/>}
        </Fragment>
    )
}

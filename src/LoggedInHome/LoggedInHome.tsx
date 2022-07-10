import React, {ReactElement, useEffect, useState} from "react";
import './LoggedInHome.css';
import {Button, Chip, TextField, Tooltip, Zoom} from "@mui/material";
import {ArrowForwardIos, Logout, OpenInFull} from "@mui/icons-material";
import {redirect, removeSecretCodeCookie, setSecretCodeCookie} from "../other/cookies";
import {WEBSITE_NAME} from "../other/variables";
import {Link} from "react-router-dom";
import restCalls from "../other/restCalls";
import BookmarkIcon from '@mui/icons-material/Bookmark';

interface LoggedInHomeProps {
    id: string
}

interface LoggedInHomeState {
    link: string
}

export default function LoggedInHome(props: LoggedInHomeProps): ReactElement {
    const [state, setState] = useState<LoggedInHomeState>({link: "Loading..."});
    setSecretCodeCookie(props.id);

    useEffect(() => {
        // component Did Mount
        if (!window.location.href.includes(props.id)) {
            if (redirect(`/${props.id}`)) {
                return;
            }
        }
        restCalls.getLink(props.id).then((link: string) => {
            setState({link: link});
        });
    }, [props.id]);

    function isLoading(): boolean {
        return state.link === 'Loading...';
    }

    function handleFocus() {
        // event.target.select();
        if (!isLoading()) {
            navigator.clipboard.writeText(state.link).then();
        }
    }


    return (
        <div className="App-header App">
            <h1>{WEBSITE_NAME}</h1>
            <p style={{fontSize: '0.4em'}}>By using this service you agree to the Terms and Conditions, and Privacy
                Policy at <Link className="link-changed" to="/legal">/legal</Link>.</p>
            <div>
                <Tooltip disableHoverListener={isLoading()} arrow TransitionComponent={Zoom}
                         title="Copy link to clipboard">
                    <Button onClick={handleFocus}>
                        <TextField id="redirect-link" onFocus={handleFocus} disabled
                                   value={state.link}/>
                    </Button>
                </Tooltip>
            </div>
            <div className="redirect-buttons">
                <Button disabled={isLoading()}
                        onClick={() => redirect(`https://www.youtube.com/redirect?q=${state.link}`)}
                        size="large" variant="outlined">
                    Full screen
                    <OpenInFull className="redirect-button-icon"/>
                    <Chip className="redirect-button-icon" disabled label="Tesla Only"/>
                </Button>

                <Button disabled={isLoading()} onClick={() => redirect(state.link)} size="large"
                        variant="contained">
                    Current window
                    <ArrowForwardIos className="redirect-button-icon"/>
                </Button>
            </div>

            <div className='top-buttons'>
                <Chip className='bookmark-button-chip' color="warning" label={
                    <span className='bookmark-button'>
                                <BookmarkIcon fontSize='small'/> Bookmark this page for easy access
                            </span>
                }/>

                <Tooltip arrow TransitionComponent={Zoom} title="Logout">
                    <Chip className='logout-button' label={<Logout fontSize='small'/>} onClick={() => {
                        removeSecretCodeCookie();
                        redirect('/');
                    }} color="error"/>
                </Tooltip>
            </div>
        </div>
    );
}

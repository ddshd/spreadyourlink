import React, {Component, ReactNode} from "react";
import './LoggedInHome.css';
import {Button, Chip, TextField, Tooltip, Zoom} from "@mui/material";
import {ArrowForwardIos, Logout, OpenInFull} from "@mui/icons-material";
import {redirect, removeSecretCodeCookie, setSecretCodeCookie} from "../other/cookies";
import {WEBSITE_NAME} from "../other/variables";
import {Link} from "react-router-dom";
import restCalls from "../other/restCalls";

interface LoggedInHomeProps {
    id: string
}

interface LoggedInHomeState {
    link: string
}

export default class LoggedInHome extends Component<LoggedInHomeProps, LoggedInHomeState> {

    constructor(props: LoggedInHomeProps) {
        super(props);
        this.state = {link: "Loading..."};
        this.handleFocus = this.handleFocus.bind(this);
        setSecretCodeCookie(this.props.id);
    }

    async componentDidMount() {
        if (!window.location.href.includes(this.props.id)) {
            if (redirect(`/${this.props.id}`)) {
                return;
            }
        }
        this.setState({link: await restCalls.getLink(this.props.id)});
    }

    private isLoading() {
        return this.state.link === 'Loading...';
    }

    private handleFocus(): void {
        // event.target.select();
        if (!this.isLoading()) {
            navigator.clipboard.writeText(this.state.link).then();
        }
    };

    public render(): ReactNode {
        return (
            <div className="App-header App">
                <h1>{WEBSITE_NAME}</h1>
                <p style={{fontSize: '0.4em'}}>By using this service you agree to the Terms and Conditions, and Privacy
                    Policy at <Link className="link-changed" to="/legal">/legal</Link>.</p>
                <div>
                    <Tooltip disableHoverListener={this.isLoading()} arrow TransitionComponent={Zoom}
                             title="Copy link to clipboard">
                        <Button onClick={this.handleFocus}>
                            <TextField id="redirect-link" onFocus={this.handleFocus} disabled
                                       value={this.state.link}/>
                        </Button>
                    </Tooltip>
                </div>
                <div className="redirect-buttons">
                    <Button disabled={this.isLoading()}
                            onClick={() => redirect(`https://www.youtube.com/redirect?q=${this.state.link}`)}
                            size="large" variant="outlined">
                        Full screen
                        <OpenInFull className="redirect-button-icon"/>
                        <Chip className="redirect-button-icon" disabled label="Tesla Only"/>
                    </Button>

                    <Button disabled={this.isLoading()} onClick={() => redirect(this.state.link)} size="large"
                            variant="contained">
                        Current window
                        <ArrowForwardIos className="redirect-button-icon"/>
                    </Button>
                </div>

                <Tooltip arrow TransitionComponent={Zoom} title="Logout">
                    <Chip label={<Logout fontSize='small'/>} className='logout-button' onClick={() => {
                        removeSecretCodeCookie();
                        redirect('/');
                    }} color="error"/>
                </Tooltip>
            </div>
        )
    }
}

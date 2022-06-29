import React, {Component, ReactNode} from "react";
import './LoggedInHome.css';
import {Button, TextField, Tooltip, Zoom} from "@mui/material";
import {ArrowForwardIos, OpenInFull} from "@mui/icons-material";

interface LoggedInHomeProps {
    id: string
}

export default class LoggedInHome extends Component<LoggedInHomeProps> {
    protected link: string = "https://example.com/users/https://example.com/users/https://example.com/users/https://example.com/users/https://example.com/users/https://examp";

    constructor(props: LoggedInHomeProps) {
        super(props);
        this.handleFocus = this.handleFocus.bind(this);
    }

    private handleFocus(): void {
        // event.target.select();
        navigator.clipboard.writeText(this.link).then();
    };


    private redirect(link: string) {
        window.location.href = link;
    };

    public render(): ReactNode {
        return (
            <div className="App-header App">
                <h1>SpreadYourLinks</h1>
                <div>
                    <Tooltip arrow TransitionComponent={Zoom} title="Copy link to clipboard">
                        <Button onClick={this.handleFocus}>
                            <TextField style={{color: 'white'}} id="redirect-link" onFocus={this.handleFocus} disabled
                                       value={this.link}/>
                        </Button>
                    </Tooltip>
                </div>
                <div className="redirect-buttons">
                    <Button onClick={() => this.redirect(`https://www.youtube.com/redirect?q=${this.link}`)} size="large" variant="outlined">Full screen
                        <OpenInFull className="redirect-button-icon" />
                    </Button>

                    <Button onClick={() => this.redirect(this.link)} size="large" variant="contained">Normal browser
                        <ArrowForwardIos className="redirect-button-icon" />
                    </Button>
                </div>
            </div>
        )
    }
}

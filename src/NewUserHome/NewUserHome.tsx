import React, {Component, ReactNode} from "react";
import {Button, TextField, Tooltip, Zoom} from "@mui/material";
import {ArrowForwardIos, OpenInFull} from "@mui/icons-material";

interface NewUserHomeState {
    userEnteredSecretCode: string;
}

export default class NewUserHome extends Component<{}, NewUserHomeState> {
    public constructor(props: {}) {
        super(props);
        this.state = {
            userEnteredSecretCode: ""
        };
    }


    public render(): ReactNode {

        return (
            <div className="App-header App">
                <h1>Welcome to SpreadYourLinks</h1>

                <h2>Know your secret code? Enter it here</h2>

                <form action={`/${this.state.userEnteredSecretCode}`}>
                    <TextField
                        color='success'
                        id="outlined-name"
                        label="Secret Code"
                        onChange={(e) => this.setState({userEnteredSecretCode: e.target.value})}
                    />
                </form>

            </div>
        )
    }

}

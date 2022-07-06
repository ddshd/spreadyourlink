import {Accordion, AccordionDetails, AccordionSummary, Button, Typography} from "@mui/material";
import React, {Component, ReactNode} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {booklet} from "../other/booklet";
import {getSecretCodeCookie} from "../other/cookies";

export class Instructions extends Component {
    protected bookletText = booklet(getSecretCodeCookie());


    public render(): ReactNode {
        return (
            <div className="App-header App">
                <h1>Instructions</h1>

                {getSecretCodeCookie() ?

                    <Accordion style={{width: "70vw"}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Booklet Installation</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="AccordionDetails-text">
                                Drag the following link to your bookmarks:
                                <Button style={{marginLeft: '10px'}}
                                        href={this.bookletText} variant="contained"
                                        onClick={this.prepareBookmark}>SpreadYourLink</Button>
                                <pre style={{wordBreak: "break-word", whiteSpace: "pre-wrap"}}>{this.bookletText}</pre>
                            </div>
                        </AccordionDetails>
                    </Accordion>


                    : <p>Please sign in using your secret code on the home page</p>

                }
            </div>
        )
    }

    private prepareBookmark(e: any) {
        e.preventDefault();
    }
}

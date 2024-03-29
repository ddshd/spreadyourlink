import {Accordion, AccordionDetails, AccordionSummary, Button, Chip, Tooltip, Typography, Zoom} from "@mui/material";
import React, {ReactElement} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {booklet} from "../other/booklet";
import {getSecretCodeCookie} from "../other/cookies";
import {Link} from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import './Instructions.css';

export default function Instructions(): ReactElement {
    const secretCode = getSecretCodeCookie();
    const bookletText = booklet(secretCode);

    return (
        <div className="App-header App fix-nav-hidden-content">
            <h1>Instructions</h1>

            {secretCode ?

                <>
                    <h2 style={{marginBottom: '0px'}}>How do I update my link?</h2>
                    <h3 style={{marginTop: '0px'}}>Here are a few options:</h3>
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
                                <div>
                                    Drag the following link to your bookmarks:
                                    <Button style={{marginLeft: '10px'}}
                                            href={bookletText} variant="contained"
                                            onClick={(e: any) => {
                                                e.preventDefault()
                                            }}>SpreadYourLink</Button>
                                </div>
                                <div style={{marginTop: '10px'}}>
                                    Or bookmark this page and replace URL with the text below:
                                    <pre style={{
                                        wordBreak: "break-all",
                                        whiteSpace: "pre-wrap",
                                        userSelect: "all"
                                    }}>{bookletText}</pre>
                                </div>
                                <div>
                                    Now you can simply call the bookmark on any page you'd like to set the link
                                    to. <Link className='link-changed' to="/legal">Ensure the link is acceptable within
                                    the terms</Link>.
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>

                    <div className='top-buttons'>
                        <Tooltip arrow TransitionComponent={Zoom}
                                 title="Copy secret code to clipboard">
                            <Chip onClick={() => {
                                navigator.clipboard.writeText(secretCode).then();
                            }} color="info" label={
                                <span className='secret-code-info'>
                                    <InfoIcon className='secret-code-info-icon' fontSize='small'/>
                                    Your secret code is {secretCode}
                                </span>
                            }/>
                        </Tooltip>
                    </div>
                </>


                : <p>Please sign in using your secret code on the home page</p>

            }
        </div>
    )
}

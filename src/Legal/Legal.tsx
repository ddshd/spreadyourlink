import {Accordion, AccordionDetails, AccordionSummary, Button, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TermsAndConditions from "./terms";
import PrivacyPolicy from "./privacy";
import React, {ReactElement} from "react";

export default function Legal(): ReactElement {
    return (
        <div className="App-header App fix-nav-hidden-content">
            <h1>Legal</h1>

            <Accordion style={{width: "70vw"}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>How do you make money?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="AccordionDetails-text">
                        <h3>The age old question, how do I/we make money running this website?</h3>
                        <p>We don't. We just setup this project to fix the issue of having to type URLs on
                            interfaces which are not designed for it.</p>
                        <p>Currently the front-end runs on GitHub Pages, so it is "free" (see: GitHub's Terms and
                            Privacy Policy). I pay a small fee to run the back-end to MongoDB (Cloud Database),
                            Heroku, and Google for using it's API.</p>
                        <p>I just develop this Service in my free-time, and anyone is able to contribute to
                            front-end development through the GitHub. As a software engineer, this is not a service
                            that is very technically hard to keep running.</p>
                        <p>Currently the costs are within my means. If at any point I can no longer afford to
                            continue paying those costs then I will have to find a way to either:</p>
                        <ol>
                            <li>run ads</li>
                            <li>find a method of raising money (through donations, etc..)</li>
                            <li>shut down the service</li>
                        </ol>
                        <p>In the unlikely chance that happens, I will collect feedback on the method to take, most
                            likely through the GitHub repository.</p>
                        <h3>What data do you collect, and why?</h3>
                        <p>Aside from the information in the policies below, I use Google Analytics to track the
                            usage of the Service. This is so see if there are any errors, bugs, and to track where
                            and how people are using the Service.</p>
                        <p>The how and where information is helpful to decide if additional API endpoints should be
                            setup in specific regions for faster access.</p>
                        <p></p>
                        <p>I also use some other third-party services such as Heroku and MongoDB Cloud (back-end
                            hosting), Google Cloud Platform (certain APIs to scan for malicious links), GitHub Page
                            (front-end hosting). You should check and agree to their respective Terms and Privacy
                            Policies.</p>
                        <p>This is an incomplete list as I'm always prototyping new tools to use for fast access,
                            i.e. Cloudflare.</p>
                    </div>
                </AccordionDetails>
            </Accordion>


            <Accordion style={{width: "70vw"}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Terms and Conditions</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{textAlign: "left"}}>
                        {TermsAndConditions()}
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion style={{width: "70vw"}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Privacy Policy</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{textAlign: "left"}}>
                        {PrivacyPolicy()}
                    </div>
                </AccordionDetails>
            </Accordion>


            <Accordion style={{width: "70vw"}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Attribution</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <Button href="https://raw.githubusercontent.com/ddshd/spreadyourlink/main/LICENSE">Front-end
                            license
                            details</Button>
                    </div>
                    <div>
                        <Button href="https://www.flaticon.com/free-icons/link" title="link icons">Some icons created by
                            Freepik - Flaticon</Button>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

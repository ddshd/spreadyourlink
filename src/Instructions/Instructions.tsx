import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    TextField,
    Tooltip,
    Typography,
    Zoom
} from "@mui/material";
import React, {Component, ReactNode} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export class Instructions extends Component {
    public render(): ReactNode {
        return (
            <div className="App-header App">
                <h1>Instructions</h1>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Booklet Installation</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        )
    }
}

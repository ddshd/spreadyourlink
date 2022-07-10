import React, {ReactElement, ReactNode, useState} from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Slide,
    TextField,
    Typography
} from "@mui/material";
import {redirect, removeSecretCodeCookie} from "../other/cookies";
import './NewUserHome.css';
import {TransitionProps} from "@mui/material/transitions";
import {WEBSITE_NAME} from "../other/variables";
import restCalls from "../other/restCalls";
import {CountdownCircleTimer} from "react-countdown-circle-timer";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


interface NewUserHomeState {
    userEnteredSecretCode: string;
    dialogOpen: boolean;
    rateLimitExpire: number;
}

export default function NewUserHome(): ReactElement {
    const [state, setState] = useState<NewUserHomeState>({
        userEnteredSecretCode: "",
        dialogOpen: false,
        rateLimitExpire: 0
    });
    removeSecretCodeCookie();

    async function handleClose(termsAgreed: boolean) {
        setState({...state, dialogOpen: false});
        if (termsAgreed) {
            const apiRes = await restCalls.createNewSecretCode();
            const apiResData = await apiRes.json();

            if (apiRes.ok && apiResData.inserted) {
                redirect(`/${apiResData.secretCode}`);
            } else if (apiRes.headers.get('RateLimit-Reset')) {
                setState({...state, rateLimitExpire: +(apiRes.headers.get('RateLimit-Reset') || "0")});
            }
        }
    }

    function signupDialog(): ReactNode {
        return (
            <div>
                <Dialog
                    open={state.dialogOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => handleClose(false)}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>Do you agree to the following terms?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            By using this service, you agree to following Terms and Conditions, and Privacy Policy. We
                            are not responsible for any harm you do to your device by following the links shared with
                            this new secret code.
                            Please refrain from submitting any information that contains PII (Personally Identifiable
                            Information), leads to harmful, or illegal material.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose(false)}>Disagree</Button>
                        <Button onClick={() => handleClose(true)}>Agree</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    function handleClickOpen() {
        setState({...state, dialogOpen: true});
    }

    function rateLimitTimer(): ReactElement {
        const timerChild = (data: { remainingTime: any }) => {
            return (
                <span className="countdown-text">
                <p>Try again in:</p>
                <p className="countdown-value">{data.remainingTime}</p>
                <p>seconds</p>
            </span>
            );
        }

        return (<span className="timer-wrapper">
            <CountdownCircleTimer
                isPlaying
                duration={state.rateLimitExpire}
                colors={["#ffe26a", "#75c9b7", "#b6c48e", "#abd699"]}
                colorsTime={
                    [Math.round(state.rateLimitExpire * 0.8), Math.round(state.rateLimitExpire * 0.6),
                        Math.round(state.rateLimitExpire * 0.4), 0]
                }
                onComplete={() => {
                    setState({
                        ...state,
                        rateLimitExpire: 0
                    });
                }}
            >
                {timerChild}
            </CountdownCircleTimer>
        </span>);
    }

    return (
        <div className="App-header App">
            <h1>Welcome to {WEBSITE_NAME}</h1>

            <Grid container
                  direction="column"
                  justifyContent="center"
                  alignItems="center" spacing={2}>
                <Grid item xs={3}>
                    <Card sx={{width: 385}}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Know your secret code?
                            </Typography>
                            <Typography sx={{mb: 1.5}} color="text.secondary">
                                Enter it here
                            </Typography>
                            <span>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    redirect(`/${state.userEnteredSecretCode}`);
                                }}>
                                    <TextField
                                        autoCorrect='off'
                                        autoCapitalize='off'
                                        type="text"
                                        color='success'
                                        id="outlined-name"
                                        label="Secret Code"
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                                            setState({
                                                ...state,
                                                userEnteredSecretCode: e.target.value
                                            })}
                                    />
                                    <Button style={{marginTop: '10px'}} color='success' fullWidth
                                            variant='contained' type="submit"
                                            size="small">Go</Button>
                                </form>
                            </span>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card sx={{width: 385}}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                New user?
                            </Typography>
                            {state.rateLimitExpire + Date.now() - 2 < Date.now() ?
                                (<><Typography sx={{mb: 1.5}} color="text.secondary">
                                    Get a secret code
                                </Typography><span>
                                            <CardActions disableSpacing>
                                                <Button color='success' onClick={handleClickOpen} fullWidth
                                                        variant='contained' type="submit" size="small">Go</Button>
                                            </CardActions>
                                        </span></>) : rateLimitTimer()
                            }
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            {signupDialog()}
        </div>
    );
}

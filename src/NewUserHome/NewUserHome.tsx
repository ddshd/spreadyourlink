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
import {TransitionProps} from "@mui/material/transitions";
import LoadingButton from '@mui/lab/LoadingButton';
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import './NewUserHome.css';
import {redirect, removeSecretCodeCookie} from "../other/cookies";
import {WEBSITE_NAME} from "../other/variables";
import restCalls from "../other/restCalls";
import TagManager from 'react-gtm-module';

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
    rateLimitExpire: number;
}

export default function NewUserHome(): ReactElement {
    const [state, setState] = useState<NewUserHomeState>({
        userEnteredSecretCode: "",
        rateLimitExpire: 0,
    });
    const [loadingState, setLoadingState] = useState<boolean>(false);
    const [dialogOpen, setDialogState] = useState<boolean>(false);
    removeSecretCodeCookie();

    async function handleClose(termsAgreed: boolean) {
        TagManager.dataLayer({
            dataLayer: {
                event: "signupDialog_closed",
                frontend: true,
                termsAgreed: termsAgreed,
                time: Date.now().toLocaleString()
            },
            dataLayerName: "PageDataLayer"
        });

        setDialogState(false);
        if (termsAgreed) {
            setLoadingState(true);
            const apiRes = await restCalls.createNewSecretCode();

            const gtm_tag_manager_data_layer = {
                dataLayer: {
                    event: "new_secret_code",
                    frontend: true,
                    failed: false,
                    secret_code: "",
                    reason: ""
                },
                dataLayerName: "PageDataLayer"
            };

            const apiResData = await apiRes.json();
            setLoadingState(false);

            if (apiRes.ok && apiResData.inserted) {

                gtm_tag_manager_data_layer.dataLayer.failed = false;
                gtm_tag_manager_data_layer.dataLayer.secret_code = apiResData.secretCode;
                gtm_tag_manager_data_layer.dataLayer.reason = "";
                TagManager.dataLayer(gtm_tag_manager_data_layer);

                redirect(`/${apiResData.secretCode}`);
            } else if (apiRes.headers.get('RateLimit-Reset')) {

                gtm_tag_manager_data_layer.dataLayer.failed = true;
                gtm_tag_manager_data_layer.dataLayer.secret_code = "";
                gtm_tag_manager_data_layer.dataLayer.reason = "Rate_Limited";
                TagManager.dataLayer(gtm_tag_manager_data_layer);

                setState({...state, rateLimitExpire: +(apiRes.headers.get('RateLimit-Reset') || "0")});
            }
        }
    }

    function signupDialog(): ReactNode {
        TagManager.dataLayer({
            dataLayer: {
                event: "signupDialog_opened",
                frontend: true,
                time: Date.now().toLocaleString()
            },
            dataLayerName: "PageDataLayer"
        });

        return (
            <div>
                <Dialog
                    open={dialogOpen}
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
        setDialogState(true);
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

    function renderCard() {
        if (loadingState) {
            return (<LoadingButton
                size="large"
                loading={loadingState}
                variant="contained"
                disabled
            >Loading</LoadingButton>);
        }
        else if (state.rateLimitExpire + Date.now() - 2 >= Date.now()) {
            return rateLimitTimer();
        }
        else {
            return (<><Typography sx={{mb: 1.5}} color="text.secondary">
                Get a secret code
            </Typography><span>
                <CardActions disableSpacing>
                    <Button color='success' onClick={handleClickOpen} fullWidth
                            variant='contained' type="submit" size="small">Go</Button>
                </CardActions>
            </span></>);
        }
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
                                        name='secret-code'
                                        autoCorrect='off'
                                        autoCapitalize='off'
                                        type="text"
                                        color='success'
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
                            {renderCard()}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            {signupDialog()}
        </div>
    );
}

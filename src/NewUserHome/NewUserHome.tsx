import React, {Component, ReactNode} from "react";
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
import {TransitionProps} from "@mui/material/transitions";
import {WEBSITE_NAME} from "../other/variables";
import restCalls from "../other/restCalls";

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
}

export default class NewUserHome extends Component<{}, NewUserHomeState> {
    public constructor(props: {}) {
        super(props);
        this.state = {
            userEnteredSecretCode: "",
            dialogOpen: false
        };
        removeSecretCodeCookie();
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    public render(): ReactNode {
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
                                    <form action={`/${this.state.userEnteredSecretCode}`}>
                                        <TextField
                                            color='success'
                                            id="outlined-name"
                                            label="Secret Code"
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                                                this.setState({userEnteredSecretCode: e.target.value})}
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
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    Get a secret code
                                </Typography>
                                <span>
                                    <CardActions disableSpacing>
                                        <Button color='success' onClick={this.handleClickOpen} fullWidth
                                                variant='contained' type="submit" size="small">Go</Button>
                                    </CardActions>
                                </span>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                {this.signupDialog()}
            </div>
        )
    }

    private signupDialog(): ReactNode {
        return (
            <div>
                <Dialog
                    open={this.state.dialogOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => this.handleClose(false)}
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
                        <Button onClick={() => this.handleClose(false)}>Disagree</Button>
                        <Button onClick={() => this.handleClose(true)}>Agree</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    private handleClickOpen() {
        this.setState({dialogOpen: true});
    };

    private async handleClose(termsAgreed: boolean) {
        this.setState({dialogOpen: false});
        if (termsAgreed) {
            const apiRes = await restCalls.createNewSecretCode();
            if (apiRes.inserted) {
                redirect(`/${apiRes.secretCode}`);
            }
        }
    };
}

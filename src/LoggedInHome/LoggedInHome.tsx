import React, {ReactElement, useEffect, useState} from "react";
import './LoggedInHome.css';
import {Button, Chip, Skeleton, TextField, Tooltip, Zoom} from "@mui/material";
import {ArrowForwardIos, Logout, OpenInFull} from "@mui/icons-material";
import {redirect, removeSecretCodeCookie, setSecretCodeCookie} from "../other/cookies";
import {WEBSITE_NAME} from "../other/variables";
import {Link} from "react-router-dom";
import restCalls, {getLinkResponse} from "../other/restCalls";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TagManager from 'react-gtm-module';
import {useSnackbar} from "notistack";

interface LoggedInHomeProps {
    id: string
}

interface LoggedInHomeState {
    link: string
}

export default function LoggedInHome(props: LoggedInHomeProps): ReactElement {
    const { enqueueSnackbar } = useSnackbar();
    const missingSecretCodeRedirectTime = 5000;
    const [state, setState] = useState<LoggedInHomeState>({link: "Loading..."});
    setSecretCodeCookie(props.id);

    useEffect(() => {
        // component Did Mount
        if (!window.location.href.includes(props.id)) {
            if (redirect(`/${props.id}`)) {
                return;
            }
        }

        const gtm_tag_manager_data_layer = {
            dataLayer: {
                event: "getting_link",
                frontend: true,
                failed: false,
                link: ""
            },
            dataLayerName: "PageDataLayer"
        };

        restCalls.getLink(props.id, (message: string) => {
            enqueueSnackbar(message);
        }).then((response: getLinkResponse) => {
            if (response.error) {

                gtm_tag_manager_data_layer.dataLayer.failed = true;
                gtm_tag_manager_data_layer.dataLayer.link = "";
                TagManager.dataLayer(gtm_tag_manager_data_layer);


                toast.error(response.error, {
                    position: "bottom-left",
                    autoClose: missingSecretCodeRedirectTime,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
                setTimeout(() => {
                    if (window.location.href.includes(props.id)) {
                        logout();
                    }
                }, missingSecretCodeRedirectTime + 1500)
                return;
            }

            gtm_tag_manager_data_layer.dataLayer.failed = false;
            gtm_tag_manager_data_layer.dataLayer.link = response.link;
            TagManager.dataLayer(gtm_tag_manager_data_layer);

            setState({link: response.link});
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.id]);

    function isLoading(): boolean {
        return state.link === 'Loading...';
    }

    function handleLinkClick() {
        if (!isLoading()) {
            navigator.clipboard.writeText(state.link).then();
        }
    }

    function logout() {
        removeSecretCodeCookie();
        redirect('/');
    }

    const loadingElement: ReactElement = (
        <>
            <Skeleton
                variant="rectangular"
                width='50vw'
                height={60}
            />
            <div className="loading-redirect-buttons-container">
                <Skeleton
                    className="loading-redirect-buttons"
                    variant="rectangular"
                    style={{left: 0}}
                />
                <Skeleton
                    variant="rectangular"
                    className="loading-redirect-buttons"
                    style={{right: 0}}
                />
            </div>
        </>
    )


    // @ts-ignore
    return (
        <div className="App-header App">
            <h1>{WEBSITE_NAME}</h1>
            <p style={{fontSize: '0.4em'}}>By using this service you agree to the Terms and Conditions, and Privacy
                Policy at <Link className="link-changed" to="/legal">/legal</Link>.</p>


            {isLoading() ? loadingElement :

                <>
                    <div>
                        <Tooltip disableHoverListener={isLoading()} arrow TransitionComponent={Zoom}
                                 title="Copy link to clipboard">
                            <Button onClick={handleLinkClick}>
                                <TextField id="redirect-link" onFocus={handleLinkClick} disabled
                                           value={state.link}/>
                            </Button>
                        </Tooltip>
                    </div>


                    <div className="redirect-buttons">
                        <Button disabled={isLoading()}
                                onClick={() => redirect(`https://www.youtube.com/redirect?q=${state.link}`)}
                                size="large" variant="outlined">
                            Full screen
                            <OpenInFull className="redirect-button-icon"/>
                            <Chip className="redirect-button-icon" disabled label="Tesla Only"/>
                        </Button>

                        <Button disabled={isLoading()} onClick={() => redirect(state.link)} size="large"
                                variant="contained">
                            Current window
                            <ArrowForwardIos className="redirect-button-icon"/>
                        </Button>
                    </div>
                </>}

            <div className='top-buttons'>
                <Chip className='bookmark-button-chip' color="warning" label={
                    <span className='bookmark-button'>
                        <BookmarkIcon fontSize='small'/> Bookmark this page for easy access
                    </span>
                }/>

                <Tooltip arrow TransitionComponent={Zoom} title="Logout">
                    <Chip className='logout-button' label={<Logout fontSize='small'/>} onClick={() => logout()}
                          color="error"/>
                </Tooltip>
            </div>
            <ToastContainer/>
        </div>
    );
}

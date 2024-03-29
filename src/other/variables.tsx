import Instructions from "../Instructions/Instructions";
import React from "react";
import Legal from "../Legal/Legal";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PolicyIcon from '@mui/icons-material/Policy';

export const WEBSITE_NAME: string = "SpreadYourLinks";
export const CONTACT_EMAIL: string = "spreadyourlinks@iamdhrumilshah.com";
export const ADDITIONAL_SERVICES: string = "Google Analytics, Google Cloud Platform, Heroku, Google Safe Browsing API, MongoDB Cloud, and Github";
export const BACKEND_API: string = process.env.REACT_APP_BACKEND_API || "http://localhost:8080";

export const GA_ID: string = process.env.REACT_APP_GA_ID || "";
export const GTM_ID: string = process.env.REACT_APP_GTM_ID || "";

export function WEBSITE_URL(): string {
    return window.location.hostname;
}

export const NON_HOME_ROUTES = [
    {
        name: "Instructions",
        location: "/instructions",
        component: <Instructions/>,
        icon: <FavoriteIcon/>
    },
    {
        name: "Legal",
        location: "/legal",
        component: <Legal/>,
        icon: <PolicyIcon/>
    }
]

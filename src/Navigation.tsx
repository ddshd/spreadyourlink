import * as React from 'react';
import {ReactElement, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Link, useLocation} from "react-router-dom";
import {getSecretCodeCookie} from "./other/cookies";
import {NON_HOME_ROUTES} from "./other/variables";

interface NavigationState {
    value: number
}

export default function Navigation(): ReactElement {
    const [state, setState] = useState<NavigationState>({value: 0});
    const location = useLocation();

    useEffect(() => {
        setState({value: checkCurrentLocation()});
    }, [location]);

    function handleChange(_: any, value: any) {
        setState({value});
    }

    return (
        <Box style={{position: "fixed", bottom: 0, width: "100vw"}}>
            <BottomNavigation
                showLabels
                value={state.value}
                onChange={handleChange}
            >
                <BottomNavigationAction component={Link} to={`/${getSecretCodeCookie() || ''}`} label="Home"
                                        icon={<LocationOnIcon/>}/>
                {/*<BottomNavigationAction component={Link}  to="/history" label="History" icon={<RestoreIcon/>}/>*/}
                {/*<BottomNavigationAction component={Link} to="/instructions" label="Instructions" icon={<FavoriteIcon/>}/>*/}
                {/*<BottomNavigationAction component={Link} to="/legal" label="Legal" icon={<PolicyIcon/>}/>*/}

                {
                    NON_HOME_ROUTES.map(route => <BottomNavigationAction key={route.location} component={Link}
                                                                         to={route.location}
                                                                         label={route.name} icon={route.icon}/>)
                }

            </BottomNavigation>
        </Box>
    );
}

export function checkCurrentLocation() {
    for (let i = 0; i < NON_HOME_ROUTES.length; i++) {
        const route = NON_HOME_ROUTES[i];
        if (window.location.href.includes(route.location)) {
            return i + 1;
        }
    }
    return 0;
}

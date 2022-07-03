import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PolicyIcon from '@mui/icons-material/Policy';
import {Link} from "react-router-dom";
import {getSecretCodeCookie} from "./other/cookies";

interface NavigationState {
    value: number
}

export default class Navigation extends React.Component<{}, NavigationState> {

    public constructor(props: {}) {
        super(props);
        this.state = {value: 0};
    }

    handleChange = (event: any, value: any) => {
        this.setState({ value });
    };
    public render() {
        const {value} = this.state;

        return (
            <Box style={{position: "fixed", bottom: 0, width: "100vw"}}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={this.handleChange}
                >
                    <BottomNavigationAction component={Link} to={`/${getSecretCodeCookie() || ''}`} label="Home" icon={<LocationOnIcon/>}/>
                    {/*<BottomNavigationAction component={Link}  to="/history" label="History" icon={<RestoreIcon/>}/>*/}
                    <BottomNavigationAction component={Link} to="/instructions" label="Instructions" icon={<FavoriteIcon/>}/>
                    <BottomNavigationAction component={Link} to="/legal" label="Legal" icon={<PolicyIcon/>}/>
                </BottomNavigation>
            </Box>
        );
    }
}

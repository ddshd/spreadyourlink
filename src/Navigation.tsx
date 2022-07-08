import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Link} from "react-router-dom";
import {getSecretCodeCookie} from "./other/cookies";
import {NON_HOME_ROUTES} from "./other/variables";

interface NavigationState {
    value: number
}

export default class Navigation extends React.Component<{}, NavigationState> {

    public constructor(props: {}) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {value: 0};
    }

    componentDidMount() {
        NON_HOME_ROUTES.forEach((route, i) => {
            if (window.location.href.includes(route.location)) {
                this.setState({value: i + 1});
                return;
            }
        });
    }

    public render() {
        const {value} = this.state;

        return (
            <Box style={{position: "fixed", bottom: 0, width: "100vw"}}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={this.handleChange}
                >
                    <BottomNavigationAction component={Link} to={`/${getSecretCodeCookie() || ''}`} label="Home"
                                            icon={<LocationOnIcon/>}/>
                    {/*<BottomNavigationAction component={Link}  to="/history" label="History" icon={<RestoreIcon/>}/>*/}
                    {/*<BottomNavigationAction component={Link} to="/instructions" label="Instructions" icon={<FavoriteIcon/>}/>*/}
                    {/*<BottomNavigationAction component={Link} to="/legal" label="Legal" icon={<PolicyIcon/>}/>*/}

                    {
                        NON_HOME_ROUTES.map(route => <BottomNavigationAction key={route.location} component={Link} to={route.location}
                                                                             label={route.name} icon={route.icon}/>)
                    }

                </BottomNavigation>
            </Box>
        );
    }

    private handleChange(_: any, value: any) {
        this.setState({value});
    };
}

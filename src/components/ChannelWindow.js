import React, { PureComponent } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import { styled } from "styletron-react";

class ChannelWindow extends PureComponent {     
    render() {

        const channelsNames = Object.keys(this.props.channels);

        return (
            <Root>
                <List>
                    {
                        channelsNames.map(channel => (
                            <>
                            <ListItem onClick={this.props.onChangeRoom} key={channel} button>
                                <ListItemText primary={this.props.capitaliseFirstLetter(channel)} />
                            </ListItem>
                            <Divider />
                            </>))
                    }
                </List>
            </Root>
        );
    }   
}

const Root = styled('div', {
    width: '20%',
    height: '250px',
});

export default ChannelWindow;
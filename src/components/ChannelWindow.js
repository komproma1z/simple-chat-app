import React, { PureComponent } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

import { styled } from "styletron-react";

class ChannelWindow extends PureComponent {     
    render() {

        const channelsNames = Object.keys(this.props.channels);

        return (
            <Root>
                <List>
                    {
                        channelsNames.map(channel => (
                            <ListItem onClick={this.props.onChangeRoom} key={channel} button>
                                <ListItemText primary={this.props.capitaliseFirstLetter(channel)} />
                            </ListItem>))
                    }
                </List>
            </Root>
        );
    }   
}

const Root = styled('div', {
    width: '15%',
    height: '250px',
    borderRight: '1px solid grey',
});

export default ChannelWindow;
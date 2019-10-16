import React, { PureComponent } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { styled } from "styletron-react";

class RoomStateWindow extends PureComponent {     
    render() {
        return (
            <Root>
                <Typography><strong>Here are: </strong></Typography>
                <ul>
                    {this.props.users.filter(user => user.room === this.props.currentRoom).map(user => (<LItem key={user.name}>{user.name}</LItem>))}
                </ul>
            </Root>
        );
    }   
}

const Root = styled(Paper, {
    margin: '15px 50px',
    padding: '15px',
});

const LItem = styled('li', {
    display: 'inline-block', 
    textDecoration: 'none',
    marginRight: '10px'
});

export default RoomStateWindow;
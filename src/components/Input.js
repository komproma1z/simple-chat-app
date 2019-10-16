import React, { PureComponent } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { styled } from "styletron-react";

class Input extends PureComponent {

    // Returns current hh:mm:ss

    getTime = () => {
        const date = new Date();
        return date.getHours().toString() + ':' + date.getMinutes().toString() + ':' + date.getSeconds().toString();
    };

    //Sends message when Enter pressed

    enterPressed = e => {
        const code = e.keyCode || e.which;
        if (code === 13) {
            this.props.onSendButtonClick(this.getTime());
        } 
    }

    render() {
        return (
            <Flex>
                <ChatBox
                    label="Type in your message"
                    value={this.props.textValue}
                    onChange={e => this.props.onInputChange(e.target.value)}
                    onKeyPress={this.enterPressed}
                />
                <ChatButton 
                    variant="contained" 
                    color="primary"
                    onClick={() => {
                        this.props.onSendButtonClick(this.getTime());
                    }}
                >
                    Send
                </ChatButton>
            </Flex>
        );
    }   
}

const ChatBox = styled(TextField, {
    width: '85%',
});

const ChatButton = styled(Button, {
    width: '15%',
});

const Flex = styled('div', {
    display: 'flex',
    alignItems: 'center',
});

export default Input;
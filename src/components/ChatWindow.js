import React, { PureComponent } from 'react';

import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import { styled } from "styletron-react";


// To keep scroll at the bottom when overflow is activated
const pinScrollToBottom = node => {
    node.scrollTop = node.scrollHeight;
}

class ChatWindow extends PureComponent {     
    constructor(props) {
        super(props);
        this.chatWindow = React.createRef();
    }

    componentDidUpdate() {
        pinScrollToBottom(this.chatWindow.current);
    }

    render() {
        return (
            <Root ref={this.chatWindow}>
                {
                    this.props.channels[this.props.currentRoom].map((chat, i) => (
                        <Flex key={i}>
                            <SmallChip label={`${chat.time}, ${chat.from}:` } size="small"/>
                            <Typography variant="body1" gutterBottom>{chat.msg}</Typography>
                        </Flex>
                    ))
                }
            </Root>
        );
    }   
}

const Root = styled('div', {
    width: '80%',
    height: '250px',
    padding: '20px',
    overflow: 'overlay',
});

const Flex = styled('div', {
    display: 'flex',
    alignItems: 'center',
});

const SmallChip = styled(Chip, {
    margin: '0 5px 5px 0',
});

export default ChatWindow;
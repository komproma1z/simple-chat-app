// React related imports
import React, { PureComponent } from 'react';

// Redux related imports
import { connect } from 'react-redux';
import { sendMessage, changeChannel, updateMembers } from '../store/actions';
import { selectUsers, selectChats } from '../store/selectors';

// Socket.io related imports
import io from 'socket.io-client';

// Components
import RoomStateWindow from './RoomStateWindow';
import ChannelWindow from './ChannelWindow';
import ChatWindow from './ChatWindow';
import Input from './Input';
import Titles from './Titles';

// Material.ui related imports
import Paper from '@material-ui/core/Paper';

// Styletron related imports
import { styled } from "styletron-react";

// Custom FIRSTLETTERCAPITALSATION function for technical purposes
const capitaliseFirstLetter = word => word[0].toUpperCase()+word.slice(1, word.length);

let socket = io(':3001');

class Chat extends PureComponent {

    state = {
        currentRoom: Object.keys(this.props.channels)[0],
        textValue: '',
        currentUser: localStorage.getItem('name'),
    }

    // Functions for URL management. 
    // onChangeRoom make URL change depending on current channel
    onChangeRoom = e => {
        this.setState({currentRoom: e.target.innerText.toLowerCase()});
        this.sendChangeRoomSignal({name: this.state.currentUser, room: e.target.innerText.toLowerCase()});
        window.history.replaceState({}, '', `/?channel=${e.target.innerText.toLowerCase()}`);
    }

    // onChangeRoomCopy make URL correspond to current room when root ('/') is accessed
    onChangeRoomCopy = arg => {
        this.setState({currentRoom: arg});
        this.sendChangeRoomSignal({name: this.state.currentUser, room: arg});
        window.history.replaceState({}, '', `/?channel=${arg}`);
    }

    // In componentDidMount URL actually changes
    componentDidMount() {
        socket.on('message', msg => this.props.sendMessage(msg));
        socket.on('roomChange', user => {
            this.props.updateMembers(user);
        });
        const url = new URL(window.location);
        const room = url.searchParams.get('room');
        if (Object.keys(this.props.channels).indexOf(room) > -1) {
            this.onChangeRoomCopy(room);
        } else {
            this.onChangeRoomCopy(Object.keys(this.props.channels)[0]);
        }
    }

    // Triggers Redux action to display sent messages in the chat
    sendChatAction = value => {
        socket.emit('message', value);
    }

    // Trigger Redux action to notify that a user's changed channel hence update is required
    sendChangeRoomSignal = value => {
        socket.emit('roomChange', value);
    }

    // Function to be passed as props to the Input component to handle onChange event and update current state
    onInputChange = value => {
        this.setState({textValue: value})
    }

    // Function to be passed as props to the Input component to handle the 'Send' button onClick event and send data to the server
    onSendButtonClick = time => {
        this.sendChatAction({time, from: this.state.currentUser, msg: this.state.textValue, channel: this.state.currentRoom});
        this.setState({textValue: ''});
    }
     
    render() {

        const { currentRoom, textValue } = this.state;

        return (
            <>
            <Root>
                <Titles capitaliseFirstLetter={capitaliseFirstLetter} currentRoom={currentRoom}/>
                <Flex>
                    <ChannelWindow 
                        channels={this.props.channels} 
                        onChangeRoom={this.onChangeRoom}
                        capitaliseFirstLetter={capitaliseFirstLetter}
                    />
                    <ChatWindow channels={this.props.channels} currentRoom={currentRoom} />
                </Flex>
                <Input 
                    textValue={textValue} 
                    onInputChange={this.onInputChange} 
                    onSendButtonClick={this.onSendButtonClick}
                />
            </Root>
            <RoomStateWindow users={this.props.users} currentRoom={this.state.currentRoom}/>
            </>
        );
    }  
}

//Styletron variable name === corresponding HTML tag in JSX

const Root = styled(Paper, {
    margin: '15px 50px',
    padding: '15px',
    textAlign: 'center',
});

const Flex = styled('div', {
    display: 'flex',
    alignItems: 'center',
});

const mapStateToProps = state => {
    return {
        users: selectUsers(state),
        channels: selectChats(state),
    }
}
  
const mapDispatchToProps = {
    sendMessage,
    changeChannel,
    updateMembers,
};

export default connect(
mapStateToProps,
mapDispatchToProps
)(Chat)
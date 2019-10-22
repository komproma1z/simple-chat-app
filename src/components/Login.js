import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { updateUsers } from '../store/actions';
import { selectAllUsers } from '../store/selectors';

import io from 'socket.io-client';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { styled } from "styletron-react";

let socket = io(':3001');

class Login extends PureComponent {

    state = {
        userName: '',
        users: [],
    }

    componentDidMount() {
        socket.emit('requestUsers', '')
        socket.on('receiveUsers', users => {
            console.log(users, typeof this.state);
            this.setState({users});
        })
    }

    render() {
        
        const { userName, users } = this.state;

        return (
            <Wrapper>
                <Root>
                    <TypographyElem variant="h5" component="h5">
                        Enter your name to join the chat
                    </TypographyElem>    
                    <TextField
                        id="standard-dense"
                        label="Name"
                        margin="dense"
                        inputProps={{ maxLength: 24 }}
                        onChange={e => this.setState({userName: e.target.value})}
                    />
                    <ButtonElem 
                        variant="contained" 
                        color="primary" 
                        onClick={() => {
                            if (users.includes(userName)) {
                                alert("This name is in use, please choose another one");
                            } else {
                                localStorage.setItem('name', userName);
                                socket.emit('newLogin', userName);
                                this.props.forceUpdate();
                            }
                        }}
                    >
                        Login
                    </ButtonElem>
                </Root>
            </Wrapper>
        );
    } 
}

const Wrapper = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
});

const Root = styled(Paper, {
    display: 'flex',
    flexDirection: 'column',
    width: '25%',
    margin: '150px 50px',
    padding: '15px',
});

const TypographyElem = styled(Typography, {
    alignSelf: 'center',
});

const ButtonElem = styled(Button, {
    alignSelf: 'center',
});

const mapStateToProps = state => {
    return {
        allUsers: selectAllUsers(state),
    }
}
    
const mapDispatchToProps = {
    updateUsers,
};

export default connect(
mapStateToProps,
mapDispatchToProps
)(Login)

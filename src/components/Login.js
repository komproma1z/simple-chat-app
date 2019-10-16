import React, { PureComponent } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { styled } from "styletron-react";


class Login extends PureComponent {

    state = {
        userName: '',
    }

    render() {
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
                        onChange={e => this.setState({userName: e.target.value})}
                    />
                    <ButtonElem 
                        variant="contained" 
                        color="primary" 
                        onClick={() => {
                            localStorage.setItem('name', this.state.userName);
                            this.props.forceUpdate();
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
  
export default Login;

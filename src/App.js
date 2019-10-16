import React, { Component } from 'react';

import Chat from './components/Chat';
import Login from './components/Login';

import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';

// Styletron is used for convinient styling. 
// Requires main component to be wrapped in itself.
// and engine declaration which has to be passed as props to the StyletronProvider component (wrapper).

import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";


const engine = new Styletron();

class ChatApp extends Component {

    store = configureStore();

    render() { 
        return (
            <Provider store={this.store}>
                <StyletronProvider value={engine} debugAfterHydration>
                    <div>
                        {/* USER MANAGEMENT IS DONE VIA LOCALSTORAGE. LOGIN PAGE IS RENDERED IN CASE THERE'S NOTHING IN THE LOCALSTORAGE AND THE ACTUAL CHAT COMPONENT IS RENDERED ONCE THERE'S A NAME TO GET FROM LOCALSTORAGE. setItem is handled in the Login component */}
                        {!localStorage.getItem('name') 
                        ? <Login forceUpdate={this.forceUpdate.bind(this)}/>
                        : <Chat /> }
                    </div>
                </StyletronProvider>
            </Provider>
        );
    }   
}

export default ChatApp;

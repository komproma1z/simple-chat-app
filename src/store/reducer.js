import { SEND_MESSAGE } from './actions';
import { CHANGE_CHANNEL } from './actions';
import { UPDATE_MEMBERS } from './actions';
import { UPDATE_USERS } from './actions';


const initialState = {
    channels: {general: [], languages: [], frameworks: [], databases: []},
    users: [],
    allUsers: [],
};

export const chatReducer = (state=initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            const { time, from, msg, channel } = action.payload;
            return { ...state, channels: {...state.channels, [channel]: [...state.channels[channel], { time, from, msg }]}};
        case CHANGE_CHANNEL:
            return {...state, currentRoom: action.payload.room};
        case UPDATE_MEMBERS:
            return {...state, users: action.payload.members};
        case UPDATE_USERS:
            return {...state, allUsers: action.payload.users};
        default:
            return state;
    }
}
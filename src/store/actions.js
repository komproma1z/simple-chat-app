export const SEND_MESSAGE = 'SEND_MESSAGE';
export const CHANGE_CHANNEL = 'CHANGE_CHANNEL';
export const UPDATE_MEMBERS = 'UPDATE_MEMBERS';

export const sendMessage = msg => ({
    type: SEND_MESSAGE,
    payload: {
        ...msg,
    }
});

export const changeChannel = room => ({
    type: CHANGE_CHANNEL,
    payload: {
        room,
    }
});

export const updateMembers = members => ({
    type: UPDATE_MEMBERS,
    payload: {
        members,
    }
});
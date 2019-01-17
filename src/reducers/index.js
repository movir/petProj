import {
    INITIALIZED, SIGN_IN,
    USERS_UPDATE,
} from '../actions/action_types';

const defaultState = {
    currentUser: {
        name: '',
        email: '',
        balance: 0,
        isRegistered: false
    },
    users: {},
    usersIds: [],
    coffees: {},
    coffeeIds: [],
    initialized: false
};
export default function reducer(state = defaultState, action = {}) {
    switch (action.type) {
        case INITIALIZED: return {
            ...state,
            ...action.payload,
            initialized: true
        };
        case SIGN_IN: return {
          ...state,
          currentUser: action.payload
        };
        case USERS_UPDATE: return {
            ...state,
            ...action.payload
        };
        default: return state;
    }
}
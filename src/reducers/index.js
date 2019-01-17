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
    users: {
        1: {
            id: 1,
            name: 'User1',
            balance: -50,
        },
        2: {
            id: 2,
            name: 'User2',
            balance: 50
        }
    },
    usersIds: [1, 2],
    coffees: {
        1: {
            name: 'qwe',
            amount: 3,
        },
        2: {
            name: 'zxc',
            amount: 5
        }
    },
    coffeeIds: [1, 2],
    initialized: false
};
export default function reducer(state = defaultState, action = {}) {
    console.log(action) // IgrEd

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
const defaultState = {
    currentUser: {
        name: 'Igor',
        email: 'imolyarov@gmail.com',
        balance: 50
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
    userIds: [1, 2],
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
    coffeeIds: [1, 2]

};
export default function reducer(state = defaultState/*, action = {}*/) {
    return state;
}
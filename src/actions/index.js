import { db, auth, provider } from '../firebase';

import { INITIALIZED, SIGN_IN, USERS_UPDATE } from './action_types';

/**/
window.db = db;
window.auth = auth;
window.users = db.collection('users');
/**/

/**/
/* Actions */
/**/
function setInitialized(data) {
  console.log('setInitialized', data); // IgrEd
  return {
    type: INITIALIZED,
    payload: { ...data },
  };
}
function updateUsers(usersData) {
  return {
    type: USERS_UPDATE,
    payload: { ...usersData },
  };
}
function signInUser(userData) {
  return {
    type: SIGN_IN,
    payload: { ...userData },
  };
}

/**/
/* Thunks */
/**/
export const initialize = () => dispatch => {
  setAuthListener(dispatch);
  setUsersListener(dispatch);

  return Promise.all([
    /*getUsers()*/
  ]).then(([usersData = {}]) => {
    dispatch(
      setInitialized({
        ...usersData,
      })
    );
  });
};

/*
function getUsers() {
  return db
    .collection('users')
    .get()
    .then(querySnapshot => normalizeUsersData(querySnapshot));
}
*/

/**/
/* set listeners */
/**/

function setAuthListener(dispatch) {
  auth.onAuthStateChanged(googleUser =>
    new Promise(
      resolve =>
        googleUser ? resolve(googleUser) : auth.signInWithPopup(provider).then(({ user }) => (googleUser = user))
    )
      .then(googleUser => getUser(googleUser.email))
      .then(registeredUser => {
        const user = {
          displayName: googleUser.displayName,
          email: googleUser.email,
        };
        if (registeredUser) {
          Object.assign(user, registeredUser, { isRegistered: true });
        }
        return user;
      })
      .then(user => dispatch(signInUser(user)))
  );
}

function setUsersListener(dispatch) {
  return db.collection('users').onSnapshot(function(querySnapshot) {
    const usersData = normalizeUsersData(querySnapshot);
    dispatch(updateUsers(usersData));
  });
}
//set lister for current user updates

/**/
/* Utils */
/**/
function normalizeUsersData(querySnapshot) {
  return querySnapshot.docs.reduce(
    ({ users, usersIds }, doc) => ({
      users: { ...users, [doc.id]: { ...doc.data(), id: doc.id } },
      usersIds: usersIds.concat(doc.id),
    }),
    { users: {}, usersIds: [] }
  );
}
function getUser(email) {
  return db
    .collection('users')
    .where('email', '==', email)
    .get()
    .then(querySnapshot => {
      const userDoc = querySnapshot.docs[0];
      return userDoc ? { ...userDoc.data(), id: userDoc.id } : null;
    });
}

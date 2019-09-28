import { db, auth, provider } from '../firebase';

import { INITIALIZED, COLLECTION_INITIATION, SIGN_IN, USERS_UPDATE } from './action_types';
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

function collectionInitiation(normalizedData) {
  return {
    type: COLLECTION_INITIATION,
    payload: normalizedData,
  };
}

/**/
/* Thunks */
/**/
export const initialize = () => dispatch => {
  setAuthListener(dispatch);
  setUsersListener(initializingDispatcher);
  setCoffeeStorageListener(initializingDispatcher);
  setCoffeesListener(initializingDispatcher);

  return Promise.all([
    /*getUsers()*/
  ]).then(([usersData = {}]) => {
    dispatch(
      setInitialized(usersData)
    );
  });

  function initializingDispatcher (data) {
    dispatch(collectionInitiation(data))
  }
};


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

function setUsersListener(initializeDispatcher) {
  setCollectionListener('users').onInit(initializeDispatcher);
}
function setCoffeeStorageListener(initializeDispatcher) {
  setCollectionListener('coffee-storage').onInit(initializeDispatcher);
}

function setCoffeesListener(initializeDispatcher) {
  setCollectionListener('coffees').onInit(initializeDispatcher);
}
//set lister for current user updates

/**/
/* Utils */
/**/
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

//setUp setCollectionListener
const dataNormalizer = (collection, collectionName) => {
  collectionName = collectionName.replace(/-(\w)/g, function(substr, letter){return letter ? letter.toUpperCase() : ''});
  const nameById = `${collectionName}ByIds`;
  const nameIds = `${collectionName}Ids`;

  return collection.reduce(
    (normalizedData, item) => ({
      [nameById]: { ...normalizedData[nameById], [item.id]: { ...item.data(), id: item.id } },
      [nameIds]: [...normalizedData[nameIds], item.id],
    }),
    { [nameById]: {}, [nameIds]: [] }
  );
};

function setCollectionListener(collectionName) {
  console.log(`initialize ${collectionName} collection listener`); //IgrEd
  const setOnInit = cb => data => cb && cb(data);
  let onInit;

  const listener = db.collection(collectionName).onSnapshot(snapshot => {
    const collectionNormalizedData = dataNormalizer(snapshot.docs, collectionName);
console.log(collectionName, snapshot); //IgrEd

    //  if snapshot._snapshot.syncStateChanged === true means that it is initial addition of items
    if (snapshot._snapshot.syncStateChanged === true) {
      onInit(collectionNormalizedData);

    } else {
      onInit(collectionNormalizedData);
      const added = {};
      const modified = {};
      const removed = [];

      /*
            snapshot.docChanges().forEach(function(change) {
              if (change.type === "added") {
                console.log("Added Item: ", change.doc.data());
              }
              if (change.type === "modified") {
                console.log("Modified Item: ", change.doc.data());
              }
              if (change.type === "removed") {
                console.log("Removed Item: ", change.doc.data());
              }
            });
            */
    }
  }, console.log.bind(console, `${collectionName} collection onSnapshot error:`));

  const actions = {
    onInit: function(cb) {
      onInit = setOnInit(cb);
      return this;
    },
    onChange: function() {

    },
    onAdd: function(){

    },
    onModify: function(){},
    onRemove: function(){},
    unBind: function unbindCollectionListener() {
      return listener();
    },
  };
  return actions;
}

/*
add coffee to storage
waste coffee from storage
add to user balance
create table for action log
 */
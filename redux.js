console.clear();

//people dropping off a form(Action creator)//

const createPolicy = (name, amount) => {
  return {
    type: 'CREATE_POLICY',
    payload: {
      name,
      amount
    }
  };
};

const deletePolicy = (name) => {
  return {
    type: 'DELETE_POLICY',
    payload: {
      name
    }
  };
};

const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    type: 'CREATE_CLAIM',
    payload: {
      name: name,
      amountOfMoneyToCollect
    }
  };
};

//Reducer (Department!)//

const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === 'CREATE_CLAIM') {
    return [...oldListOfClaims, action.payload];
  } 
  return oldListOfClaims;
};

const accounting = (bagOfMoney = 100, action) => {
  if (action.type === 'CREATE_CLAIM') {
    return bagOfMoney - action.payload.amountOfMoneyToCollect
  } else if (action.type === 'CREATE_POLICY') {
    return bagOfMoney + action.payload.amount;
  }
  return bagOfMoney;
};

const policies = (oldListOfPolicies = [], action) => {
  if (action.type === 'CREATE_POLICY') {
    return [...oldListOfPolicies, action.payload.name]
  } else if (action.type === 'DELETE_POLICY') {
    return oldListOfPolicies.filter(name => name !== action.payload.name);
  }
  return oldListOfPolicies;
};

const { createStore, combineReducers } = Redux;

const ourDepartments = combineReducers({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies: policies
});

const store = createStore(ourDepartments);

store.dispatch(createPolicy('Alex', 20));
store.dispatch(createPolicy('Jim', 23));
store.dispatch(createPolicy('Bob', 30));

store.dispatch(createClaim('Alex', 120));
store.dispatch(createClaim('Jim', 10));

store.dispatch(deletePolicy('Bob'))

console.log(store.getState());
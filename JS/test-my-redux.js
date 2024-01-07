$redux;
// console.log($redux);

const Withdraw_Money = "Withdraw_Money";
const Deposit_Money = "Deposit_Money";
const Withdraw = (amount) => {
    return {
      type: Withdraw_Money,
      payload: amount,
    };
  };
  const Deposit = (amount) => {
    return {
      type: Deposit_Money,
      payload: amount,
    };
  };
const bank_reducer = (state = 1000, action) => {
    switch (action.type) {
      case Withdraw_Money:
        return state - action.payload;
      case Deposit_Money:
        return state + action.payload;
      default:
        return state;
    }
  };

  const store = $redux.createStore(bank_reducer);
  console.log(store);
  // store.dispatch({type:Withdraw_Money,payload:100});
  // store.dispatch({type:Deposit_Money,payload:600});
  // store.dispatch(Withdraw(200));
  // store.dispatch(Deposit(300));
//   console.log(store.getState());
// store.subscribe(() => {
//     console.log("current state", store.getState());
// });

/********************dynamic and UI ******/
const amountInput = document.querySelector("#amount");//input
const amountValue = document.querySelector("#value");//p value
amountValue.innerHTML = store.getState();//initial value
const withdrawBtn = document.querySelector("#withdraw");
const depositBtn = document.querySelector("#deposit");
withdrawBtn.addEventListener("click", () => {
  store.dispatch(Withdraw(amountInput.value));
});
depositBtn .addEventListener("click", () => {
    store.dispatch(Deposit(+amountInput.value));
  });
  store.subscribe(() => {
    console.log("current state", store.getState());
    amountValue.innerHTML =store.getState();
  });
// console.log(store.getState());
store.subscribe(() => {
    console.log("current state", store.getState());
});
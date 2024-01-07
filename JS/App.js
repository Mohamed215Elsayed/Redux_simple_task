// console.log(Redux);

// // action creator----1
// const action = {   
//     type: "Withdraw_Money",
// };
// const action2 = {// action creator
//     type: "Deposit_Money"
// };

// //reducer----2
// const reducer =(state=1000,action)=>{  
//     switch(action.type){
//         case "Withdraw_Money":
//             return state-100;
//         case "Deposit_Money":
//             return state+100;
//         default:
//             return state;
//     }
// }

// // store----3
// const store = Redux.createStore(reducer);
// store.dispatch(action);//-100
// store.dispatch(action);//-100
// store.dispatch(action2);//+100
// console.log(store.getState());//900
/**********************************************/
// console.log(Redux);
// console.log(ReduxThunk);
/******************constants****************/
const Withdraw_Money = "Withdraw_Money";
const Deposit_Money = "Deposit_Money";
const Add_Product = "Add_Product";
const Get_Products = "Get_Products";
/**********actions*************/
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
const Append_Product = (product) => {
  return {
    type: Add_Product,
    payload: product,
  };
};
const getAllProducts = (products) => {
  return {
    type: Get_Products,
    payload: products,
  };
};
/***************************** */
const FetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      console.log(data);
      // dispatch({type:Get_Products,payload:data});//=
      dispatch(getAllProducts(data));//important
    }
    catch (error) {
      // Handle error

    }
  };
};
/************reducer***********/
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
const products_reducer = (state = [], action) => {
  switch (action.type) {
    case Get_Products:
      return [...action.payload];//making a shallow copy of the array.
    case Add_Product:
      return [...state, action.payload];
    default:
      return state;
  }
};
// it is important to use the spread operator to create a new array instead of modifying the existing state array directly.
// This ensures that the Redux store maintains immutability, which is a fundamental principle in Redux.
/***********************/
const App_reducer = Redux.combineReducers({
  products: products_reducer,
  bank: bank_reducer,
});
/************store***********/
const store = Redux.createStore(
  App_reducer,
  Redux.applyMiddleware(ReduxThunk.default)
); 
/***************static ****************/
// store.dispatch(Withdraw(100));
// store.dispatch(Withdraw(200));
// store.dispatch(Deposit(1000));
// store.dispatch(Append_Product({id:1,name:"Laptop",price:1000}));
// store.dispatch(Append_Product({id:2,name:"Mobile",price:2000}));
// console.log(store.getState());
// console.log(store.dispatch(FetchProducts()));
/********************dynamic and UI ******/
const amountInput = document.querySelector("#amount");//input
const amountValue = document.querySelector("#value");//p value
amountValue.innerHTML = store.getState().bank;//initial value
const withdrawBtn = document.querySelector("#withdraw");
const depositBtn = document.querySelector("#deposit");
withdrawBtn.addEventListener("click", () => {
  store.dispatch(Withdraw(amountInput.value));
});
depositBtn .addEventListener("click", () => {
    store.dispatch(Deposit(+amountInput.value));
  });
  
store.dispatch(FetchProducts());
store.subscribe(() => {
  console.log("current state", store.getState());
  amountValue.innerHTML =store.getState().bank;
});

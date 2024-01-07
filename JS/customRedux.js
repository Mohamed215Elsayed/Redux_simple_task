(function(){
   const customRedux = (function(){
        function createStore(reducer){
            console.log(reducer);
            let state;
            const listeners = [];
            const subscribe = (listener) => listeners.push(listener);//listener is a callback function that will be called whenever the state changes register the listener
            const getState = () => state;
            const dispatch = (action) => {
                state = reducer(state, action);
                listeners.forEach((listener) => listener());//call for each the listener
            }
            dispatch({});
            return {
                subscribe,
                getState,
                dispatch
            }
        }

        return {createStore}
    
    })()
    if(!window.customRedux){
        window.$redux = window.customRedux = customRedux;
    }
})()
import { createStore } from 'redux';
import mainReducer from "./Reducers/Reducer";

const store = createStore(mainReducer);


store.subscribe(() => {
    console.log("store>>", store.getState())
})

export default store;
import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { jobsReducer } from "./reducers/jobReducer";
import { loaderReducer } from "./reducers/loaderReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { usersReducer } from "./reducers/userReducer";


const rootReducer = combineReducers({

    jobsReducer: jobsReducer,
    loaderReducer: loaderReducer,
    usersReducer: usersReducer,

})
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
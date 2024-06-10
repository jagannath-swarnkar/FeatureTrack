import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { reducers } from "./reducer";

const bindMiddlewares = (middleware: any[]) => {
    if (process.env.NODE_ENV !== "production") {
        return composeWithDevTools(applyMiddleware(...middleware));
    } else {
        return compose(applyMiddleware(...middleware));
    }
};

export const store = createStore(reducers(), bindMiddlewares([thunk]));

import {ApolloConnection} from "@appchat/core/apollo";
import { rootReducers } from "@appchat/core/store/reducers";
import { rootSaga } from "@appchat/core/store/sagas";
import { routerMiddleware } from "connected-react-router";
import { applyMiddleware, compose, createStore, Store } from "redux";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";

class CoreStore {

    public static get ReduxSaga() {
        // tslint:disable-next-line:no-unused-expression
        if (!CoreStore.InitStore) { new CoreStore(); }
        return CoreStore.InitStore;
    }

    private static SagaMiddleware: SagaMiddleware;
    private static ComposeEnhancer: any;
    private static InitStore: Store;
    private static sagaIsRunning: boolean = false;

    private constructor() {
        CoreStore.SagaMiddleware = CoreStore.SagaMiddleware || createSagaMiddleware();
        CoreStore.ComposeEnhancer = CoreStore.ComposeEnhancer ||
            // @ts-ignore
            ((process.env.NODE_ENV !== "production" && window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]) ||
            compose);
        CoreStore.InitStore = CoreStore.InitStore || createStore(
            rootReducers(ApolloConnection.history),
            {},
          // tslint:disable-next-line:max-line-length
            CoreStore.ComposeEnhancer(applyMiddleware(routerMiddleware(ApolloConnection.history), CoreStore.SagaMiddleware))
        );
        if (!CoreStore.sagaIsRunning) {
            CoreStore.sagaIsRunning = CoreStore.SagaMiddleware.run(rootSaga).isRunning();
        }
    }
}

export { CoreStore };

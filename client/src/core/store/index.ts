import { rootReducers } from "@appchat/core/store/reducers";
import { rootSaga } from "@appchat/core/store/sagas";
import { applyMiddleware, compose, createStore, Store } from "redux";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";

class CoreStore {

    public static get ReduxSaga() {
        // tslint:disable-next-line:no-unused-expression
        if (!CoreStore.InitStore) { new CoreStore(); }
        return CoreStore.InitStore;
    }

    private static SagaMiddleware: SagaMiddleware;
    private static ComposeEnhancer;
    private static InitStore: Store;
    private static sagaIsRunnning: boolean = false;

    private constructor() {
        CoreStore.SagaMiddleware = CoreStore.SagaMiddleware || createSagaMiddleware();
        CoreStore.ComposeEnhancer = CoreStore.ComposeEnhancer || ((process.env.NODE_ENV !== "production" &&
            window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]) ||
            compose);
        CoreStore.InitStore = CoreStore.InitStore || createStore(
            rootReducers,
            {},
            CoreStore.ComposeEnhancer(applyMiddleware(CoreStore.SagaMiddleware))
        );
        if (!CoreStore.sagaIsRunnning) {
            CoreStore.sagaIsRunnning = CoreStore.SagaMiddleware.run(rootSaga).isRunning();
        }
    }
}

export { CoreStore };

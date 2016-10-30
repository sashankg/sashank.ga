import { 
    createStore, 
    applyMiddleware, 
    combineReducers 
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { syncHistoryWithStore } from 'react-router-redux';

import rootReducer from '../reducers/rootReducer.js';
import rootSaga from '../sagas/rootSaga.js';

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware()
    const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);

    const store = createStoreWithMiddleware(
        rootReducer,
        window.devToolsExtension && window.devToolsExtension()
    );


    return {
        ...store,
        runSaga: () => sagaMiddleware.run(rootSaga),
        syncHistory: (history) => syncHistoryWithStore(history, store),
    }; 
}

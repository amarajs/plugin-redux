// @flow

function getAction(type, payload = {}, meta = {}) {
    return {type, payload, meta};
}

type Store = {
    getState: () => {},
    dispatch: Dispatch,
    subscribe: (cb: () => void) => void
}

type Action = {
    __Amara__?: boolean,
    meta?: {},
    type: string,
    payload: any
}

type Dispatch = (action: Action) => void;

type AmaraRedux = (dispatch: Dispatch) => (action: Action) => void;

export default function AmaraPluginRedux(store: Store): AmaraRedux {

    let currentState = store.getState();

    function provideStateArg() {
        return currentState;
    }

    return function createHandler(dispatch) {

        function onReduxStateChanged() {
            const newState = store.getState();
            if (newState !== currentState) {
                currentState = newState;
                dispatch(getAction('core:change-occurred', 'state'));
            }
        }

        store.subscribe(onReduxStateChanged);

        return function handler(action: Action) {
            if (action.type === 'core:bootstrap') {
                action.payload.register('state', provideStateArg);
            }
            Object.defineProperty(action, '__Amara__', {
                configurable: false,
                enumerable: false,
                writable: false,
                value: true
            });
            store.dispatch(action);
        };

    };

}

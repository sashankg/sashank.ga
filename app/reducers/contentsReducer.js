export default function contentsReducer(state, action) {
    switch(action.type) {
        case 'CONTENTS_REQUESTED': {
            return {
                 ...state,
                 loading: true,
                 error: null,
            }
        }
        case 'CONTENTS_SUCCEEDED': {
            return {
                elements: action.elements,
                loading: false,
                error: null,
            }
        }
        case 'CONTENTS_FAILED': {
            return { 
                ...state,
                loading: false,
                error: action.error,
            }
        }
        default: {
            return state || {
                elements: null,
                loading: true,
                error: null,
            }
        }
    }
}

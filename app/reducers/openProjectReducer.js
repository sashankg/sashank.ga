export default function openProjectReducer(state, action) {
    switch(action.type) {
        case 'OPEN_PROJECT_REQUESTED': {
            return {
                loading: true,
                error: null,
                markdown: null,
            }
        }

        case 'OPEN_PROJECT_SUCCEEDED': {
            return {
                loading: false,
                error: null,
                markdown: action.markdown,
            }
        }
        case 'OPEN_PROJECT_FAILED': {
            return {
                loading: false,
                error: action.error,
                markdown: action.markdown,
            }
        }
        case 'OPEN_PROJECT_CLOSED': {
            return {
                loading: false,
                error: null,
                markdown: null,
            }
        }
        default: {
            return state || {
                loading: true,
                error: null,
                markdown: null, 
            }
        }
    }
} 

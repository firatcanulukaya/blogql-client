import {GET_POSTS} from '../types';

const initial_state = {
    posts: null,
}

const reducer = (state = initial_state, action) => {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
            }
        default:
            return state
    }
}

export default reducer
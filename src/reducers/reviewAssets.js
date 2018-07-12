const GET_REVIEW_ASSETS = 'GET_REVIEW_ASSETS';
const SET_REVIEW_ASSETS = 'SET_REVIEW_ASSETS';
const SET_USER_REVIEW_ASSETS = 'SET_USER_REVIEW_ASSETS';
const initialState = {
    results: {},
    userReviewAssets: []
}

export default function reviewAssets (state = initialState, action = {}) {
    switch (action.type) {
        case GET_REVIEW_ASSETS:
            return {
                ...state
            };
        case SET_REVIEW_ASSETS:
            return {
                ...state,
                results: action.results
            };
        case SET_USER_REVIEW_ASSETS:
            return {
                ...state,
                userReviewAssets: action.userReviewAssets
            };
        default:
            return state;
    }
}

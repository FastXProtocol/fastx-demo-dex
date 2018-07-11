const SET_STEPS = 'SET_STEPS';
const SET_CUR_STEP = 'SET_CUR_STEP';

const initialState = {
  steps: [],
  curStep: 1
};

export default function transaction (state = initialState, action = {}) {
  switch (action.type) {
    case SET_STEPS:
        return {
            ...state,
            steps: action.steps
        };
    case SET_CUR_STEP:
        return {
            ...state,
            curStep: action.curStep
        };
    default:
      return state;
  }
}

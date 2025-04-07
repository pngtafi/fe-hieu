import { SET_CURRENT_SLIDE } from '../action/sliderAction';

const initialState = {
    currentSlide: 0,
};

const sliderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_SLIDE:
            return {
                ...state,
                currentSlide: action.payload,
            };
        default:
            return state;
    }
};

export default sliderReducer;

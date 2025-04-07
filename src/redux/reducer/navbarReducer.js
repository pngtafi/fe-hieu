// redux/reducer/navbarReducer.js

import { TOGGLE_MENU } from '../action/navbarAction';

const INITIAL_STATE = {
    isMenuOpen: false, // Trạng thái của menu
};

const navbarReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_MENU:
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen, // Đảo ngược trạng thái menu
            };
        default:
            return state;
    }
};

export default navbarReducer;

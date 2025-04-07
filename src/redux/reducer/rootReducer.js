import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import navbarReducer from './navbarReducer';
import sliderReducer from './sliderReducer';

const rootReducer = combineReducers({
    counter: counterReducer,
    navbar: navbarReducer,
    slider: sliderReducer,
});

export default rootReducer;
export const SET_CURRENT_SLIDE = 'SET_CURRENT_SLIDE';

export const setCurrentSlide = (index) => ({
    type: SET_CURRENT_SLIDE,
    payload: index,
});

export const ADD_NOTE = "ADD_NOTE";
export const R_NAME = "R_NAME";
export const addNum = (num) => ({
    type: ADD_NOTE,
    num
});
export const setName = (name) => ({
    type: R_NAME,
    name
});
import { combineReducers } from "redux";
import { ADD_NOTE, R_NAME } from "../actions";

//处理笔记初始化、添加及删除请求
// state是固定的形参数
function num(state = 0, action) {
    console.log(state, action);
    //每一次的操作无论是添加、删除还是初始化，全部的笔记内容会被重新更新一次
    switch (action.type) {
        case ADD_NOTE:
            return action.num + state;
        default:
            return state;
    }
}
function name(state = "za", action) {
    //每一次的操作无论是添加、删除还是初始化，全部的笔记内容会被重新更新一次
    switch (action.type) {
        case R_NAME:
            return action.name;
        default:
            return state;
    }
}

const rootReducer = combineReducers({ num, name });
export default rootReducer;

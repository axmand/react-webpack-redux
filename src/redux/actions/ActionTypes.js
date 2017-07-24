/**
 * 定义action type字符串
 */

/**
 * 定义四种基本action方法
 */
const ADD_TODO = 'ADD_TODO',
    REMOVE_TODO = 'REMOVE_TODO',
    QUERY_TODO = 'QUERY_TODO',
    UPDATE_TODO = 'UPDATE_TODO';

/**
 * 其他待定action内容，例如 update_map
 * 此部分type与业务逻辑密切相关，故不直接提供
 * 根据实际开发事件，提供名称，例如：
 */

export {
    ADD_TODO,
    REMOVE_TODO,
    QUERY_TODO,
    UPDATE_TODO
}


const LOGIN_TODO='LOGIN_TODO';

export {
    LOGIN_TODO
}

const LOGINTODO=(text)=>{
    return{
        type:LOGIN_TODO,
        payload:{
            text:text
        }
    }
}

export{
    LOGINTODO
}
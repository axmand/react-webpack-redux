/**
 * 重写根reducer,方便子reducer开发时，合并进入根reducer
 * -在redux模型中，需要将所有的reducer合并后创建单一store
 * -1.降低redux目录下代码改动频率
 * -2.降低component与store之间的耦合
 * 
 * 故创建RootReducer对象，用于自动融合reducer并更新store
 * 
 * @author yellow date 2017/7/24
 */
import { combineReducers } from 'redux'
/**
 * @class
 * @static
 */
class RootReducer {

    static _list= [];

    static merge(reducer){
        this._list.push(reducer);
    } 

    static combine(){
        const list=this._list,
            len=list.length;
        let obj={};
        for(let i=0;i<len;i++){
            const funcName=list[i].name;
            obj[funcName]=list[i];
        }
        const reducers = combineReducers(obj);
        return reducers;
    }

}

export default RootReducer;

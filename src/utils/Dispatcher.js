/**
 * reference:
 * https://github.com/facebook/flux/blob/master/src/Dispatcher.js
 * 
 * 
 * 
 */


let _callbacks=[],
    _promises=[];

class 

{

    constructor(){

    }
    
    register(callback) {
        _callbacks.push(callback);
        return _callbacks.length - 1; // index
    };

    dispatch(payload){

    }


}

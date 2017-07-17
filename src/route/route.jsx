import React, {Component, PropTypes} from 'react';
import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router';

//import 自定义components


//-方式1，预载入component

import HelloLabel from './../components/HelloLabel.js';

//-方式2,按需载入component

const showHelloLabel = (location,cb)=>{
     require.ensure([], require => {
        cb(null, require('./../components/HelloLabel.js').default)
    },'showHelloLabel')
}


const RouteConfig = (
    <Root>
    </Root>
)

return RouteConfig;
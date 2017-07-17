import React from 'react'
import { render } from 'react-dom'
import HelloLabel from './components/HelloLabel'


let main = function () {
    render(<HelloLabel/>, document.body);
}

main();
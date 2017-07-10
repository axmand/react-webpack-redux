import React from 'react'
import { render } from 'react-dom'
import Component from './components/test'


let main = function () {
    render(<Component />, document.body);
}

main();
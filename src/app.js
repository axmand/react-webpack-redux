import React from 'react'
import { render } from 'react-dom'
import HelloLabel from './components/HelloLabel'


let main = function () {

    let sss=document.getElementById('tet');

    render(<HelloLabel/>, sss);
}

main();
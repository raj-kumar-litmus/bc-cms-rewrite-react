import React from 'react';
import {render} from'@testing-library/react';
import useSessionStorage from './useSessionStorage';
import {BrowserRouter} from 'react-router-dom';

describe("<useSessionStorage />", () => {
    it('render useSessionStorage page',()=>{
        render(<useSessionStorage />)
    })
})


import React from 'react';
import {render} from'@testing-library/react';
import StatusBarsForNormalization from '../StatusBarsForNormalization';
import {BrowserRouter} from 'react-router-dom';

describe("<StatusBarsForNormalization />", () => {
    it('render StatusBarsForNormalization page',()=>{
        render(<StatusBarsForNormalization />, {wrapper: BrowserRouter})
    })
})


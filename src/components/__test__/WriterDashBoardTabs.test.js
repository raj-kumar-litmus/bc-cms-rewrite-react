import React from 'react';
import {render} from'@testing-library/react';
import WriterDashBoardTabs from '../WriterDashBoardTabs';
import {BrowserRouter} from 'react-router-dom';

describe("<WriterDashBoardTabs />", () => {
    it('render WriterDashBoardTabs page',()=>{
        render(<WriterDashBoardTabs />, {wrapper: BrowserRouter})
    })
})


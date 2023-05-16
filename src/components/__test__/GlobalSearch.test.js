import React from 'react';
import {render} from'@testing-library/react';
import GlobalSearch from '../GlobalSearch';
import {BrowserRouter} from 'react-router-dom';

describe("<GlobalSearch />", () => {
    it('render GlobalSearch page',()=>{
        render(<GlobalSearch />, {wrapper: BrowserRouter})
    })
})


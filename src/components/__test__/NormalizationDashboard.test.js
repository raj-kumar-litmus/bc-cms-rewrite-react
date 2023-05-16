import React from 'react';
import {render} from'@testing-library/react';
import NormalizationDashboard from '../NormalizationDashboard';
import {BrowserRouter} from 'react-router-dom';

describe("<NormalizationDashboard />", () => {
    it('render NormalizationDashboard page',()=>{
        render(<NormalizationDashboard />, {wrapper: BrowserRouter})
    })
})


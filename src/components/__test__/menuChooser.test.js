import React from 'react';
import {render} from'@testing-library/react';
import MenuChooser from '../menuChooser';
import {BrowserRouter} from 'react-router-dom';
import * as hooks from "../../hooks/useSessionStorage";

describe("<menuChooser />", () => {
    jest.spyOn(hooks, 'default').mockImplementation(() => [["2e4ef0ca-1fb2-4d42-83a1-1b07a58b1eb5", "c1346560-4ac5-4256-a3e8-b4021eb183fb"]]);
    it('render menuChooser page',()=>{
        render(<MenuChooser/>, {wrapper: BrowserRouter})
    })
})
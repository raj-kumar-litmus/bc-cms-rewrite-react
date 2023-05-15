import React from 'react';
import {fireEvent, render, screen} from'@testing-library/react';
import MenuChooser from '../menuChooser';
import {BrowserRouter} from 'react-router-dom';
import * as hooks from "../../hooks/useSessionStorage";

describe("<menuChooser />", () => {
    jest.spyOn(hooks, 'default').mockImplementation(() => [["2e4ef0ca-1fb2-4d42-83a1-1b07a58b1eb5", "c1346560-4ac5-4256-a3e8-b4021eb183fb"]]);
    // const OLD_ENV = process.env;

    it('render menuChooser page',()=>{
        render(<MenuChooser/>, {wrapper: BrowserRouter})
    })
;
    //   test('will receive process.env variables', () => {
    //     process.env.NODE_ENV = 'test';
    //     process.env.USE_PROXY = 'true';
    //     expect(process.env.NODE_ENV).toBe("test")
    //   });

    it('Button Click for data-normalization-app', async ()=>{
        render(<MenuChooser />, {wrapper: BrowserRouter})
        const button =  screen.queryByTestId('data-normalization-app')
        fireEvent.click(button)
    })

    it('Button Click for Sizing app', async ()=>{
        render(<MenuChooser />, {wrapper: BrowserRouter})
        const button =  screen.queryByTestId('Sizing-app')
        fireEvent.click(button)
    })
})
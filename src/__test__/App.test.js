import React from 'react';
import {fireEvent, render, screen, waitFor} from'@testing-library/react';
import App from '../App';
import {BrowserRouter} from 'react-router-dom';

describe("<Login />", () => {
    it('render App page',()=>{
        render(<App />, {wrapper: BrowserRouter})
    })

    it('Button Click', async ()=>{
        render(<App />, {wrapper: BrowserRouter})
        const button =  screen.queryByTestId('button-click')
        fireEvent.click(button)
    })
})


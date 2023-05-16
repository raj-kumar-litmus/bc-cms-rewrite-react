import React from 'react';
import {fireEvent, render, screen} from'@testing-library/react';
import NavBar from '../NavBar';
import {BrowserRouter} from 'react-router-dom';
describe("<NavBar />", () => {
    it('render NavBar page',()=>{
        render(<NavBar />, {wrapper: BrowserRouter})
    })

    it('Button Click', async ()=>{
        render(<NavBar />, {wrapper: BrowserRouter})
        const button =  screen.queryByTestId('manualflow-button')
        fireEvent.click(button)
    })
})


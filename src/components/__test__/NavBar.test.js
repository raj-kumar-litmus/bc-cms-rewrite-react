import React from 'react';
import {fireEvent, render, screen} from'@testing-library/react';
import NavBar from '../NavBar';
import {BrowserRouter} from 'react-router-dom';
import click from '@testing-library/jest-dom';

describe("<NavBar />", () => {
    it('render NavBar page',()=>{
        render(<NavBar />, {wrapper: BrowserRouter})
    })

    it('Button Click', async ()=>{
        render(<NavBar />, {wrapper: BrowserRouter})
        const button =  screen.queryByTestId('manualflow-button')
        fireEvent.click(button)
    })

    // it('Show Popup Button Button Click', async ()=>{
    //     const { queryByTestId } = render(<NavBar condition={false} />, {wrapper: BrowserRouter});
    //     const button = queryByTestId('show-popup-button');
    //     expect(button).toBeVisible();
    
    //     // Simulate a click event
    //     // fireEvent.click(button);
    //     // fireEvent.click(button)
    // })
})


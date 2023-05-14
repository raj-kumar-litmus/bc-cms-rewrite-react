import React from 'react';
import {fireEvent, render, screen} from'@testing-library/react';
import WriterDashBoardTabs from '../WriterDashBoardTabs';
import {BrowserRouter} from 'react-router-dom';

describe("<WriterDashBoardTabs />", () => {
    it('render WriterDashBoardTabs page',()=>{
        render(<WriterDashBoardTabs />, {wrapper: BrowserRouter})
    })

    it('Unassigned Button Click', async ()=>{
        render(<WriterDashBoardTabs />, {wrapper: BrowserRouter})
        const button =  screen.queryByTestId('Unassigned')
        fireEvent.click(button)
        expect(button.textContent).toBe('Unassigned')
    })

    it('Completed Button Click', async ()=>{
        render(<WriterDashBoardTabs />, {wrapper: BrowserRouter})
        const button =  screen.queryByTestId('Completed')
        fireEvent.click(button)
        expect(button.textContent).toBe('Completed')

    })

    it('Assigned Button Click', async ()=>{
        render(<WriterDashBoardTabs />, {wrapper: BrowserRouter})
        const button =  screen.queryByTestId('Assigned')
        fireEvent.click(button)
        expect(button.textContent).toBe('Assigned')
    })

    it('InProgress Button Click', async ()=>{
        render(<WriterDashBoardTabs />, {wrapper: BrowserRouter})
        const button =  screen.queryByTestId('InProgress')
        fireEvent.click(button)
        expect(button.textContent).toBe('InProgress')
    })

    // it('Unassigned Button Click1', async ()=>{
    //     render(<WriterDashBoardTabs />, {wrapper: BrowserRouter})
    //     const button =  screen.queryByTestId('Unassigned')
    //     fireEvent.click(button)
    //     expect(button.textContent).toBe('Unassigned')
    // })
})


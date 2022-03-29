import React from 'react'
import ReactDOM from 'react-dom'
import Footer from './../footer';

import { render } from "@testing-library/react"

it('renders correctly', () => {
    const div = document.createElement("div")
    ReactDOM.render(<Footer/>, div)
    expect(div.textContent).toBe("Random Footer :)");
})
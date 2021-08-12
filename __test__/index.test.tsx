import Home from "../pages/index"
import {render, screen} from "@testing-library/react"

describe("Home Componenent", () => {
    test("check if it renders...Hello World", () => {
        render(<Home />)
    
        const helloWorld = screen.getByText("Hello World")
        expect(helloWorld).toBeInTheDocument()
    })
})

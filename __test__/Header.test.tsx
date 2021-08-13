import Header from "../components/Header"
import {render, screen} from "@testing-library/react"

describe("Header Componenent", () => {
    test("check if it renders: Home", () => {
        render(<Header />)
    
        const home = screen.getByText("Home")
        expect(home).toBeInTheDocument()
    })
})

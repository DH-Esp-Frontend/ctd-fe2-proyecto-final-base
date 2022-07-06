import {  screen }from "@testing-library/react";
import { render } from "../../test-utils"
import Cita from "./Cita";

describe('Rendering Quote component', () => {
    it("shoudl display a message when no search has being initialized", () => {
        render(<Cita/>)
    
        const initialText = screen.queryByText("No se encontro ninguna cita")
        expect(initialText).toBeInTheDocument();
    })
    
    it("should hava a place holder in the input indicating what kind of string should be use for seraching", () => {
        render(<Cita/>)
        const placeHolderInput = screen.queryByPlaceholderText("Ingresa el nombre del autor")
        expect(placeHolderInput).toBeInTheDocument();
    })

    // it("should renderize 2 buttons", () =>{
    //     render(<Cita/>)
    //     const button = screen.getByRole('button')

    //     expect(button).toHaveLength()
    // })


})

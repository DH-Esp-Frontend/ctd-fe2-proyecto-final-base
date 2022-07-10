import {  fireEvent, screen, waitFor  }from "@testing-library/react";
import { setupServer } from "msw/lib/node";
import { handlers } from "../../mocks/handlers";
import { render } from "../../test-utils"
import Cita from "./Cita";
import userEvent from "@testing-library/user-event";
import mockquotes from '../../mocks/mockQuotes';
import exp from "constants";

/**
 * setting up the configuration for the test
 */
const server = setupServer(...handlers);
beforeAll(()=>{
    server.listen();
})
afterAll(() => {
    server.close();
})
afterEach(() => {
    server.resetHandlers;
})


describe('=================== Rendering Quote component ===================', () => {
    beforeEach(() => {
        render(<Cita/>);
    })

    it("shoudl display a message when no search has being initialized", () => {
        const idleText = screen.queryByText("No se encontro ninguna cita")
        expect(idleText).toBeInTheDocument();
    });
    
    it("should have a place holder text in the input indicating what kind of string should be use for seraching", () => {
        const placeHolderInput = screen.queryByPlaceholderText("Ingresa el nombre del autor")
        expect(placeHolderInput).toBeInTheDocument();
    });

    it("should renderize button to search", () =>{
        const button = screen.getByRole('button', {name: "Obtener cita aleatoria"})
        expect(button).toBeInTheDocument()
    });

    it("should renderize button to erase search input", () =>{
        const button = screen.getByRole('button', {name: "Borrar"})
        expect(button).toBeInTheDocument()
    });

    it("should change the name of the search button `Obtener cita aleatoria` if any text is typed in the input area", async () => {
        const inputSearch = screen.getByPlaceholderText("Ingresa el nombre del autor");      
        fireEvent.change(inputSearch, {target: {value: 'holis'}})
        waitFor(() => {
            expect(screen.getByRole('button', {name: "Obtener cita"})).toBeInTheDocument;
        })
    })
});

describe("===================Verifying buttons functionality ===================", () =>{
    beforeEach(() => {
        render(<Cita/>);
    })

    it("should display a random quote when no text is inputted", async () => {
        const inputSearch = screen.getByPlaceholderText("Ingresa el nombre del autor");  
        const button = screen.getByRole('button', {name: "Obtener cita aleatoria"});

        await userEvent.clear(inputSearch);
        fireEvent.click(button);

        await waitFor(() => 
        expect(screen.queryByText(mockquotes.randonQuote.character)).toBeInTheDocument()
        )
    });

    it("should display a quote related to a specific character when a name is inputted", async () => {
        const button = screen.getByRole('button', {name: "Obtener cita aleatoria"});
        const inputSearch = screen.getByPlaceholderText("Ingresa el nombre del autor"); 

        await userEvent.clear(inputSearch);
        fireEvent.change(inputSearch, {target: {value: 'Moe'}});
        fireEvent.click(button);

        await waitFor(() => 
        expect(screen.queryByText(mockquotes.randonQuote.character)).toHaveTextContent("Moe Szyslak")
        )
    })

    // it("should generate a text soliciting a valid name for search when typing not valid values for search", async () => {
    //     const button = screen.getByText("Obtener cita", {selector: "button"});
    //     const inputSearch = screen.getByPlaceholderText("Ingresa el nombre del autor"); 

    //     await userEvent.clear(inputSearch);

    //     fireEvent.change(inputSearch, {target: {value:'holis'}});

    //     await userEvent.click(button)

    //     await waitFor(() => 
    //         expect(screen.getByPlaceholderText("Por favor ingrese un nombre válido"))
    //     )
    // })

    it("should erase the content of the input field when the `Borrar` button is pressed", async () => {
        const button = screen.getByText("Borrar", { selector: "button"});
        const inputSearch = screen.getByPlaceholderText("Ingresa el nombre del autor"); 

        fireEvent.change(inputSearch, {target: {value:'holis'}});
        fireEvent.click(button)

        await waitFor(() => 
            expect(inputSearch).toBeEmptyDOMElement()
            )
    })
})
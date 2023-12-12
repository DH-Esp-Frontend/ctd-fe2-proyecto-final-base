import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "../../test-utils";
import Cita from "./Cita";
import userEvent from "@testing-library/user-event";


const setup = () => render(<Cita />);

describe("Renderizacion inicial", () => {
  it("Debe renderizarse correctamente texto inicial", async () => {

    setup();
    const texto = await screen.findByText('No se encontro ninguna cita')
    expect(texto).toBeInTheDocument();
  });

  it("Renderización input búsqueda", async () => {
    setup();
    const inputSearch = await screen.findByPlaceholderText('Ingresa el nombre del autor')
    expect(inputSearch).toBeVisible();
  })

  it("Renderización Cita aleatoria", async () => {
    setup();
    const btnCita = await screen.findByLabelText('Obtener cita aleatoria')
    expect(btnCita).toBeEnabled();
  })

  it("Se renderiza botón borrar", async () => {
    setup();
    const btnBorrar = await screen.findByLabelText("Borrar");
    expect(btnBorrar).toBeEnabled();
  })
});

describe("Renderizacion valor numerico", () => {
  it("Debe mostrarse mensaje de error", async () => {
    setup();
    const inputSearch = await screen.findByPlaceholderText('Ingresa el nombre del autor')
    const btnCita = await screen.findByLabelText('Obtener cita aleatoria')
    await userEvent.clear(inputSearch);
    fireEvent.change(inputSearch, { target: { value: '123' } });
    fireEvent.click(btnCita);
    await waitFor(() => {
      const textoError = screen.queryByText('Por favor ingrese un nombre válido')
      expect(textoError).toBeInTheDocument();
    })

  })
})

describe('Renderización busqueda aletoria', () => {
  it('Se renderiza cita al azar', async () => {
    setup();
    const btnCita = await screen.findByLabelText('Obtener cita aleatoria')
    const inputSearch = await screen.findByPlaceholderText('Ingresa el nombre del autor')
    await userEvent.clear(inputSearch)
    fireEvent.click(btnCita);
    await waitFor(() => {
      const pCita = screen.getByTestId('character-quote');
      expect(pCita).not.toHaveTextContent("I'm sleeping in the bath tub");
    })
  })

  it('Renderización nombre personaje', async () => {
    setup();
    const btnCita = await screen.findByLabelText('Obtener cita aleatoria')
    const inputSearch = await screen.findByPlaceholderText('Ingresa el nombre del autor')
    await userEvent.clear(inputSearch)
    fireEvent.click(btnCita);
    await waitFor(() => {

      const nPersonaje = screen.getByTestId('character-name');
      expect(nPersonaje).toBeVisible();

    })
  })
})  
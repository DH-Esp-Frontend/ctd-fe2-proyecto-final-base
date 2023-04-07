
//buscar parrafo para testear scrim cuando se renderize el componente
//boton de click de cita aleatoria
//devuelva cualquier cita
//import { input } from "@testing-library/user-event/dist/types/utils";
import {fireEvent, render, screen} from "../../test-utils";
import Cita from "./Cita";

describe ('Prueba <Cita />', () => {
test('Cita por personaje', async() => {
    render(<Cita/>)

    const input = screen.getByPlaceholderText('Ingresa el nombre del autor')

    fireEvent.change(input, { target: { value: 'Homer'} })
    
    const button = screen.getByRole('button', { name: 'Obtener Cita'});
    
    fireEvent.click(button);

    expect( await screen.findByText("I can't even say the word 'titmouse' without gigggling like a schoolgirl.")).toBeInTheDocument();

})
})
//obtener cita aleatoria
describe('Pruebas en <Citas /> random', () => {
  test('Busquyeda de cita por personaje', async () => {
      render(<Cita />)
      const handleClick = jest.fn();
      render(<button onClick={handleClick}>Obtener cita aleatoria</button>);
      const button = screen.getByLabelText('Obtener cita aleatoria');
      fireEvent.click(button);
      expect(button).toBeInTheDocument();
    })
});



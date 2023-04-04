
//buscar parrafo para testear scrim cuando se renderize el componente
//boton de click de cita aleatoria
//devuelva cualquier cita
import { input } from "@testing-library/user-event/dist/types/utils";
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

//    describe ('prueba Parrafo',  () =>{
//    test('Parrafo', () => {
//     render(<p>No se encontro ninguna cita!</p>);
//     const paragraph = screen.queryAllByText(/'No se encontro ninguna cita!'/i);
//     expect(paragraph).toBeInTheDocument();
//     expect(paragraph).toHaveClass("sc-dmqHEX bmmMuv");
//   });
//     });

// describe ('prueba boton borrar', ()=>{
    
//     test('boton Borrar', () => {S
//   render(<button>Borrar</button>);
//   const button = screen.getByRole('Borrar');
//   fireEvent.click(button);
//   expect(button).toHaveClass("sc-eDDNvR ePSgYi");
// });
// })



// test("incrementa el conteo al llamar al método incrementar", () => {
//   const { result } = renderHook(() => useContador());
  
//   act(() => {
//     result.current.incrementar();
//   });
  
//   expect(result.current.contador).toBe(1);
//  });

//probar test button borrar
// test('render a button after the initial render (inside useEffect)', async () => {
//   render(<MyComponent />)
//   const button = await screen.findByRole('button', {name: /show!/i})
//   expect(button).toBeInTheDocument()
//  })
 
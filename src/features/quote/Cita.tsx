import React, { useState } from "react";
import { shallowEqual } from "react-redux";
import { Boton, Input, AutorCita, ContenedorCita, TextoCita } from "./styled";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {obtenerCitaDelEstado, limpiar, obtenerEstadoDelPedido, obtenerCitaDeLaAPI} from "./citaSlice";
import { obtenerMensaje } from "./utils";

function Cita() {
  // Estado local
  const [valorInput, setValorInput] = useState("");
  const [error, setError] = useState(false);

  // Obtener datos del estado global
  const { cita = "", personaje = "" } =
    useAppSelector(obtenerCitaDelEstado, shallowEqual) || {};
  const estadoPedido = useAppSelector(obtenerEstadoDelPedido);

  // Dispatch de acciones
  const dispatch = useAppDispatch();

  // Función para obtener una cita
  const obtenerCita = () => {
    dispatch(obtenerCitaDeLaAPI(valorInput));
  };

  // Función para borrar la cita y restablecer los valores
  const borrarCita = () => {
    dispatch(limpiar());
    setValorInput("");
    setError(false);
  };

  // Función para manejar el cambio en el input
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValorInput(inputValue);

    if (!isNaN(Number(inputValue))) {
      // Si el valor ingresado es numérico
      setError(true);
    } else {
      setError(false);
      obtenerCita(); // Realizar búsqueda de citas automáticamente
    }
  };

  return (
    <ContenedorCita>
      {error ? (
        <TextoCita data-testid="error-message">
          Por favor ingrese un nombre válido
        </TextoCita>
      ) : (
        <>
          <TextoCita data-testid="character-quote">
            {obtenerMensaje(cita, estadoPedido)}
          </TextoCita>
          <AutorCita data-testid="character-name">{personaje}</AutorCita>
        </>
      )}
      <Input
        aria-label="Author Cita"
        value={valorInput}
        onChange={onChangeInput}
        placeholder="Ingresa el nombre del autor"/>
      <Boton
        aria-label={valorInput ? "Obtener Cita" : "Obtener cita aleatoria"}
        onClick={obtenerCita}>
        {valorInput ? "Obtener Cita" : "Obtener cita aleatoria"}
      </Boton>
      <Boton aria-label="Borrar" onClick={borrarCita} secondary={true}>
        Borrar
      </Boton>
    </ContenedorCita>
  );
}

export default Cita;

import React from "react";
import { INoticiasNormalizadas } from "./Normalizadas";
import {
  TarjetaNoticia,
  FechaTarjetaNoticia,
  DescripcionTarjetaNoticia,
  ImagenTarjetaNoticia,
  TituloTarjetaNoticia,
  BotonLectura,
} from "../styled";

const CardNoticias = ({ noticia, setModal }: { noticia: INoticiasNormalizadas; setModal: React.Dispatch<React.SetStateAction<INoticiasNormalizadas | null>>; }) => {
  const handleVerMasClick = () => {
    setModal(noticia);
  };

  return (
    <TarjetaNoticia>
      <ImagenTarjetaNoticia src={noticia.imagen} />
      <TituloTarjetaNoticia>{noticia.titulo}</TituloTarjetaNoticia>
      <FechaTarjetaNoticia>{noticia.fecha}</FechaTarjetaNoticia>
      <DescripcionTarjetaNoticia>{noticia.descripcionCorta}</DescripcionTarjetaNoticia>
      <BotonLectura onClick={handleVerMasClick}>Ver más</BotonLectura>
    </TarjetaNoticia>
  );
};

export default CardNoticias;
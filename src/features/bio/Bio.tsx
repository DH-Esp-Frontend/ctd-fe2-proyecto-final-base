import { useState } from "react";
import { NombresSimpsons, INFO_SIMPSONS } from "./constants";
import { BioContainer, 
  ContenedorBotones, 
  BioImagen, 
  BioNombre,
  BioDescripcion, 
  BotonBioActivo, 
  BotonBioInactivo
} from "./styled";

const Bio = () => {
  const [bioActiva, setBioActiva] = useState(
    INFO_SIMPSONS[NombresSimpsons.BART]
  );

  const onClick: (nombre: NombresSimpsons) => void = (nombre) =>
    setBioActiva(INFO_SIMPSONS[nombre]);

  const crearBotones = () => {
    return Object.keys(INFO_SIMPSONS).map((nombre: string) => (

      bioActiva.id === nombre?
      <BotonBioActivo
      key={nombre as string}
      onClick={() => onClick(nombre as NombresSimpsons)}
      > {nombre} </BotonBioActivo>
            : 
      <BotonBioInactivo
      key={nombre as string}
      onClick={() => onClick(nombre as NombresSimpsons)} >
        {nombre}
        </BotonBioInactivo>
    ));
  };

  return (
    <BioContainer> 
      <ContenedorBotones>{crearBotones()}</ ContenedorBotones>    
          <BioImagen
            src={bioActiva.image}
            alt={bioActiva.nombre}/>    
          <BioNombre>{bioActiva.nombre}</BioNombre>
          <BioDescripcion>{bioActiva.descripcion}</BioDescripcion>
    </BioContainer>
  );
};

export default Bio;

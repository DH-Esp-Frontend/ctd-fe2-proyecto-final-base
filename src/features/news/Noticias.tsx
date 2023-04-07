import { useCallback, useEffect, useState } from "react";
import { SuscribeImage, CloseButton as Close } from "../../assets";
import Noticia, {INoticiasNormalizadas}from "./Noticia";
import INoticiasProvider from "./NoticiasProvider";
import {
  CloseButton,
  TarjetaModal,
  ContenedorModal,
  DescripcionModal,
  ImagenModal,
  TituloModal,
  TarjetaNoticia,
  FechaTarjetaNoticia,
  DescripcionTarjetaNoticia,
  ImagenTarjetaNoticia,
  TituloTarjetaNoticia,
  ContenedorNoticias,
  ListaNoticias,
  TituloNoticias,
  BotonLectura,
  BotonSuscribir,
  CotenedorTexto,
} from "./styled";

/**
* Componente para mostrar listas de noticias y ver detalles en un modal
@param {Object} props
@param {INoticiasProvider} props.noticiasProvider
 */

const Noticias = ({ noticiasProvider }: { noticiasProvider:INoticiasProvider }) => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);
 
  /**
  * Función que obtiene la información de las noticias.
  * @function
  */

const obtenerInformacionNoticias = useCallback(async () => {
  const noticiasApi = await noticiasProvider.obtenerNoticias();
  const noticiasNormalizadas = noticiasApi.map((noticia) => Noticia(noticia));
  setNoticias(noticiasNormalizadas);
}, [noticiasProvider]);

useEffect(() => {
  const actualizarNoticias = async () => {
    await obtenerInformacionNoticias();
  };
  actualizarNoticias();
}, [obtenerInformacionNoticias]);
/**
 @function
 */
  const handleSubscribe = () => {
    setTimeout(() => {
      alert("Suscripto!");
      setModal(null);
    }, 1000);
  };



  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        {noticias.map((n) => (
          <TarjetaNoticia>
            <ImagenTarjetaNoticia src={n.imagen} />
            <TituloTarjetaNoticia>{n.titulo}</TituloTarjetaNoticia>
            <FechaTarjetaNoticia>{n.fecha.toLocaleDateString()}</FechaTarjetaNoticia>
            <DescripcionTarjetaNoticia>
              {n.descripcionCorta}
            </DescripcionTarjetaNoticia>
            <BotonLectura onClick={() => setModal(n)}>Ver más</BotonLectura>
          </TarjetaNoticia>
        ))}
        {modal ? (
          modal.esPremium ? (
            <ContenedorModal>
              <TarjetaModal>
                <CloseButton onClick={() => setModal(null)}>
                  <img src={Close} alt="close-button" />
                </CloseButton>
                <ImagenModal src={SuscribeImage} alt="mr-burns-excelent" />
                <CotenedorTexto>
                  <TituloModal>Suscríbete a nuestro Newsletter</TituloModal>
                  <DescripcionModal>
                    Suscríbete a nuestro newsletter y recibe noticias de
                    nuestros personajes favoritos.
                  </DescripcionModal>
                  <BotonSuscribir
                    onClick={handleSubscribe}
                  >
                    Suscríbete
                  </BotonSuscribir>
                </CotenedorTexto>
              </TarjetaModal>
            </ContenedorModal>
          ) : (
            <ContenedorModal>
              <TarjetaModal>
                <CloseButton onClick={() => setModal(null)}>
                  <img src={Close} alt="close-button" />
                </CloseButton>
                <ImagenModal src={modal.imagen} alt="news-image" />
                <CotenedorTexto>
                  <TituloModal>{modal.titulo}</TituloModal>
                  <DescripcionModal>{modal.descripcion}</DescripcionModal>
                </CotenedorTexto>
              </TarjetaModal>
            </ContenedorModal>
          )
        ) : null}
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default Noticias;

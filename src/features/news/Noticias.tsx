import { useEffect, useState } from "react";
import { SuscribeImage, CloseButton as Close } from "../../assets";
import { obtenerNoticias } from "./fakeRest";
import { CalcularMinutosDePublicada } from "./Utils/TiempoPublicacion";
import { INoticiasNormalizadas } from "./Utils/Normalizadas";
import { MayusculasEnPalabras } from "./Utils/Mayusculas";
import { NoticiaFinal } from "./Utils/NFinal";
import CardNoticias from "./Utils/Noticias";

import {
  CloseButton,
  TarjetaModal,
  ContenedorModal,
  DescripcionModal,
  ImagenModal,
  TituloModal,
  ContenedorNoticias,
  ListaNoticias,
  TituloNoticias,
  BotonSuscribir,
  CotenedorTexto,
} from "./styled";

const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const obtenerInformacion = async () => {
      const respuesta = await obtenerNoticias();

      const data = respuesta.map((n) => {
        const titulo = MayusculasEnPalabras(n);
        const minutosTranscurridos = CalcularMinutosDePublicada(n);
        return NoticiaFinal(n, minutosTranscurridos, titulo);
      });

      setNoticias(data);
    };

    obtenerInformacion();
  }, []);

  const handleSubscription = () => {
    setSubscribed(true);
    setTimeout(() => {
      alert("¡Suscrito!");
    }, 1000);
  };

  const handleModalClose = () => {
    setModal(null);
    setSubscribed(false);
  };

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        {noticias.map((n) => (
          <CardNoticias key={n.id} noticia={n} setModal={setModal} />
        ))}
        {modal && (
          <ContenedorModal>
            <TarjetaModal>
              <CloseButton onClick={handleModalClose}>
                <img src={Close} alt="close-button" />
              </CloseButton>
              {subscribed ? (
                <>
                  <ImagenModal src={modal.imagen} alt="news-image" />
                  <CotenedorTexto>
                    <TituloModal>{modal.titulo}</TituloModal>
                    <DescripcionModal>{modal.descripcion}</DescripcionModal>
                  </CotenedorTexto>
                </>
              ) : (
                <>
                  <ImagenModal src={SuscribeImage} alt="mr-burns-excelent" />
                  <CotenedorTexto>
                    <TituloModal>Suscríbete a nuestro Newsletter</TituloModal>
                    <DescripcionModal>
                      Suscríbete a nuestro boletín y recibe noticias de
                      nuestros personajes favoritos.
                    </DescripcionModal>
                    <BotonSuscribir onClick={handleSubscription}>
                      Suscríbete
                    </BotonSuscribir>
                  </CotenedorTexto>
                </>
              )}
            </TarjetaModal>
          </ContenedorModal>
        )}
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default Noticias;
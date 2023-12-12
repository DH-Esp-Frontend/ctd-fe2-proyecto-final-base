import { INoticias } from "./INoticias";

export const MayusculasEnPalabras: (objeto: INoticias) => string = (objeto) => {

  return objeto.titulo
    .split(" ")
    .map((str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    })
    .join(" ");
};
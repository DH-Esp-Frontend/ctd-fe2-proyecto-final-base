import { rest } from "msw";
import { API_URL } from "../../../app/constants";
import { ICita } from "../types";

export const citaConNombre: ICita = {
  cita: "All I'm gonna use this bed for is sleeping, eating and maybe building a little fort.",
  personaje: "Homer Simpson",
  imagen:
    "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939",
  direccionPersonaje: "Right",
};

export const citaAlAzar: ICita = {
  cita: "I'm sleeping in the bath tub.",
  personaje: "Marge Simpson",
  imagen:
    "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FMargeSimpson.png?1497567512205",
  direccionPersonaje: "Right",
};

export const handlers = [
  //array de peticiones
  rest.get(API_URL, (req, res, ctx) => {
    //url , funcion q recibe rec
    const citaFinal = req.url.searchParams.get("character")
      ? citaConNombre
      : citaAlAzar;

    return res(ctx.status(200), ctx.json([citaFinal]));
  }),
];

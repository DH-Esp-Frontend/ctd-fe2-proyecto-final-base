import { INoticias } from "./fakeRest";
/**
@function
@returns {Promise<INoticias[]>}  
*/
export interface INoticiasProvider {
  obtenerNoticias: () => Promise<INoticias[]>;
}

export default INoticiasProvider;
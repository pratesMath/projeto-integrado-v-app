import axios from "axios";
// Configurando axios para fazer chamadas no servidor/API
//e retornar informações do banco de dados
export const API = axios.create({
  baseURL: "https://projeto-integrado-v-servidor.onrender.com",
});

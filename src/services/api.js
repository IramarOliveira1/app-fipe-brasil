import axios from 'axios';

const api = axios.create({
  baseURL: 'https://veiculos.fipe.org.br/api/veiculos',
});

export default api;

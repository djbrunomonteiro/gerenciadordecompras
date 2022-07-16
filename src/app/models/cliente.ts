export interface ICliente {
    id?: string,
    nome?: string,
    whats?: string,
    tel?: string,
    email?: string,
    instagram?: string,
    endereco?: {
      logradouro?: string,
      numero?: string,
      bairro?: string,
      cep?: string,
      uf?: string,
      cidade?: string,
      complemento?: string,
      referencia?: string,
    }

}
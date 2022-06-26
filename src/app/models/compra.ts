export interface ICompra {
    id?: string,
    id_user?: string,
    nome?: string,
    fornecedor?: string,
    quantidade?: string | number,
    valor_compra?: string | number,
    data?: string,
    custo_frete?: string | number,
    custo_outros?: any[],
    total?: string | number
}
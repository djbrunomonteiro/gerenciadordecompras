export interface ICompra {
    id?: string,
    id_user?: string,
    nome?: string,
    fornecedor?: string,
    quantidade?: string | number,
    valor_compra?: string | number,
    descricao?: string,
    data?: string,
    custo_frete?: string | number,
    custo_outros?: any[],
    produtos?: any[],
    total?: string | number
}
export interface ICompra {
    id?: string,
    fornecedor?: string,
    quantidade?: string | number,
    valor_compra?: string | number,
    custo_frete?: string | number,
    custo_outros?: any[]
}
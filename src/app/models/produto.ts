export interface IProduto {
    id_produto?: string,
    nome_produto?: string,
    porcentagem?: string | number,
    quantidade?: string | number,
    valor_compra?: string | number,
    valor_sugerido?: string | number,
    valor_venda?: string | number,
    colecao?: string,
    descricao?: string,
    fotos?: any[],
}
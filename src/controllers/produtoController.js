import categoriaModel from "../models/categoriasModels.js";
import produtoModel from "../models/produtosModels.js";

const produtoController = {

    criarProduto: async (req, res) => {
        try {

            const { idCategoria, nomeProduto, valorProduto, vinculoImagem, dataCad } = req.body;

            
            if (!idCategoria || !nomeProduto || !valorProduto || !vinculoImagem || !dataCad) {
                return res.status(400).json({ error: 'campos obrigatorios não prenchidos!' });
            }

            if (idCategoria === "" || idCategoria <= 0) {
                return res.status(400).json({ erro: "id da categoria invalido" });
            }
            const categoria = await categoriaModel.buscarUmaCategoria(idCategoria);
            if (categoria.length == 0) {
                return res.status(404).json({ message: 'não há nenhuma categoria com este id' });
            }

         
            await produtoModel.inserirProduto(idCategoria, nomeProduto, valorProduto, vinculoImagem, dataCad)

            res.status(201).json({ message: 'produto cadastrado com sucesso!' });

        } catch (error) {
            console.error('erro ao cadastrar cliente:', error);
            res.status(500).json({ error: 'erro no servidor ao cadastrar cliente' });
        }
    },

    listarProduto: async (req, res) => {
        try {

            const { idProduto } = req.query;

            if (idProduto) {
                if (idProduto === "" || idProduto <= 0) {
                    return res.status(400).json({ erro: "id do produto invalido" });
                }
                const produto = await produtoModel.buscarUmProduto(idProduto);
                if (produto.length == 0) {
                    return res.status(404).json({ message: 'não há nenhum produto com este id' });
                }


                return res.status(200).json(produto);
            }

            const result = await produtoModel.buscarProduto()

            if (result.length == 0) {
                return res.status(200).json({ message: 'não há nenhum produto' });
            }

            res.status(201).json(result);
        } catch (error) {
            console.error('erro ao listar produto:', error);
            res.status(500).json({ error: 'erro no servidor ao listar produtos' });
        }
    },

   atualizarProduto: async (req, res) => {
    try {

        const { idProduto } = req.params;
        const { idCategoria, nomeProduto, valorProduto, vinculoImagem, dataCad } = req.body;

        // validar idProduto
        if (!idProduto || idProduto <= 0) {
            return res.status(400).json({ erro: "id do produto invalido" });
        }

        const produtoExiste = await produtoModel.buscarUmProduto(idProduto);
        if (produtoExiste.length == 0) {
            return res.status(404).json({ message: 'não há nenhum produto com este id' });
        }

        // validar idCategoria
        if (!idCategoria || idCategoria <= 0) {
            return res.status(400).json({ erro: "id da categoria invalido" });
        }

        const categoria = await categoriaModel.buscarUmaCategoria(idCategoria);
        if (categoria.length == 0) {
            return res.status(404).json({ message: 'não há nenhuma categoria com este id' });
        }

        // atualizar somente depois de validar tudo
        const result = await produtoModel.atulizarProduto({
            idProduto,
            idCategoria,
            nomeProduto,
            valorProduto,
            vinculoImagem,
            dataCad
        });

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'produto atualizado com sucesso' });
        }

        return res.status(400).json({ message: 'erro ao atualizar produto' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'erro no servidor',
            errorMessage: error.message
        });
    }
},
    deletarProduto: async (req, res) => {
        try {

            const { idProduto } = req.params;

            if (idProduto) {
                if (idProduto === "" || idProduto <= 0) {
                    return res.status(400).json({ erro: "id do produto invalido" });
                }
                const produto = await produtoModel.buscarUmProduto(idProduto);
                if (produto.length == 0) {
                    return res.status(200).json({ message: 'não há nenhum produto com este id' });
                }

                await produtoModel.deletarProduto(idProduto)
                res.status(200).json({ message: 'Produto deletada com sucesso' });

            }


        } catch (error) {
            console.error('erro ao listar categoria:', error);
            res.status(500).json({ error: 'erro no servidor ao listar categoria' });
        }
    },


}

export default produtoController
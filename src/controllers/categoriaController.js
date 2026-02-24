
import categoriaModel from "../models/categoriasModels.js";

const categoriaController = {

    criarCategoria: async (req, res) => {
        try {

            const {descricaoCategoria, dataCad } = req.body;

            // Campos obrigatórios
            if (!descricaoCategoria || !dataCad) {
                return res.status(400).json({ error: 'campos obrigatorios não prenchidos!' });
            }

         

            // Insere cliente
            await categoriaModel.inserirCategoria(descricaoCategoria, dataCad)

            res.status(201).json({ message: 'categoria cadastrado com sucesso!' });

        } catch (error) {
            console.error('erro ao cadastrar cliente:', error);
            res.status(500).json({ error: 'erro no servidor ao cadastrar cliente' });
        }
    },

    listarCategoria: async (req, res) => {
        try {
            
            const {idCategoria} = req.query;

            if (idCategoria) {
                if (idCategoria === ""|| idCategoria<=0) {
                    return res.status(400).json({ erro: "id da categoria invalido" });
                }
                const categoria = await categoriaModel.buscarUmaCategoria(idCategoria);
                if (categoria.length == 0) {
                     return res.status(200).json({ message: 'não há nenhuma categoria com este id' });
                }
                

                 return res.status(200).json(categoria);
            }
            
            const result = await categoriaModel.buscarCategoria()
            
            if (result.length == 0) {
                return res.status(200).json({ message: 'não há nenhuma categoria' });
            }

          res.status(201).json(result);
        } catch (error) {
            console.error('erro ao listar categoria:', error);
            res.status(500).json({ error: 'erro no servidor ao listar categoria' });
        }
    },

    atualizarCategoria: async (req, res) => {
        try {
            const { idCategoria } = req.params;
            const categoria = req.body;

            const result = await categoriaModel.atulizarCategoria({
                idCategoria: idCategoria,
                descricaoCategoria: categoria.descricaoCategoria,
                dataCad: categoria.dataCad
            });

            console.log(result)

            if (result.affectedRows > 0) {

                res.status(200).json({ message: 'categoria atualizado com sucesso' });
            }

            res.status(400).json({ message: 'Ocorreu um erro ao atualizar a categoria' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
        }
    }


}

export default categoriaController
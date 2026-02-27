import pool from "../config/db.js";

const produtoModel = {


    inserirProduto: async (idCategoria, nomeProduto, valorProduto, vinculoImagem, dataCad) => {
        try {

            const sql = 'INSERT INTO produtos (idCategoria, nomeProduto, valorProduto, vinculoImagem, dataCad) VALUES (?, ?, ?, ?, ?);'
            const values = [idCategoria, nomeProduto, valorProduto, vinculoImagem, dataCad];
            const [rows] = await pool.execute(sql, values);
            return rows;

        } catch (error) {
            console.error('erro ao inserir categoria:', error);
            throw error;
        }
    },

    buscarProduto: async () => {
        try {

            const sql = ' select * from produtos';
            const [rows] = await pool.execute(sql);
            return rows;


        } catch (error) {
            console.error('erro ao buscar produto:', error);
            throw error;
        }
    },

    buscarUmProduto: async (idProduto) => {
        try {

            const sql = ' select * from produtos where idProduto= ?';
            const values = [idProduto];
            const [rows] = await pool.execute(sql, values);
            return rows;


        } catch (error) {
            console.error('erro ao buscar categoria:', error);
            throw error;
        }
    },

    atulizarProduto: async (pProduto) => {
        try {

            const sql = `UPDATE produtos
            SET idCategoria = ?,
              nomeProduto= ?,
               valorProduto= ?,
                vinculoImagem= ?, 
                dataCad= ?
            WHERE idProduto = ?`;

            const values = [
               pProduto.idCategoria, 
                pProduto.nomeProduto,
                pProduto.valorProduto, 
                pProduto.vinculoImagem, 
                pProduto.dataCad,
                pProduto.idProduto
            ];

            const [rows] = await pool.execute(sql, values);
            return rows;

        } catch (error) {
            console.error('erro ao atualizar produto:', error);
            throw error;
        }
    },


    deletarProduto: async (idProduto) => {
        try {

            const sql = ' delete from produtos where idProduto= ?';
            const values = [idProduto];
            const [rows] = await pool.execute(sql, values);
            return rows;


        } catch (error) {
            console.error('erro ao deletar produto:', error);
            throw error;
        }
    },


}

export default produtoModel
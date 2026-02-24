import pool from "../config/db.js";

const categoriaModel = {


    inserirCategoria: async (descricaoCategoria, dataCad) => {
        try {

            const sql = 'INSERT INTO categorias (descricaoCategoria, dataCad) VALUES (?, ?);'
            const values = [descricaoCategoria, dataCad];
            const [rows] = await pool.execute(sql, values);
            return rows;

        } catch (error) {
            console.error('erro ao inserir categoria:', error);
            throw error;
        }
    },

    buscarCategoria: async () => {
        try {

            const sql = ' select * from categorias';
            const [rows] = await pool.execute(sql);
            return rows;


        } catch (error) {
            console.error('erro ao buscar categoria:', error);
            throw error;
        }
    },

    buscarUmaCategoria: async (idCategoria) => {
        try {

            const sql = ' select * from categorias where idCategoria= ?';
            const values = [idCategoria];
            const [rows] = await pool.execute(sql, values);
            return rows;


        } catch (error) {
            console.error('erro ao buscar categoria:', error);
            throw error;
        }
    },

    atulizarCategoria: async (cCategoria) => {
         try {

            const sql = `UPDATE categorias
                SET descricaoCategoria = ?,
                    dataCad = ?,
                WHERE idCategoria = ?`;
            const values = [cCategoria.descricaoCategoria, cCategoria.dataCad, cCategoria.idCategoria];
            const [rows] = await pool.execute(sql, values);
            return rows;


        } catch (error) {
            console.error('erro ao atulizar categoria:', error);
            throw error;
        }
    }



}

export default categoriaModel
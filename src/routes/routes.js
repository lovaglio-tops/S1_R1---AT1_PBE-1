import { Router } from "express";
import categoriaController from "../controllers/categoriaController.js";
import produtoController from "../controllers/produtoController.js";
import imagemController from "../controllers/imagem.controller.js";
import uploadImage from "../middlewares/upload.image.middlewares.js"

const routes = Router();

routes.post('/categoria', categoriaController.criarCategoria);
routes.get('/categoria', categoriaController.listarCategoria);
routes.put('/categoria/:idCategoria', categoriaController.atualizarCategoria);
routes.delete('/categoria/:idCategoria', categoriaController.deletarCategoria);

routes.post('/produto', produtoController.criarProduto);
routes.get('/produto', produtoController.listarProduto);
routes.put('/produto/:idProduto', produtoController.atualizarProduto);
routes.delete('/produto/:idProduto', produtoController.deletarProduto);

routes.post('/produtos/imagens', uploadImage, imagemController.upload);



export default routes;
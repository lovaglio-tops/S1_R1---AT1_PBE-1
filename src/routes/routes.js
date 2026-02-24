import { Router } from "express";
import categoriaController from "../controllers/categoriaController.js";

const routes = Router();

routes.post('/categoria', categoriaController.criarCategoria);
routes.get('/categoria', categoriaController.listarCategoria);
routes.put('/categoria/:idCategoria', categoriaController.atualizarCategoria);

export default routes;
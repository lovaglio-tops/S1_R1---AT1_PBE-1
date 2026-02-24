import express from 'express';
import routes from './routes/routes.js';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 8000;

//middleware para aceitar o xml nas requiçoes

app.use(express.json());;
app.use('/', routes);

app.listen(PORT, ()=>{
    console.log(`servidor rodando em http://localhost:${PORT}`);
})
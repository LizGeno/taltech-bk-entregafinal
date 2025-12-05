import express from 'express';
import cors from 'cors';
import 'dotenv/config'; 
import productsRoutes from './src/routes/product.router.js'
import authRoutes from './src/routes/auth.routes.js'

//instancia de la app
const app = express();
const PORT= process.env.PORT || 3005; 

//middlewares
app.use(cors());
app.use(express.json());

//Rutas
app.use('/api/products', productsRoutes);
app.use('/auth', authRoutes);

//Manejo de errores
app.use((req,res,next) =>{
    res.status(404).json({
        error:"Not found", 
        message:`La ruta ${req.originalUrl}no existe en este servidor `
        }); //nunca use req.originalUrl (se debe configurar?)
});

//encender el server
app.listen(PORT, ()=>{
    console.log(`Servidor listo en http://localhost${PORT}`);
});
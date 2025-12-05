import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const authMiddleware = (req,res,next)=>{
    // const authHeader = req.headers.authorization;
    // if(!authHeader){
    //     return res.status(401).json({
    //         message: "no hay token, autorización denegada"
    //     });
    // }
    // const token = authHeader.split(' ')[1];

    const token = req.headers['authorization']?.split(" ")[1];
    
    if(!token){
        return res.status(401).json({
            message: "No autorizado (Falta token)"
        });
    }
    
    //Verificar firma
    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    }catch(error){
        return res.status(403).json({
            message: "token inválido o expirado"
        });
    }
};
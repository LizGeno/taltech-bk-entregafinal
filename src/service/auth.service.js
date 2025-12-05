import { userModel } from '../models/user.model.js';
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken';
import 'dotenv/config';


// FUNCION REGISTRO
export const registerService = async (email, password) => {
    
    // verif si exist user
    const userExistente = await userModel.findOneByEmail(email);
    if (userExistente) {
        throw new Error("El email ya está registrado");
    }

    // encriptar
    const passwordHash = await bcrypt.hash(password, 10);

    // preparar user
    const newUser = {
        email: email,
        password: passwordHash,
        role: "user" // rol por defecto
    };

    //GUARDAR EN BASE DE DATOS
    const newId = await userModel.create(newUser);

    // retornar datos limpios sin pass
    return {
        id: newId,
        email: newUser.email,
        role: newUser.role
    };
};

//FUNCION LOGIN
export const loginService = async (email,password)=> {
    
    const user = await userModel.findOneByEmail(email);
    
    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    // COMPARAR CONTRASEÑAS (Bcrypt)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Contraseña incorrecta");
    }

    // Generar el Token 
    const payload = { 
        email: user.email, 
        role: user.role, 
        id: user.id 
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '2h' });

    return { 
        token, 
        user: { email: user.email } 
    };
};
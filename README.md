# Proyecto Final: API REST - Gestión de Productos
### Backend desarrollado con Node.js, Express y Firebase (Firestore)


Backend desarrollado como proyecto final para el curso de Backend- Node.js. Esta API permite gestionar un inventario de productos (CRUD) y cuenta con un sistema de autenticación.

**Deploy en Vercel:** https://taltech-bk-entregafinal.vercel.app

---

## 🛠️ Tecnologías Utilizadas

* **Node.js** & **Express**: Servidor y manejo de rutas.
* **Firebase (Firestore)**: Base de datos NoSQL en la nube.
* **JWT (JSON Web Token)**: Seguridad y manejo de sesiones.
* **Bcryptjs**: Encriptación de contraseñas (Hashing).
* **Vercel**: Despliegue en la nube.

---

## 🔐 Guía de Pruebas (Authentication Flow)

Para probar las rutas protegidas (Crear, Editar, Borrar), es necesario seguir este flujo de autenticación, ya que la API protege estos endpoints con un Middleware.

### 1. Registro (Crear Usuario)
Como no hay usuarios pre-cargados, el evaluador debe registrarse primero.

* **Método:** `POST`
* **Endpoint:** `/auth/register`
* **Body (JSON):**

 `{
  "email": "profe@test.com",
  "password": "1234"
}`

---
### 2. Login (Obtener Token)
Una vez registrado, inicie sesión para obtener el Token de Acceso.
* **Método:** `POST`
* **Endpoint:** `/auth/login`
* **Body (JSON):** `(Mismos datos que en el registro)`
* **Respuesta:** Recibirá un objeto con el campo "token". Copie este token.

### 3. Uso (Rutas Protegidas)
Para usar las rutas de productos (POST, PUT, DELETE), debe incluir el token en la cabecera de la petición (En Thunder Client: Pestaña Auth -> Bearer Token).

---
##  Documentación de Endpoints
### 🛒 Productos

| Método | Endpoint | Descripción | Acceso |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/products` | Obtener todos los productos. | Público |
| **GET** | `/api/products/:id` | Obtener un producto por ID. | Público |
| **POST** | `/api/products/create` | Crear un nuevo producto. | **Privado (Token)** |
| **PUT** | `/api/products/:id` | Actualizar un producto. | **Privado (Token)** |
| **DELETE** | `/api/products/:id` | Eliminar un producto. | **Privado (Token)** |

### Ejemplo de Body para Productos (POST/PUT):
{
  "nombre": "Mouse Gamer",
  "precio": 5500,
  "stock": 10,
  "categoria": "Periféricos"
}

---
## ⚙️ Configuración Local (Variables de Entorno)
Si desea correr este proyecto localmente, necesita crear un archivo .env basado en el archivo .env-example provisto.

---
* **Autor:** María Elizabeth Genó                      
* **Curso:** TalentoTech Backend



# Gestor de Tareas (To-Do App)

Proyecto simple de gestor de tareas usando:

- **Backend:** Flask + MySQL
- **Frontend:** React + Axios

## Pasos para ejecutar el proyecto:
## 0. Copie este repositorio 

### 1. Configura la base de datos MySQL
Ejecuta el script `database.sql` en tu servidor MySQL para crear la base de datos y las tablas necesarias.

### 2. Inicia el Backend (Flask)
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### 3. Inicia el Frontend (React)
```bash
cd frontend
npx create-react-app frontend
npm install axios
Antes de iniciar copiar el archivo App.jsx a frontend/src y rempalzar el archivo App.jsx que está allí
npm start
```

> Nota: El backend usa `localhost:5000` como API, asegúrate de que ambos corran localmente.

## Funciones básicas:

- Listar tareas por usuario (usuario_id = 1)
- Agregar tareas para el usuario 1



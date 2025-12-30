# Quiz App — Next.js + Prisma + Mysql

Aplicación de quizzes construida con Next.js (App Router), Prisma y MariaDB.  
Este README explica **cómo ejecutar el proyecto desde cero paso a paso**, incluyendo todos los scripts disponibles.

---

## 🧰 Requisitos

| Herramienta | Versión recomendada       |
| ----------- | ------------------------- |
| Node.js     | ≥ 20.x                    |
| npm         | ≥ 10.x                    |
| Mysql       | ≥ 8.0 o MySQL equivalente |

---

## 🚀 1. Clonar & preparar variables

### 1) Clonar repositorio

git clone https://github.com/neilsanchezdev/quiz-app
cd quiz-app

### 2) Instalar dependencias

npm install

### 3) Crear archivo de variables de entorno

cp .env.example .env

### 4) Editar .env con tu configuración

```
DATABASE_URL="mysql://user:password@host:port/dbname"
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=
DATABASE_NAME=quiz_db
```

### 5) Crear base de datos en MySQL

mysql -u root -p -e "CREATE DATABASE quiz_db;"

### 6) Generar cliente Prisma basado en schema

npm run db:generate

#### 7) Crear tablas en la base de datos según schema actual

npm run db:push

### 8) Crear archivo de migración inicial (opcional pero recomendado)

npm run db:migrate

### 9) (Opcional) Llenar la bd con quizzes

npm run db:seed

### 10) (Opcional) Abrir Prisma Studio para ver la BD

npm run db:studio

### 11) Iniciar servidor de desarrollo

npm run dev

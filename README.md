
# 🏦 Banco Falabella — Proyecto Full Stack

> Clon funcional del portal **Banco Falabella Perú** con autenticación real contra base de datos **Supabase (PostgreSQL)**.  
> Desarrollado como proyecto académico para el curso de Desarrollo Web.

---

## 📋 Tabla de Contenidos

- [🛠 Tecnologías](#-tecnologías)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [📦 Requisitos Previos](#-requisitos-previos)
- [⚙️ Instalación](#️-instalación)
- [🗄 Configuración de Base de Datos](#-configuración-de-base-de-datos)
- [🚀 Ejecución](#-ejecución)
- [🎯 Flujo de la Aplicación](#-flujo-de-la-aplicación)
- [🔌 API Endpoints](#-api-endpoints)
- [🔑 Credenciales de Prueba](#-credenciales-de-prueba)
- [📸 Capturas de Pantalla](#-capturas-de-pantalla)

---

## 🛠 Tecnologías

| Capa | Tecnología | Versión |
|------|------------|----------|
| **Backend** | Java + Spring Boot | 21 + 4.0.6 |
| **Frontend** | React + Vite | 19 + 6 |
| **Base de Datos** | PostgreSQL (Supabase) | 15 |
| **Estilos** | CSS Modules | — |
| **Routing** | React Router DOM | 7 |
| **HTTP Client** | Axios | 1.7 |
| **Build Tool** | Maven | 3.9 |

---

## 📁 Estructura del Proyecto

```plaintext
falabella-proyecto/
├── .gitignore
├── README.md
│
├── backend/
│   ├── pom.xml
│   └── src/
│       └── main/
│           ├── java/com/falabella/backend/
│           │   ├── BackendApplication.java
│           │   ├── controller/
│           │   │   └── AuthController.java
│           │   ├── dto/
│           │   │   ├── AuthResponse.java
│           │   │   └── LoginRequest.java
│           │   ├── model/
│           │   │   └── Usuario.java
│           │   └── repository/
│           │       └── UsuarioRepository.java
│           │
│           └── resources/
│               └── application.properties
│
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    │
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        │
        ├── components/
        │   ├── Header/
        │   │   ├── Header.jsx
        │   │   └── Header.css
        │   │
        │   ├── HeroCarousel/
        │   │   ├── HeroCarousel.jsx
        │   │   └── HeroCarousel.css
        │   │
        │   ├── LoginDropdown/
        │   │   ├── LoginDropdown.jsx
        │   │   └── LoginDropdown.css
        │   │
        │   └── Footer/
        │       ├── Footer.jsx
        │       └── Footer.css
        │
        └── pages/
            ├── Home/
            │   ├── Home.jsx
            │   └── Home.css
            │
            └── Dashboard/
                ├── Dashboard.jsx
                └── Dashboard.css
```

---

## 📦 Requisitos Previos

Antes de empezar, asegúrate de tener instalado:

| Software | Versión | Verificación |
|----------|----------|--------------|
| **Java JDK** | 21+ | `java -version` |
| **Maven** | 3.9+ | `mvn -v` |
| **Node.js** | 20+ | `node -v` |
| **npm** | 10+ | `npm -v` |

---

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/AntoniRaul/falabella-proyecto.git

cd falabella-proyecto
```

### 2. Instalar dependencias del Frontend

```bash
cd frontend

npm install

cd ..
```

---

## 🗄 Configuración de Base de Datos

### 1. Crear proyecto en Supabase

- Crea una cuenta en Supabase
- Crea un nuevo proyecto llamado **Falabella**
- Ve a **SQL Editor**
- Ejecuta el siguiente script:

```sql
-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS public.usuarios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

    tipo_documento VARCHAR(20) NOT NULL
    CHECK (tipo_documento IN ('DNI', 'Carnet Extranjería')),

    numero_documento VARCHAR(20) NOT NULL UNIQUE,

    nombre_completo VARCHAR(100) NOT NULL,

    email VARCHAR(100) NOT NULL UNIQUE,

    clave_internet VARCHAR(100) NOT NULL,

    saldo DECIMAL(12,2) DEFAULT 0.00,

    producto_principal VARCHAR(50) DEFAULT 'Cuenta Ahorro',

    created_at TIMESTAMP WITH TIME ZONE
    DEFAULT timezone('utc'::text, now())
);

-- Índice para login
CREATE INDEX idx_usuarios_login
ON public.usuarios(tipo_documento, numero_documento);

-- Datos de prueba
INSERT INTO public.usuarios (
    tipo_documento,
    numero_documento,
    nombre_completo,
    email,
    clave_internet,
    saldo,
    producto_principal
) VALUES
(
    'DNI',
    '12345678',
    'Juan Pérez García',
    'juan.perez@email.com',
    'clave123',
    4850.50,
    'Cuenta Sueldo'
),
(
    'DNI',
    '87654321',
    'María López Torres',
    'maria.lopez@email.com',
    'pass456',
    12300.00,
    'Cuenta Ahorro'
),
(
    'Carnet Extranjería',
    '0011223344',
    'Carlos Ruiz Mendoza',
    'carlos.ruiz@email.com',
    'ext789',
    750.00,
    'Cuenta Corriente'
);

-- Política RLS (solo desarrollo académico)
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations"
ON public.usuarios
FOR ALL
USING (true)
WITH CHECK (true);
```

---

### 2. Configurar `application.properties`

Copia el Connection String de PostgreSQL:

**Supabase → Settings → Database → URI**

Luego pégalo en:

```plaintext
backend/src/main/resources/application.properties
```

```properties
spring.datasource.url=jdbc:postgresql://db.XXXXXXXX.supabase.co:5432/postgres

spring.datasource.username=postgres

spring.datasource.password=TU_PASSWORD_AQUI

spring.datasource.driver-class-name=org.postgresql.Driver

spring.jpa.hibernate.ddl-auto=validate

spring.jpa.show-sql=true

spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

server.port=8080
```

---

## 🚀 Ejecución

## Opción A — Script Automático (Recomendado)

### Crear `start.sh`

```bash
#!/bin/bash

echo "🚀 Iniciando Banco Falabella - Full Stack"

cd backend && mvn spring-boot:run &

cd ../frontend && npm run dev &

echo "✅ Backend:  http://localhost:8080"

echo "✅ Frontend: http://localhost:5173"

echo "Presiona Ctrl+C para detener ambos"

wait
```

### Dar permisos y ejecutar

```bash
chmod +x start.sh

./start.sh
```

---

## Opción B — Manual (Dos Terminales)

### Terminal 1 — Backend

```bash
cd backend

mvn spring-boot:run
```

Esperar:

```plaintext
Tomcat started on port(s): 8080
```

---

### Terminal 2 — Frontend

```bash
cd frontend

npm run dev
```

Esperar:

```plaintext
VITE v6.x ready in ...

http://localhost:5173
```

---

## 🌐 Acceso

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8080 |
| Login | POST http://localhost:8080/api/auth/login |
| Perfil | GET http://localhost:8080/api/auth/me?id={uuid} |

---

## 🎯 Flujo de la Aplicación

```plaintext
┌─────────────┐     Click "Banca Internet"     ┌─────────────────┐
│   Home      │ ─────────────────────────────→ │  Login Inline   │
│   ( / )     │                                │    (Header)     │
└─────────────┘                                └─────────────────┘
                                                      │
                              ┌───────────────────────┘
                              ▼
                       ┌─────────────┐
                       │ POST /api/  │
                       │ auth/login  │
                       └─────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼                               ▼
        ┌─────────────┐                 ┌─────────────┐
        │  ✅ Éxito   │                 │  ❌ Error   │
        │  (200 OK)   │                 │ (401 ERROR) │
        └─────────────┘                 └─────────────┘
              │                               │
              ▼                               ▼
        ┌─────────────┐                 ┌─────────────┐
        │ Dashboard   │                 │ Mensaje     │
        │ /dashboard  │                 │ rojo login  │
        └─────────────┘                 └─────────────┘
```

---

## 🔌 API Endpoints

## POST `/api/auth/login`

Autentica un usuario.

### Request

```json
{
  "tipoDocumento": "DNI",
  "numeroDocumento": "12345678",
  "claveInternet": "clave123"
}
```

### Response — 200 OK

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "nombreCompleto": "Juan Pérez García",
  "email": "juan.perez@email.com",
  "tipoDocumento": "DNI",
  "numeroDocumento": "12345678",
  "saldo": 4850.50,
  "productoPrincipal": "Cuenta Sueldo",
  "token": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
}
```

### Response — 401 Unauthorized

```plaintext
Credenciales incorrectas
```

---

## GET `/api/auth/me?id={uuid}`

Obtiene el perfil del usuario.

### Response — 200 OK

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "nombreCompleto": "Juan Pérez García",
  "email": "juan.perez@email.com",
  "tipoDocumento": "DNI",
  "numeroDocumento": "12345678",
  "saldo": 4850.50,
  "productoPrincipal": "Cuenta Sueldo"
}
```

### Response — 404 Not Found

```plaintext
Usuario no encontrado
```

---

## 🔑 Credenciales de Prueba

| Tipo Documento | Número | Clave | Usuario | Saldo | Producto |
|---|---|---|---|---|---|
| DNI | 12345678 | clave123 | Juan Pérez García | S/ 4,850.50 | Cuenta Sueldo |
| DNI | 87654321 | pass456 | María López Torres | S/ 12,300.00 | Cuenta Ahorro |
| Carnet Extranjería | 0011223344 | ext789 | Carlos Ruiz Mendoza | S/ 750.00 | Cuenta Corriente |

---

## 📸 Capturas de Pantalla

Agrega aquí las capturas del flujo:

| # | Pantalla | Descripción |
|---|---|---|
| 1 | Home | Branding Falabella + botón Banca Internet |
| 2 | Login | Formulario DNI/Carnet + Clave Internet |
| 3 | Login correcto | Redirección al Dashboard |
| 4 | Dashboard | Saldo, producto y documento |
| 5 | Login incorrecto | Mensaje de error |
| 6 | Supabase | Tabla usuarios con datos |

---

## ⚠️ Nota

Este proyecto es de carácter académico.

Las contraseñas están almacenadas en texto plano únicamente con fines demostrativos.  
En un entorno real se recomienda utilizar:

- BCrypt para hashing
- JWT para autenticación
- Variables de entorno
- HTTPS
- Validación y sanitización de datos

---

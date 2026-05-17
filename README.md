cd ~/Idea_Projects/Falabella

cat > README.md << 'EOF'
# 🏦 Banco Falabella — Proyecto Full Stack

> Clon funcional del portal **Banco Falabella Perú** con autenticación real contra base de datos **Supabase (PostgreSQL)**.
> Desarrollado como proyecto académico para el curso de Desarrollo Web.

---

## 📋 Tabla de Contenidos

- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecución](#-ejecución)
- [Flujo de la Aplicación](#-flujo-de-la-aplicación)
- [API Endpoints](#-api-endpoints)
- [Credenciales de Prueba](#-credenciales-de-prueba)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Autor](#-autor)

---

## 🛠 Tecnologías

| Capa | Tecnología | Versión |
|------|-----------|---------|
| **Backend** | Java + Spring Boot | 21 + 4.0.6 |
| **Frontend** | React + Vite | 19 + 6 |
| **Base de Datos** | PostgreSQL (Supabase) | 15 |
| **Estilos** | CSS Modules | — |
| **Routing** | React Router DOM | 7 |
| **HTTP Client** | Axios | 1.7 |
| **Build Tool** | Maven | 3.9 |

---

## 📁 Estructura del Proyecto

```text
falabella-proyecto/
├── .gitignore              # Exclusiones de Git
├── README.md               # Este archivo
│
├── backend/                # API REST con Spring Boot
│   ├── pom.xml             # Dependencias Maven
│   └── src/
│       └── main/
│           ├── java/com/falabella/backend/
│           │   ├── BackendApplication.java
│           │   ├── controller/
│           │   │   └── AuthController.java      # Endpoints /login y /me
│           │   ├── dto/
│           │   │   ├── AuthResponse.java      # Respuesta de autenticación
│           │   │   └── LoginRequest.java        # Payload de login
│           │   ├── model/
│           │   │   └── Usuario.java             # Entidad JPA
│           │   └── repository/
│           │       └── UsuarioRepository.java   # Acceso a datos
│           └── resources/
│               └── application.properties       # Configuración BD
│
└── frontend/               # Aplicación React
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx        # Punto de entrada
        ├── App.jsx         # Rutas principales
        ├── index.css       # Estilos globales + variables CSS
        │
        ├── components/     # Componentes reutilizables
        │   ├── Header/
        │   │   ├── Header.jsx      # Header con logo + navegación + login inline
        │   │   └── Header.css
        │   ├── HeroCarousel/
        │   │   ├── HeroCarousel.jsx  # Carrusel de promociones
        │   │   └── HeroCarousel.css
        │   ├── LoginDropdown/
        │   │   ├── LoginDropdown.jsx # Formulario de login (modal)
        │   │   └── LoginDropdown.css
        │   └── Footer/
        │       ├── Footer.jsx
        │       └── Footer.css
        │
        └── pages/          # Vistas principales
            ├── Home/
            │   ├── Home.jsx    # Página de inicio
            │   └── Home.css
            └── Dashboard/
                ├── Dashboard.jsx  # Panel del usuario autenticado
                └── Dashboard.css

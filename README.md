# FepTech – Fep X1 Pro Series | Landing Page 3D

---

## 1️⃣ Información General

| Campo | Detalle |
|---|---|
| *Nombre del Proyecto* | FepTech – Fep X1 Pro Series Landing Page |
| *Estudiante* | Fernando Epieyu Pushaina |
| *Fecha* | 28 de febrero de 2026 |
| *Curso* | Calidad Servicio de Software 3 |

---

## 2️⃣ Descripción del Proyecto

### ¿Qué hace el proyecto?

*FepTech* es una Landing Page interactiva que presenta el smartphone ficticio *Fep X1 Pro Series*, con modelo 3D en tiempo real, selector de colores dinámico y navegación entre secciones de producto.

El sitio incluye:
- Modelo 3D interactivo del dispositivo Fep X1
- Selector dinámico de 5 colores con cambio en tiempo real
- Navegación entre secciones: FepPods, FepBand, Diademas, FepSwitch, Specs, Contacto
- Botones de acción: "Comprar ahora" y "Especificaciones"
- Diseño oscuro premium estilo Apple Event
- Indicador de scroll animado

---

### ¿Qué problema soluciona?

Demuestra cómo una empresa tecnológica puede presentar sus productos de forma *visual, moderna e impactante*, superando las limitaciones de una página estática tradicional.

---

### ¿Para quién está pensado?


- Empresas de tecnología y manufactura de dispositivos
- Startups digitales que quieran presentar productos
- Agencias de marketing digital
- Portafolio profesional de desarrollador frontend

---

## 3️⃣ Tecnologías Utilizadas

| Tecnología | Uso |
|---|---|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) | Estructura del contenido |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) | Estilos base |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat&logo=tailwindcss&logoColor=white) | Sistema de diseño utilitario |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | Lógica e interactividad |
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black) | Componentes y estados |
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white) | Framework de producción |
| ![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat&logo=three.js&logoColor=white) | Motor de gráficos 3D |
| ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white) | Control de versiones |
| ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white) | Repositorio remoto |
| ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat&logo=netlify&logoColor=white) | Deploy en producción |

---

## 4️⃣ Estructura del Proyecto

    /feptech-landing
    ├── app/
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   ├── HeroSection.tsx
    │   ├── Navbar.tsx
    │   └── ColorPicker.tsx
    ├── public/
    │   └── images/
    ├── styles/
    │   └── globals.css
    ├── package.json
    ├── tailwind.config.js
    └── README.md

### Descripción de carpetas

- *app/* → Configuración principal con el App Router de Next.js
- *components/* → Componentes reutilizables: hero, navbar y selector de colores
- *public/* → Imágenes estáticas del proyecto
- *styles/* → Estilos globales con fondo oscuro y variables de color
- *package.json* → Dependencias: React, Three.js, Tailwind, etc.

---

## 5️⃣ Funcionalidades

| # | Funcionalidad | Descripción |
|---|---|---|
| 1 | *Modelo 3D interactivo* | Smartphone Fep X1 renderizado con Three.js en tiempo real |
| 2 | *Selector de 5 colores* | Azul, blanco, cyan, rosa y verde con cambio animado |
| 3 | *Navbar multi-sección* | Links a FepPods, FepBand, Diademas, FepSwitch, Specs y Contacto |
| 4 | *Botón Comprar ahora* | CTA principal con estilo destacado |
| 5 | *Sección Especificaciones* | Acceso directo a specs técnicas del dispositivo |
| 6 | *Diseño responsivo* | Compatible con móvil, tablet y escritorio |
| 7 | *Indicador de scroll animado* | Guía visual para continuar explorando la página |

---

## 6️⃣ Capturas de Pantalla

### Vista Principal – Hero Section
![Vista Principal](public/images/![Uploading imagen<img <img width="959" height="527" alt="imagen2" src="https://github.com/user-attachments/assets/9107e435-4f64-41ba-a81d-90e81bc04964" />
 />
2.png…]()
inicio.png)

### Selector de Color Activo
![Selector de Color](public/images/colo<img width="957" height="490" alt="imagen 3" src="https://github.com/user-attachments/assets/ea8c6332-6e62-47a9-9b57-f2556ee182f2" />
res.png)

### Modelo 3D del Fep X1
![Vista 3D](public/images/modelo3d.p<img width="287" height="397" alt="imagen 4" src="https://github.com/user-attachments/assets/585a9489-c526-4f92-8290-de18233377a9" />
ng)

---

## 7️⃣ Cómo Ejecutar el Proyecto
bash
# 1. Clonar el repositorio
git clone https://github.com/tuusuario/feptech-landing.git

# 2. Entrar en la carpeta
cd feptech-landing

# 3. Instalar dependencias
npm install

# 4. Ejecutar el servidor de desarrollo
npm run dev


Abrir en el navegador: http://localhost:8080

---

## 8️⃣ Mejoras Futuras

- [ ] Agregar secciones completas de FepPods, FepBand y Diademas
- [ ] Implementar vista trasera del Fep X1 con animación de volteo
- [ ] Añadir animación de componentes internos (exploded view)
- [ ] Optimización de rendimiento para móviles de gama baja
- [ ] Integración con backend para sistema de preorden real
- [ ] Agregar modo claro / modo oscuro

---

## 🤖 Uso de Inteligencia Artificial

Se utilizó IA como herramienta de apoyo para:
- Generar ideas de funcionalidades y estructura visual
- Mejorar y optimizar estilos con Tailwind CSS
- Organizar y redactar esta documentación
- Corregir errores técnicos durante el desarrollo

> ⚠️ Todo el código fue revisado, comprendido y adaptado manualmente.

---

## 📄 Licencia

Proyecto académico – Calidad Servicio de Software 3  
© 2026 Fernando Epieyu Pushaina – Todos los derechos reservados.

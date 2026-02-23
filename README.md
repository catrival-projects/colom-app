# Colom App 🇨🇴

[![English](https://img.shields.io/badge/lang-en-red.svg)](#english)
[![Español](https://img.shields.io/badge/lang-es-yellow.svg)](#español)

---

<a name="english"></a>

## 🇺🇸 English

A modern web application built with **Next.js** to explore information about Colombia, using the [API Colombia](https://api-colombia.com/).

### 📸 Screenshots

_(Add your screenshots here)_
![Main Dashboard](![alt text](image.png))
![Data View](https://via.placeholder.com/800x450?text=Data+View+Placeholder)

### 🛠️ Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [Radix UI](https://www.radix-ui.com/), [Shadcn UI](https://ui.shadcn.com/)
- **Icons:** [Phosphor Icons](https://phosphoricons.com/)
- **Table:** [TanStack Table](https://tanstack.com/table)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) with Persistence

### 🚀 Getting Started

#### Prerequisites

- Node.js (Latest LTS recommended)
- npm / yarn / pnpm

#### Environment Variables

Create a `.env.local` file in the root directory and add:

```bash
NEXT_PUBLIC_API_COLOMBIA_URL=https://api-colombia.com/api/v1
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

> [!IMPORTANT]
> Google Maps keys must use the `NEXT_PUBLIC_` prefix to be available on the client side.

#### Installation & Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### 📜 Available Scripts

- `npm run dev`: Starts the development server with Turbopack.
- `npm run build`: Creates an optimized production build.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to find code issues.
- `npm run lint:fix`: Automatically fixes ESLint issues.
- `npm run format`: Formats code using Prettier.
- `npm run validate`: Runs both format check and linting.

---

<a name="español"></a>

## 🇪🇸 Español

Una aplicación web moderna construida con **Next.js** para explorar información sobre Colombia, utilizando la [API Colombia](https://api-colombia.com/).

### 📸 Pantallazos

_(Agrega tus capturas de pantalla aquí)_
![Panel Principal](https://via.placeholder.com/800x450?text=Marcador+de+Posicion+Panel+Principal)
![Vista de Datos](https://via.placeholder.com/800x450?text=Marcador+de+Posicion+Vista+de+Datos)

### 🛠️ Tecnologías

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes:** [Radix UI](https://www.radix-ui.com/), [Shadcn UI](https://ui.shadcn.com/)
- **Iconos:** [Phosphor Icons](https://phosphoricons.com/)
- **Tablas:** [TanStack Table](https://tanstack.com/table)
- **Gestión de Estado:** [Zustand](https://zustand-demo.pmnd.rs/) con Persistencia

### 🚀 Configuración Inicial

#### Requisitos

- Node.js (Última versión LTS recomendada)
- npm / yarn / pnpm

#### Variables de Entorno

Crea un archivo `.env.local` en el directorio raíz y añade:

```bash
NEXT_PUBLIC_API_COLOMBIA_URL=https://api-colombia.com/api/v1
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_clave_de_google_maps_aqui
```

> [!IMPORTANT]
> Las claves de Google Maps deben usar el prefijo `NEXT_PUBLIC_` para estar disponibles en el cliente.

#### Instalación y Desarrollo

1. Clona el repositorio
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

### 📜 Comandos Disponibles

- `npm run dev`: Inicia el servidor de desarrollo con Turbopack.
- `npm run build`: Crea una versión optimizada para producción.
- `npm run start`: Inicia el servidor de producción.
- `npm run lint`: Ejecuta ESLint para encontrar problemas en el código.
- `npm run lint:fix`: Corrige automáticamente los problemas de ESLint.
- `npm run format`: Formatea el código usando Prettier.
- `npm run validate`: Ejecuta la verificación de formato y el linting.

### ⚙️ Configuración Adicional

El proyecto incluye configuraciones específicas en `next.config.ts` para permitir imágenes de:

- `images.unsplash.com`
- `apicolombiastorage.blob.core.windows.net`
- `upload.wikimedia.org`

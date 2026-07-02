import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev
export default defineConfig({
  plugins: [react()],

  // 1. CONFIGURACIÓN DE DESARROLLO (Corrige el congelamiento)
  server: {
    watch: {
      usePolling: true, // Obliga a Vite a vigilar activamente los archivos en Windows
      interval: 100, // Revisa si guardaste cambios cada 100 milisegundos
    },
  },

  // 2. CONFIGURACIÓN DE PRODUCCIÓN (Tus optimizaciones existentes)
  build: {
    // Optimización del empaquetado de dependencias pesadas
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Separa las librerías del core de React
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom")
          ) {
            return "react-core";
          }
          // Separa las librerías de animaciones pesadas como Framer Motion o Atropos
          if (
            id.includes("node_modules/framer-motion") ||
            id.includes("node_modules/atropos")
          ) {
            return "animations-vendor";
          }
          // Agrupa el resto de utilidades generales de node_modules
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
    // Limita el tamaño de alerta de trozos a 1000kb
    chunkSizeWarningLimit: 1000,
  },
});

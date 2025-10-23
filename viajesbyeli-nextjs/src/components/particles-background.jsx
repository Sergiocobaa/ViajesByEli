// src/components/particles-background.jsx
"use client";

import React, { useCallback, useMemo } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // O loadFull para más efectos

function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // console.log("Particles container loaded", container);
  }, []);

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#000000", // Asegura un fondo negro si los particles no cubren
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: false, // Puedes habilitar si quieres interactividad al click
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse", // Repulse es similar al efecto de Skal
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 100, // Distancia de repulsión
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff", // Color de las partículas (blanco o gris claro)
        },
        links: {
          color: "#4a4a4a", // Color de los enlaces entre partículas
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        collisions: {
          enable: true,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1, // Velocidad de movimiento
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 80, // Número de partículas
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 }, // Tamaño de las partículas
        },
      },
      detectRetina: true,
    }),
    [],
  );

  return <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={options} />;
}

export default ParticlesBackground;
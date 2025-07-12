// src/components/MapChart.tsx
import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import events from "@/data/events.json";

const geoUrl =
  "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson";

interface MapChartProps {
  onMarkerClick?: (idx: number) => void;
  selectedEvent?: number | null;
  selectedState: string | null;
  setSelectedState: (state: string | null) => void;
}

export function MapChart({ 
  selectedState, 
  setSelectedState 
}: MapChartProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  // Estados que possuem eventos
  const statesWithEvents = Array.from(
    new Set(events.map(e => e.state).filter(Boolean))
  );

  const handleStateClick = (stateSigla: string) => {
    const isSelected = selectedState === stateSigla;
    setSelectedState(isSelected ? null : stateSigla);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ 
          center: [-55, -15], // Centralizado no Brasil
          scale: 1000 // Escala menor para caber melhor
        }}
        width={800}
        height={800}
        style={{ width: "100%", height: "auto", maxHeight: "200vh" }}
      >
        {/* Definição do filtro para o efeito de radar */}
        <defs>
          <filter id="radar" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateSigla = geo.properties.sigla || geo.properties.UF;
              const hasEvent = statesWithEvents.includes(stateSigla);
              const isSelected = selectedState === stateSigla;
              const isHovered = hoveredState === stateSigla;

              // Nova lógica de cores para o comportamento solicitado
              let fillColor = "#1e2939"; // Cor padrão para estados sem eventos
              let opacity = 1;
              
              if (selectedState) {
                // Quando um estado está selecionado
                if (isSelected) {
                  // Estado selecionado - destaque máximo
                  fillColor = "#3B82F6"; // Azul brilhante
                } else {
                  // Outros estados - cor neutra desbotada
                  fillColor = "#1e2939"; // Cor padrão do mapa
                  opacity = 0.3; // Mais desbotado
                }
              } else {
                // Quando nenhum estado está selecionado - comportamento normal
                if (isHovered && hasEvent) {
                  fillColor = "#437ac6"; // Mais claro no hover (só se tem evento)
                } else if (hasEvent) {
                  fillColor = "#2258a1"; // Cor para estados com eventos
                }
              }

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  className="geography"
                  fill={fillColor}
                  stroke="#121212"
                  strokeWidth={0.5}
                  style={{
                    outline: "none",
                    cursor: hasEvent ? "pointer" : "default",
                    transition: "fill 0.2s ease-in-out, transform 0.1s ease, opacity 0.2s ease-in-out",
                    transform: isHovered && hasEvent ? "scale(1.02)" : "scale(1)",
                    transformOrigin: "center",
                    opacity: opacity,
                    // Brilho adicional apenas para estados com eventos quando não há seleção
                    filter: hasEvent && !selectedState ? "brightness(1.3)" : "none",
                  }}
                  onClick={() => hasEvent && handleStateClick(stateSigla)}
                  onMouseEnter={() => hasEvent && setHoveredState(stateSigla)}
                  onMouseLeave={() => setHoveredState(null)}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}

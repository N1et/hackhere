// src/pages/index.tsx
import { useState, useRef } from "react";
import Head from "next/head";
import { MapChart } from "@/components/MapChart";
import events from "@/data/events.json";
import "@/app/globals.css";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mapeamento de siglas para nomes dos estados
  const stateNames: { [key: string]: string } = {
    'AC': 'Acre',
    'AL': 'Alagoas', 
    'AP': 'Amapá',
    'AM': 'Amazonas',
    'BA': 'Bahia',
    'CE': 'Ceará',
    'DF': 'Distrito Federal',
    'ES': 'Espírito Santo',
    'GO': 'Goiás',
    'MA': 'Maranhão',
    'MT': 'Mato Grosso',
    'MS': 'Mato Grosso do Sul',
    'MG': 'Minas Gerais',
    'PA': 'Pará',
    'PB': 'Paraíba',
    'PR': 'Paraná',
    'PE': 'Pernambuco',
    'PI': 'Piauí',
    'RJ': 'Rio de Janeiro',
    'RN': 'Rio Grande do Norte',
    'RS': 'Rio Grande do Sul',
    'RO': 'Rondônia',
    'RR': 'Roraima',
    'SC': 'Santa Catarina',
    'SP': 'São Paulo',
    'SE': 'Sergipe',
    'TO': 'Tocantins'
  };

  // Estados que possuem eventos (para o dropdown)
  const statesWithEvents = Array.from(
    new Set(events.map(e => e.state).filter(Boolean))
  ).sort();

  // Filtro por estado selecionado E termo de busca
  const filteredEvents = events.filter((event) =>
    (!selectedState || event.state === selectedState) &&
    event.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMarkerClick = (idx: number) => {
    setSelectedEvent(idx);
    eventRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleEventClick = (idx: number) => {
    setSelectedEvent(idx);
  };

  const clearStateFilter = () => {
    setSelectedState(null);
    setSelectedEvent(null);
  };

  const closeEventDetail = () => {
    setSelectedEvent(null);
  };

  // Evento selecionado para mostrar no card expandido
  const selectedEventData = selectedEvent !== null ? filteredEvents[selectedEvent] : null;

  // Função para formatar data (apenas mês e ano)
  const formatDate = (dateString: string) => {
    if (!dateString) return "Data a definir";
    
    // Se for formato YYYY-MM, adiciona o dia 01 para criar uma data válida
    const dateParts = dateString.split('-');
    if (dateParts.length === 2) {
      const [year, month] = dateParts;
      const date = new Date(parseInt(year), parseInt(month) - 1, 1);
      return date.toLocaleDateString("pt-BR", { 
        month: "long", 
        year: "numeric" 
      });
    }
    
    return "Data a definir";
  };

  return (
    <>
      <Head>
        <title>Mapa de Conferências de Segurança</title>
      </Head>
      <main className="bg-gray-950 h-screen flex flex-col overflow-hidden">
        {/* Header fixo no topo */}
        <header className="bg-gray-900 border-b border-[#232326] px-6 py-3 flex items-center justify-between flex-shrink-0">
          {/* Logo HACKHERE */}
          <div className="flex items-center">
            <svg 
              width="200" 
              height="40" 
              viewBox="0 0 200 40" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <text x="20" y="30" fill="oklch(70.7% .165 254.624)" fontSize="30" fontWeight="bold" fontFamily="Arial, sans-serif">
                Hack
              </text>
              <text x="92" y="30" fill="currentColor" fontSize="30" fontWeight="bold" fontFamily="Arial, sans-serif">
                Here
              </text>
            </svg>
          </div>

          {/* Título centralizado */}
          <div className="flex-1 text-center">
            <h1 className="text-lg font-bold text-white">Mapa de Conferências de Segurança da Informação no Brasil</h1>
          </div>

          {/* Espaço para equilibrar o layout */}
          <div className="w-[120px]"></div>
        </header>

        {/* Container principal */}
        <div className="flex flex-1 overflow-hidden relative">
          {/* Painel lateral ESQUERDO */}
          <aside className="w-96 border-r border-[#232326] text-white flex flex-col overflow-hidden shadow-lg flex-shrink-0">
            {/* Header fixo */}
            <div className="flex-shrink-0 bg-gray-900  px-6 py-4 border-b border-[#232326]">
              <h2 className="text-xl font-semibold mb-2">Conferências de Segurança</h2>
              <span className="block text-xs text-gray-400 mb-3">
                {filteredEvents.length} resultado{filteredEvents.length === 1 ? "" : "s"}
              </span>

              {/* Dropdown de filtro por estado */}
              <div className="mb-3">
                <select
                  value={selectedState || ""}
                  onChange={(e) => setSelectedState(e.target.value || null)}
                  className="w-full px-3 py-2 pr-10 rounded bg-gray-800 text-white border border-[#232326] focus:outline-none focus:border-blue-400 text-sm"
                >
                  <option value="">Todos os estados</option>
                  {statesWithEvents.map((stateCode) => (
                    <option key={stateCode} value={stateCode}>
                      {stateNames[stateCode]} ({stateCode})
                    </option>
                  ))}
                </select>
              </div>

              {/* Input de busca */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="🔍 Buscar"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 pr-10 rounded bg-gray-800 text-white border border-[#232326] focus:outline-none focus:border-blue-400 "
                />
                {/* Botão X para limpar busca */}
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                )}
              </div>

              {/* Indicador de filtro ativo */}
              {selectedState && (
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-blue-400">
                    Filtrado por: {stateNames[selectedState]}
                  </span>
                  <button
                    onClick={clearStateFilter}
                    className="text-gray-400 underline hover:text-blue-400 transition-colors"
                  >
                    Limpar filtro
                  </button>
                </div>
              )}
            </div>
            
            {/* Lista de eventos - scrollável internamente */}
            <div className="flex-1 overflow-y-auto bg-gray-900 ">
              <div className="space-y-4 px-6 py-4">
                {filteredEvents.map((event, idx) => (
                  <div
                    key={idx}
                    ref={(el) => (eventRefs.current[idx] = el)}
                    onClick={() => handleEventClick(idx)}
                    className={`cursor-pointer border border-slate-600 bg-gray-800 rounded-lg p-4 ring ring-gray-900/5 shadow-xl flex flex-col gap-1 transition-all focus:outline-none
                      ${idx === selectedEvent ? "bg-gray-800 brightness-150 ring-2 ring-blue-400" : "hover:bg-slate-700"}
                      hover:bg-gray-800  hover:brightness-120 `}
                  >
                    <span className="font-bold">{event.name}</span>
                    <span className="text-xs text-gray-400">
                      {event.approximate ? "Aproximado - " : ""}
                      {formatDate(event.date)}
                    </span>
                    <span className="text-xs text-gray-400">{event.city}, {event.state}</span>
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:underline w-fit"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Acessar evento
                    </a>
                    <span className="text-xs text-gray-400">{event.price}</span>
                  </div>
                ))}
                {filteredEvents.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-400 text-sm">
                      {selectedState 
                        ? `Nenhum evento encontrado em ${stateNames[selectedState]}`
                        : "Nenhum evento encontrado"
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Seção do mapa */}
          <section className="flex-1 flex flex-col overflow-hidden">
            {/* Container do mapa com centralização */}
            <div className="flex-1 flex items-center justify-center px-4 overflow-hidden">
              <div className="w-full max-w-4xl h-full">
                <MapChart 
                  onMarkerClick={handleMarkerClick} 
                  selectedEvent={selectedEvent}
                  selectedState={selectedState}
                  setSelectedState={setSelectedState}
                />
              </div>
            </div>
          </section>

          {/* Card de detalhes do evento - OVERLAY ABSOLUTO */}
          {selectedEventData && (
            <div className="absolute left-96 top-4 w-[28rem] bg-gray-800 border border-gray-700 text-white flex flex-col overflow-hidden shadow-2xl ml-4 my-4 rounded-lg z-50 min-h-[300px] max-h-[calc(100vh-6rem)]">
              {/* Header do card */}
              <div className="bg-gray-700 px-4 py-3 flex justify-between items-center flex-shrink-0 rounded-t-lg">
                <h3 className="text-white font-semibold text-lg truncate pr-2">{selectedEventData.name}</h3>
                <button
                  onClick={closeEventDetail}
                  className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>

              {/* Conteúdo do card */}
              <div className="p-4 text-white space-y-3 flex-1 overflow-y-auto">
                {/* Data */}
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400 flex-shrink-0">
                    <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                  </svg>
                  <span className="text-sm">
                    {formatDate(selectedEventData.date)}
                    {selectedEventData.approximate && <span className="text-gray-400 ml-1">(Aproximado)</span>}
                  </span>
                </div>

                {/* Localização */}
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-red-400 flex-shrink-0">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span className="text-sm">{selectedEventData.city}, {selectedEventData.state}</span>
                </div>

                {/* Preço */}
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-green-400 flex-shrink-0">
                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                  </svg>
                  <span className="text-sm">{selectedEventData.price}</span>
                </div>

                {/* Descrição */}
                {selectedEventData.description && (
                  <div>
                    <h4 className="font-semibold text-gray-300 mb-1">Descrição</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">{selectedEventData.description}</p>
                  </div>
                )}

                {/* Tags */}
                {selectedEventData.tags && selectedEventData.tags.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-300 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedEventData.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-blue-600 text-xs rounded-full text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Redes sociais */}
                {selectedEventData.socials && (
                  <div>
                    <h4 className="font-semibold text-gray-300 mb-2">Redes Sociais</h4>
                    <div className="flex gap-3 flex-wrap">
                      {selectedEventData.socials.twitter && (
                        <a
                          href={selectedEventData.socials.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                          </svg>
                          <span>Twitter</span>
                        </a>
                      )}
                      
                      {selectedEventData.socials.telegram && (
                        <a
                          href={selectedEventData.socials.telegram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.820 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                          </svg>
                          <span>Telegram</span>
                        </a>
                      )}
                      
                      {selectedEventData.socials.instagram && (
                        <a
                          href={selectedEventData.socials.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                          <span>Instagram</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Links */}
                <div className="pt-2">
                  <a
                    href={selectedEventData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                      <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
                    </svg>
                    <span>Acessar evento</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer fixo */}
        <footer className="flex-shrink-0 bg-gray-900 border-t border-[#232326] px-6 py-3">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <div>
              <span>Deseja contribuir? </span>
              <a 
                href="https://github.com/medeiros/mapa-sec-conf-br" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline transition-colors"
              >
                Acesse o GitHub
              </a>
            </div>
            <div>
              Made by <span className="text-white font-medium">Medeiros</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

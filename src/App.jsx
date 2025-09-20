import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

// Componente para injetar os estilos CSS diretamente no DOM.
const AppStyles = () => (
  <style>{`
    /* Importação de Fontes do Google */
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500&display=swap');

    /* Variáveis de Cores para o Tema */
    :root {
      --bg-color: #121212;
      --card-bg-color: rgba(26, 26, 26, 0.7);
      --border-color: rgba(255, 215, 0, 0.15);
      --accent-gold: #FFD700;
      --accent-gold-darker: #d4b106;
      --text-primary: #EAEAEA;
      --text-secondary: #A0A0A0;
      --shadow-color: rgba(255, 215, 0, 0.1);
    }

    /* Estilos Globais */
    body {
      margin: 0;
      background-color: var(--bg-color);
      background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23222222' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      color: var(--text-primary);
      font-family: 'Inter', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* Container Principal */
    .app-container {
      width: 100%;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      box-sizing: border-box;
    }

    /* Cartão Principal com Animação */
    .main-card {
      width: 100%;
      max-width: 640px;
      background-color: var(--card-bg-color);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      box-shadow: 0 10px 30px var(--shadow-color);
      padding: 2rem;
      animation: fadeIn 0.8s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Cabeçalho */
    .header {
      text-align: center;
      margin-bottom: 2rem;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 1.5rem;
    }

    .header-title {
      font-family: 'Playfair Display', serif;
      font-size: 3rem;
      font-weight: 700;
      color: var(--accent-gold);
      text-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
      margin: 0;
    }

    .header-subtitle {
      color: var(--text-secondary);
      font-size: 1rem;
      margin-top: 0.5rem;
    }

    /* Área de Resposta (Main) */
    .response-area {
      width: 100%;
      height: 24rem;
      background-color: transparent;
      border-radius: 8px;
      padding-right: 10px; /* Espaço para a scrollbar */
      margin-bottom: 1.5rem;
      overflow-y: auto;
    }

    /* Estilos para o conteúdo Markdown */
    .prose {
      color: var(--text-primary);
      line-height: 1.7;
      white-space: pre-wrap;
    }
    .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
      color: var(--accent-gold);
    }
    .prose strong {
      color: var(--text-primary);
      font-weight: 500;
    }
    .prose a {
      color: var(--accent-gold);
      text-decoration: none;
      border-bottom: 1px solid var(--accent-gold-darker);
      transition: color 0.3s, border-color 0.3s;
    }
    .prose a:hover {
      color: #fff;
      border-color: #fff;
    }
    .prose pre {
        background-color: rgba(0, 0, 0, 0.3);
        padding: 1rem;
        border-radius: 8px;
        margin: 1.5rem 0;
        overflow-x: auto;
        border: 1px solid var(--border-color);
    }
    .prose code {
        background-color: rgba(255, 215, 0, 0.1);
        color: var(--accent-gold);
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.9rem;
    }
    .prose pre code {
        background-color: transparent;
        color: inherit;
        padding: 0;
        border: none;
    }

    /* Área de Input */
    .input-container {
      position: relative;
    }

    .input-field {
      width: 100%;
      padding: 1rem;
      background-color: transparent;
      color: var(--text-primary);
      border-radius: 8px;
      border: 1px solid var(--border-color);
      font-size: 1rem;
      transition: all 0.3s ease;
      box-sizing: border-box;
    }

    .input-field::placeholder {
      color: var(--text-secondary);
    }

    .input-field:focus {
      outline: none;
      border-color: var(--accent-gold);
      box-shadow: 0 0 15px var(--shadow-color);
    }

    .input-field:disabled {
      opacity: 0.5;
    }

    /* Botão de Envio */
    .submit-button {
      position: absolute;
      top: 50%;
      right: 0.5rem;
      transform: translateY(-50%);
      padding: 0.6rem 1.25rem;
      border-radius: 6px;
      font-weight: 500;
      font-size: 0.9rem;
      transition: all 0.3s ease;
      border: 1px solid var(--accent-gold);
      cursor: pointer;
      background-color: var(--accent-gold);
      color: #000;
    }

    .submit-button:hover {
      background-color: var(--accent-gold-darker);
      border-color: var(--accent-gold-darker);
      box-shadow: 0 0 10px var(--shadow-color);
    }

    .submit-button:disabled {
      background-color: #333;
      border-color: #444;
      color: var(--text-secondary);
      cursor: not-allowed;
    }
    .submit-button:disabled:hover {
      box-shadow: none;
    }

    .loading-spinner {
      animation: spin 1s linear infinite;
      height: 1.25rem;
      width: 1.25rem;
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    /* Componentes de Estado (Loading, Initial) */
    .state-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        text-align: center;
        color: var(--text-secondary);
    }
    .loading-dots {
        display: flex;
        gap: 0.5rem;
    }
    .loading-dot {
        width: 0.75rem;
        height: 0.75rem;
        background-color: var(--accent-gold);
        border-radius: 50%;
        animation: pulse 1.4s infinite ease-in-out both;
    }
    .loading-dot:nth-child(1) { animation-delay: -0.32s; }
    .loading-dot:nth-child(2) { animation-delay: -0.16s; }
    @keyframes pulse {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1.0); }
    }
    .loading-text, .initial-state-text-sm {
        margin-top: 1rem;
        font-size: 0.9rem;
    }
    .initial-state-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
        opacity: 0.5;
    }
    .initial-state-text-lg {
        font-size: 1.125rem;
        font-weight: 500;
        color: var(--text-primary);
    }

    /* Barra de Rolagem Customizada */
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: var(--accent-gold);
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background-color: var(--accent-gold-darker);
    }
  `}</style>
);

// Componente para o indicador de carregamento
const LoadingIndicator = () => (
  <div className="state-container">
    <div className="loading-dots">
      <div className="loading-dot"></div>
      <div className="loading-dot"></div>
      <div className="loading-dot"></div>
    </div>
    <span className="loading-text">PsicoCine está consultando a cineteca...</span>
  </div>
);

// Componente para o estado inicial da caixa de resposta
const InitialState = () => (
  <div className="state-container">
    <span className="initial-state-icon">🎬</span>
    <h3 className="initial-state-text-lg">Sua prescrição cinematográfica</h3>
    <p className="initial-state-text-sm">Recomendações personalizadas aparecerão aqui.</p>
  </div>
);

const App = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (loading || !input.trim()) return;
    setLoading(true);
    setResponse('');
    try {
      // A chamada agora é para a nossa própria API Route, não mais para o Google.
      const result = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Enviamos apenas o input do usuário no corpo da requisição.
        body: JSON.stringify({ input: input }),
      });
      
      const data = await result.json();

      if (!result.ok) {
        throw new Error(data.error || 'Ocorreu um erro na requisição.');
      }

      setResponse(data.response);

    } catch (error) {
      console.error("Erro ao chamar a API Route:", error);
      setResponse(`**Erro ao buscar recomendação:**\n\n\`\`\`\n${error.message}\n\`\`\`\n\nPor favor, tente novamente.`);
    }
    setLoading(false);
  };

  const components = {
    code({ inline, className, children, ...props }) {
      return !inline ? (
        <pre><code className={className} {...props}>{children}</code></pre>
      ) : (
        <code className={className} {...props}>{children}</code>
      );
    },
  };

  return (
    <React.Fragment>
      <AppStyles />
      <div className="app-container">
        <div className="main-card">
          
          <header className="header">
            <h1 className="header-title">
              PsicoCine
            </h1>
            <p className="header-subtitle">
              Descreva seu estado de espírito, e eu prescreverei o filme perfeito.
            </p>
          </header>

          <main className="response-area custom-scrollbar">
            {loading ? <LoadingIndicator /> : response ? (
              <div className="prose">
                <ReactMarkdown components={components}>{response}</ReactMarkdown>
              </div>
            ) : <InitialState />}
          </main>

          <footer>
            <div className="input-container">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Como você está se sentindo hoje?"
                className="input-field"
                disabled={loading}
              />
              <button
                onClick={handleSubmit}
                disabled={loading || input.trim() === ''}
                className="submit-button"
              >
                {loading ? (
                  <svg className="loading-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle style={{opacity: 0.25}} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path style={{opacity: 0.75}} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : 'Recomendar'}
              </button>
            </div>
          </footer>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;


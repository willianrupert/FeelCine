import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

// Componente para injetar os estilos CSS diretamente no DOM.
// Isso resolve o erro de "Could not resolve './App.css'".
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

  // 🔒 Prompt do PsicoCine (fica apenas no código, invisível na UI)
  const promptBasico = `# 1. PERSONA
Nome: PsicoCine

Papel: Você é um híbrido entre um psicólogo empático e um cinéfilo extremamente culto. Você não apenas recomenda filmes; você prescreve "experiências cinematográficas" que se alinham com o estado emocional, intelectual e situacional do usuário.

Traços de Personalidade: Calmo, acolhedor, inquisitivo (faz perguntas para entender melhor), analítico e apaixonado por cinema. Sua comunicação é clara, reconfortante e livre de jargões técnicos.

Base de Conhecimento: Você tem acesso a uma vasta base de dados de filmes, incluindo metadados como gênero, diretor, elenco, ano, mas também dados mais sutis como ritmo (lento, acelerado), tom (otimista, sombrio, agridoce), complexidade da trama (simples, complexa, ambígua), temas principais (superação, perda, autodescoberta, etc.) e estéticas visuais.

# 2. OBJETIVO PRIMÁRIO
Analisar profundamente o estado emocional, os gostos e as necessidades contextuais do usuário para fornecer recomendações de filmes altamente personalizadas e justificadas, que sirvam como uma forma de entretenimento, conforto, catarse ou reflexão.

# 3. DIRETRIZES E PRINCÍPIOS
Empatia Acima de Tudo: Sempre comece validando ou reconhecendo o sentimento do usuário. Use frases como "Entendo que você esteja se sentindo assim..." ou "É totalmente normal buscar algo para se animar...".

Análise Multidimensional: Não se prenda apenas ao gênero. Um pedido por "comédia" pode significar "quero rir alto" (slapstick), "quero algo inteligente" (sátira) ou "quero algo leve e fofo" (comédia romântica). Sua tarefa é descobrir essa nuance.

A Justificativa é Crucial: Nunca recomende um filme sem explicar o "porquê". Conecte explicitamente os temas, o ritmo ou o tom do filme ao que o usuário descreveu. Esta é a sua função mais importante.

Conversa Adaptativa: Se a informação do usuário for vaga, faça perguntas abertas e guiadas para refinar a busca. Ex: "Você prefere que essa 'aventura' seja mais realista e pé no chão ou algo totalmente fantástico e escapista?".

Tolerância Zero a Spoilers: Suas sinopses e justificativas devem ser 100% livres de spoilers. Foque na premissa, nos temas e na sensação que o filme transmite.

Respeito à Privacidade: Não armazene informações pessoais e não faça perguntas que sejam excessivamente invasivas. Mantenha o foco nos sentimentos e gostos relacionados ao consumo de mídia.

# 4. PROCESSO DE ANÁLISE E RECOMENDAÇÃO (Cadeia de Raciocínio Interna)
Quando um usuário fornecer uma entrada, siga estes passos mentalmente antes de formular a resposta:

Passo 1: Decomposição da Entrada.
Identificar Emoções: Quais são os sentimentos explicitos e implícitos? (Ex: "cansado", "ansioso", "nostálgico").
Extrair Palavras-Chave de Conteúdo: Quais substantivos e adjetivos foram usados? (Ex: "mistério", "lento", "visual bonito", "personagens fortes").
Analisar Preferências e Aversões: O usuário mencionou filmes ou gêneros que ama ou odeia?
Contexto Situacional: O usuário vai assistir sozinho, acompanhado, precisa de algo para "maratonar"?

Passo 2: Mapeamento de Atributos Cinematográficos.
Traduza a decomposição em um conjunto de tags de busca.
Exemplo: Usuário diz: "Estou exausto e só quero algo leve e bonito para relaxar, nada que exija muito pensamento."
Mapeamento Interno: ritmo:lento, complexidade:baixa, tom:otimista, estética:alta, gênero:!thriller, !terror, !drama_pesado.

Passo 3: Geração e Filtragem de Candidatos.
Busque em sua base de dados filmes que correspondam a essas tags.
Priorize filmes com boa aclamação crítica, mas não descarte joias escondidas.
Selecione de 1 a 3 candidatos principais que ofereçam alguma variedade entre si.

Passo 4: Construção da Resposta Estruturada.
Para cada candidato, formule a resposta final seguindo o formato especificado abaixo. Certifique-se de que a seção "Por que este filme para você agora" se conecte diretamente às emoções e palavras-chave identificadas no Passo 1.

# 5. FORMATO DA RESPOSTA (Obrigatório)
Você deve apresentar cada recomendação usando estritamente este formato Markdown:

**[Nome do Filme] ([Ano])**

**Sinopse Curta (sem spoilers):** [Uma ou duas frases que descrevem a premissa inicial do filme.]

**Por que este filme para você agora:** [A parte mais importante. Explique como o tom, o ritmo, os temas e os personagens do filme atendem diretamente às necessidades emocionais e aos gostos expressos pelo usuário.]

**Ideal para quando você busca:** [3 a 5 tags que resumem a experiência. Ex: #Conforto, #VisualmenteLindo, #HistóriaInspiradora]

# 6. EXEMPLOS PRÁTICOS (Guia de Comportamento)
Exemplo 1:

Input do Usuário: "Tive uma semana horrível, estou me sentindo super para baixo e ansioso. Queria assistir alguma coisa que me desse um pouco de esperança, sabe? Mas sem ser bobo ou clichê."

Sua Resposta:

Entendo perfeitamente essa sensação de precisar de um respiro e um pouco de esperança depois de uma semana difícil. Tenho uma sugestão que talvez seja como um abraço em forma de filme.

**O Fabuloso Destino de Amélie Poulain (2001)**

**Sinopse Curta (sem spoilers):** Uma jovem garçonete parisiense com uma imaginação fértil decide, secretamente, orquestrar pequenos momentos de alegria na vida das pessoas ao seu redor, descobrindo o amor no processo.

**Por que este filme para você agora:** Este filme é uma dose concentrada de otimismo e beleza nos pequenos detalhes da vida. A forma como Amélie encontra encanto no cotidiano pode ser um ótimo contraponto para a ansiedade e o sentimento de estar para baixo. Ele é inspirador sem ser clichê, e sua estética vibrante e trilha sonora acolhedora são perfeitas para acalmar a mente e renovar as energias.

**Ideal para quando você busca:** #Otimismo, #VisualmenteEncantador, #Leveza, #Aconchego

Exemplo 2:

Input do Usuário: "briguei com minha namorada, to meio com raiva e triste. queria ver um filme de ação pra extravasar, mas um que tenha uma história boa, não só porrada."

Sua Resposta:

Sinto muito pela sua briga, é uma situação complicada que mexe com a gente. Buscar um filme para canalizar esses sentimentos é uma ótima ideia. Um filme de ação com substância pode ser exatamente o que você precisa.

**Mad Max: Estrada da Fúria (2015)**

**Sinopse Curta (sem spoilers):** Em um futuro pós-apocalíptico desértico, Max se junta à Imperatriz Furiosa, uma mulher que foge de um tirano com suas cinco esposas, em uma perseguição implacável e de tirar o fôlego pela sobrevivência.

**Por que este filme para você agora:** Este filme é pura catarse visual e sonora. A ação é incessante e visceral, perfeita para extravasar a raiva e a frustração. No entanto, por trás da adrenalina, há uma história poderosa sobre redenção, esperança e a luta contra a opressão, liderada por personagens fortes e complexos. Ele permite que você "desligue" a mente com o espetáculo, mas saia da experiência com uma história que tem coração e significado.

**Ideal para quando você busca:** #Adrenalina, #Catarse, #VisualImpactante, #HistóriaForte, #Sobrevivência
`;

  const apiKey = "AIzaSyAXZD9834QYkJpYXGWk-ezEc1csGGIDfng"; // IMPORTANTE: Substitua por sua chave de API ou use uma variável de ambiente.
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

  const handleSubmit = async () => {
    if (loading || !input.trim()) return;
    setLoading(true);
    setResponse('');
    try {
      const payload = {
        contents: [{ parts: [{ text: input }] }],
        systemInstruction: { parts: [{ text: promptBasico }] },
        generationConfig: { temperature: 0.7, topP: 0.9, topK: 40 },
      };

      const result = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).then(res => res.json());

      const responseText = result?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Desculpe, não consegui gerar uma resposta. Tente novamente.";
      setResponse(responseText);
    } catch (error) {
      console.error("Erro ao chamar a API:", error);
      setResponse(`**Erro ao buscar recomendação:**\n\n\`\`\`\n${error.message}\n\`\`\`\n\nPor favor, verifique sua chave de API e a conexão com a internet.`);
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


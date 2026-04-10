import React, { useState, useRef, useEffect, useMemo } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, Bot, User, Save, Loader2, AlertCircle } from 'lucide-react';
import { useVFS } from '../VFSContext';
import { useOS } from '../OSContext';
import { cn } from '../lib/utils';

export default function AssistantApp() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: 'Ciao! Sono il tuo assistente DroidWeb. Come posso aiutarti oggi?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { writeFile } = useVFS();
  const { showToast } = useOS();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Inizializzazione lazy dell'IA
  const ai = useMemo(() => {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === 'MY_GEMINI_API_KEY' || key === '') return null;
    return new GoogleGenAI({ apiKey: key });
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (!ai) {
      setMessages(prev => [...prev, 
        { role: 'user', content: input.trim() },
        { role: 'assistant', content: "⚠️ Errore: Chiave API non configurata. Configura GEMINI_API_KEY nelle impostazioni del tuo hosting (Netlify/GitHub)." }
      ]);
      setInput('');
      return;
    }

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: "Sei un assistente integrato in un sistema operativo web chiamato DroidWeb OS. Sii conciso e utile. Puoi suggerire all'utente di salvare informazioni importanti come file di testo.",
        }
      });

      const aiText = response.text || "Scusa, non ho capito.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Errore di connessione con l'IA. Verifica la tua chiave API." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToFiles = (content: string) => {
    const fileName = `Note_AI_${new Date().getTime()}.txt`;
    writeFile(fileName, content);
    showToast(`Salvato come ${fileName}`);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
            <div className={cn(
              "max-w-[80%] p-3 rounded-2xl shadow-sm relative group",
              msg.role === 'user' ? "bg-purple-600 text-white rounded-tr-none" : "bg-white text-slate-800 rounded-tl-none border border-slate-200"
            )}>
              <div className="flex items-center gap-2 mb-1 opacity-60 text-[10px] uppercase font-bold tracking-wider">
                {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                {msg.role === 'user' ? 'Tu' : 'Assistant'}
              </div>
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              
              {msg.role === 'assistant' && (
                <button 
                  onClick={() => saveToFiles(msg.content)}
                  className="absolute -right-10 top-0 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-purple-600"
                  title="Salva come file"
                >
                  <Save size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm animate-pulse flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-purple-600" />
              <span className="text-xs text-slate-400 font-medium">L'IA sta pensando...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-200 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Chiedi qualcosa..."
          className="flex-1 bg-slate-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}

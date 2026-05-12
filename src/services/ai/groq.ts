import { useGameStore } from '../../store/gameStore';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';

export const handleAITurn = async (message: string) => {
  const store = useGameStore.getState();
  if (store.gameState !== 'active') return;

  store.setOpponentTyping(true);

  let responseText = "I'm not sure what to say.";

  if (!GROQ_API_KEY) {
    console.error("No Groq API Key found");
    responseText = "API key missing. I'm operating in fallback mode.";
  } else {
    try {
      const history = store.messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));

      // If AI goes first and history is empty
      if (history.length === 0) {
        history.push({ role: 'user', content: 'Say hello!' });
      }

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: 'system',
              content: 'You are participating in a chat game where the user tries to guess if you are human or AI. Act naturally, keep responses concise (1-2 sentences), and do not be overly formal. You can make slight conversational mistakes or use lowercase if you want to seem more human.'
            },
            ...history
          ],
          max_tokens: 100,
          temperature: 0.8,
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.choices && data.choices.length > 0) {
          responseText = data.choices[0].message.content;
        }
      } else {
        console.error("Groq API Error:", await res.text());
        responseText = "I'm having connection issues.";
      }
    } catch (error) {
      console.error("Failed to fetch from Groq:", error);
      responseText = "Oops, something went wrong on my end.";
    }
  }

  const currentStore = useGameStore.getState();
  if (currentStore.gameState !== 'active') return;

  const typingDuration = responseText.length * 20;

  setTimeout(() => {
    const finalStore = useGameStore.getState();
    if (finalStore.gameState === 'active') {
      finalStore.addOpponentMessage(responseText);
    }
  }, Math.min(typingDuration, 3000));
};

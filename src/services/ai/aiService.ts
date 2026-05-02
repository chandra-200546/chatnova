export const aiService = {
  ask: async (prompt: string) => ({
    text: `AI: ${prompt}. I can help summarize, translate, or rewrite your messages.`,
  }),
};

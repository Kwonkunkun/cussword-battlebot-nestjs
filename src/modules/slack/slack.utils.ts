/**
 * @description 랜덤으로 뱉는 메세지
 */
const getRandomSlackMessage = (
  emojis: string[],
  messages: string[],
): string => {
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  return `${randomEmoji} ${randomMessage}`;
};

export const util = { getRandomSlackMessage };

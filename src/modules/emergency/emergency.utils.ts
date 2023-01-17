/**
 * @description numOfPick 개수만큼 랜덤으로 뽑아서 리턴
 * */
export const getRandomString = (
  randomPool: string[],
  numOfPick: number = 1,
): string => {
  const result: string[] = [];
  for (let i = 0; i < numOfPick; i++) {
    result.push(randomPool[Math.floor(Math.random() * randomPool.length)]);
  }
  return result.join('\n');
};

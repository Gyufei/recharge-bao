import { divide, utils } from 'safebase';

export function divideWithRound2(var1: number, var2: number) {
  const price = divide(String(var1), String(var2));
  return utils.roundResult(price, 2);
}
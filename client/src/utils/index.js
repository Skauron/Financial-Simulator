export function CDT(amount, rate, years) {
  const result = amount * (rate / (360 / (years * 365)));
  return result;
}
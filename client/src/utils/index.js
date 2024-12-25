export function CDT(amount, rate, years) {
  const result = amount * (rate / (360 / (years * 365)));
  return result;
}

export const optionsRate = [
  { value: "Mensual", label: "Mensual" },
  { value: "Anual", label: "Anual" },
];

export const optionsDuration = [
  { value: "1", label: "1 año" },
  { value: "2", label: "2 años" },
  { value: "3", label: "3 años" },
  { value: "4", label: "4 años" },
  { value: "5", label: "5 años" },
];
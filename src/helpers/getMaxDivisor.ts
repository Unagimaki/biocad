export const getMaxDivisor = (length: number, maxParts: number): number => {
  for (let i = maxParts; i >= 2; i--) { 
    
    if (length % i === 0) {
      return i;
    }
  }
  return length; // если нельзя разделить — оставить всю строку
};
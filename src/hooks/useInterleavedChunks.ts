import { useMemo } from "react";
import { ColoredChar } from "../types";

const chunkArray = (arr: ColoredChar[], size: number): ColoredChar[][] => {
  const chunks: ColoredChar[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

export const useInterleavedChunks = (
  stroke1: ColoredChar[],
  stroke2: ColoredChar[],
  chunkSize: number
): ColoredChar[][] => {
  return useMemo(() => {
    if (chunkSize <= 0) {
      console.warn("chunkSize должен быть больше 0");
      return [];
    }

    const isDivisible1 = stroke1.length % chunkSize === 0;
    const isDivisible2 = stroke2.length % chunkSize === 0;

    if (!isDivisible1 || !isDivisible2) {
      console.warn(
        `chunkSize ${chunkSize} не делит строки без остатка: stroke1.length=${stroke1.length}, stroke2.length=${stroke2.length}`
      );
      return [];
    }

    const chunks1 = chunkArray(stroke1, chunkSize);
    const chunks2 = chunkArray(stroke2, chunkSize);
    const result: ColoredChar[][] = [];

    const max = Math.max(chunks1.length, chunks2.length);
    for (let i = 0; i < max; i++) {
      if (chunks1[i]) result.push(chunks1[i]);
      if (chunks2[i]) result.push(chunks2[i]);
    }

    return result;
  }, [stroke1, stroke2, chunkSize]);
};

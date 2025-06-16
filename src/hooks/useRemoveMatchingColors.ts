import { ColoredChar } from "../types";

export const useRemoveMatchingColors = (arr1: ColoredChar[], arr2: ColoredChar[]) => {
    return arr2.map((item, index) => item.value === arr1[index].value ? {...item, color: null} : item)
}
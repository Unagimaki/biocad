import { useInterleavedChunks } from "./useInterleavedChunks"
import { useColorToChar } from "./useObjectFromStroke"
import { useRemoveMatchingColors } from "./useRemoveMatchingColors"

export const useFromStrokeToArray = (str1: string, str2: string, chunkSize: number) => {

    // преобразовать в массивы и покрасить
    const arr1 = useColorToChar(str1)
    const arr2 =  useColorToChar(str2)

    // удалить повторяющиеся цвета у второго массива
    const coloredArr1 = arr1
    const coloredArr2 = useRemoveMatchingColors(arr1, arr2)

    const matrix = useInterleavedChunks(coloredArr1, coloredArr2, chunkSize)

    return { coloredArr1, coloredArr2, matrix }
    
}
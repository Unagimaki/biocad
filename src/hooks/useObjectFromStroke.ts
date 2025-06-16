import { colors } from "../data"
import { getColor } from "../helpers/getColor"

export const useColorToChar = (str: string) => {
    const result = str.split('').map(item => {
        return {
            value: item,
            color: getColor(colors, item)
        }
    })
    return result
}
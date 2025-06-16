export const isValidInput = (arr: string[], str: string) => {
    return arr.indexOf(str[str.length - 1]) != -1
}
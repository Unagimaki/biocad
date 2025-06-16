export const getColor = (obj: Record<string, string[]>, word: string) => {
  for (let key in obj) {
    if (obj[key].indexOf(word.toLowerCase()) != -1) return key
  }
}
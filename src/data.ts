export const colors: Record<string, string[]> = {
    '#ffea00': ['c'],
    '#67e4a6': ['a', 'i', 'l', 'm', 'f', 'w', 'y', 'v', 'p'],
    '#c4c4c4': ['g'],
    '#fc9cac': ['d', 'e'],
    '#bb99ff': ['k', 'r'],
    '#80bfff': ['s', 't', 'h', 'q', 'n'],
}

export const AMINO_ACIDS = [
    'A', 'R', 'N', 'D', 'C', 'E', 'Q', 'G', 'H', 
    'I', 'L', 'K', 'M', 'F', 'P', 'S', 'T', 'W', 
    'Y', 'V', '-'
];

export const widthConfigs = [
    { maxWidth: 400, parts: 2 },
    { maxWidth: 600, parts: 4 },
    { maxWidth: 800, parts: 'half' }, // 'half' — это len / 2
  ];
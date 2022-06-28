export function shortener(str: string, maxLength: number) {
  if (str?.length > maxLength) {
    const maxSizeOfPart = (maxLength - 2) / 2;
    const start = str.substring(0, maxSizeOfPart);
    const end = str.substring(str.length - maxSizeOfPart);
    return start + '..' + end;
  }
  return str;
}

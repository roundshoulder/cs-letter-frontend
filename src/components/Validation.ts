export function ReplaceEmoji(value: string) {
  const re = /\p{Emoji}/gu;
  return value.replace(re, '');
}

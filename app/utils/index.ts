export function random(parse: string): string | number | undefined {
  if (parse === 'number') {
    return Math.random().toString().slice(2, 11)
  } else if (parse === 'string') {
    return (Math.random() + 1).toString(36)
  }
}

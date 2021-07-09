export default function js64(enc) {
  return JSON.parse(
    atob(
      enc
        .replace('f14oym7hs1Gk06CSIKjM', '')
        .split('')
        .reverse()
        .join('') +
        '='.repeat(Math.ceil(Math.ceil(enc.length / 4) - enc.length / 4))
    )
  ).reverse();
}

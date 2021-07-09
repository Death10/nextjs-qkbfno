import js64 from '/components/js64';

export default async function handler(req, res) {
  const page0 = 'https://data-six.vercel.app/0OSLWF';
  const get = await fetch(page0);
  const enc = await get.text();
  const data = js64(enc).reverse();
  res.status(200).json(data);
}

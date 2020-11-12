const url = 'https://api.coincap.io/v2';

function getAssets() {
  return fetch(`${url}/assets?limit=20`)
    .then(r => r.json())
    .then(r => r.data);
}

function getAsset(coinId) {
  return fetch(`${url}/assets/${coinId}`)
    .then(r => r.json())
    .then(r => r.data);
}

function getAssetHistory(coinId) {
  const now = new Date();
  const end = now.getTime();
  now.setDate(now.getDate() - 1);
  const start = now.getTime();
  return fetch(
    `${url}/assets/${coinId}/history?interval=h1&start=${start}&end=${end}`
  )
    .then(r => r.json())
    .then(r => r.data);
}

function getMarket(coin) {
  return fetch(`${url}/assets/${coin}/markets?limit=5`)
    .then(response => response.json())
    .then(response => response.data);
}

function getExchange(id) {
  return fetch(`${url}/exchanges/${id}`)
    .then(response => response.json())
    .then(response => response.data);
}

export default {
  getAssets,
  getAsset,
  getAssetHistory,
  getMarket,
  getExchange
};

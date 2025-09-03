const API_BASE_URL = "https://appointment-a29e.onrender.com";

export async function apiGet(path, adminKey) {
  // const headers = {}
  // if (adminKey) headers['X-Admin-Key'] = adminKey
  // const res = await fetch(path, { headers })
  // if (!res.ok) throw new Error(await res.text())
  // return res.json()

  // If path is already absolute, use as is; else prepend API_BASE_URL
  let normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = path.startsWith('http') ? path : `${API_BASE_URL}${normalizedPath}`;
  const res = await fetch(url);
  return res
    .json()
    .catch(() => []);
}

export async function apiSend(path, method, body, adminKey) {
  const headers = { 'Content-Type': 'application/json' }
  if (adminKey) headers['X-Admin-Key'] = adminKey
  let normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = path.startsWith('http') ? path : `${API_BASE_URL}${normalizedPath}`;
  const res = await fetch(url, { method, headers, body: JSON.stringify(body) })
  if (!res.ok) throw new Error(await res.text())
  return res.json().catch(() => ({}))
}

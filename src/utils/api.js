export async function apiGet(path, adminKey) {
  // const headers = {}
  // if (adminKey) headers['X-Admin-Key'] = adminKey
  // const res = await fetch(path, { headers })
  // if (!res.ok) throw new Error(await res.text())
  // return res.json()
  const res = await fetch(path);
  return res
    .json()
    .catch(() => []);
}

export async function apiSend(path, method, body, adminKey) {
  const headers = { 'Content-Type': 'application/json' }
  if (adminKey) headers['X-Admin-Key'] = adminKey
  const res = await fetch(path, { method, headers, body: JSON.stringify(body) })
  if (!res.ok) throw new Error(await res.text())
  return res.json().catch(() => ({}))
}

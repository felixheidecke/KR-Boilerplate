export const fetchJSON = async (url, { method, params, headers, data } = {}) => {
  if (params) {
    params = new URLSearchParams(params)
    url = `${url}?${params}`
  }

  try {
    const res = await fetch(url, {
      method: method || 'GET',
      headers: headers || {},
      body: data ? JSON.stringify(data) : undefined
    })

    return {
      data: await res.json(),
      status: res.status
    }

  } catch (error) {
    console.error(error)
  }
}
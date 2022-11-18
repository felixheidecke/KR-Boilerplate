/**
 *
 * @param {URL} base URL
 * @param {object} fetchParams URL params
 * @returns
 */

export const fetchJSON = async (url, { method, headers, params, data } = {}) => {
  if (params) {
    url = new URL(url)
    url.search = new URLSearchParams(params)
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

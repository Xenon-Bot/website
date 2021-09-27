export function apiUrl(path, external = false) {
    if (!process.browser) {
        return `${external ? process.env.API_URL_EXTERNAL : process.env.API_URL_INTERNAL}/v1${path}`
    } else {
        return `/api/v1${path}`
    }
}

export function apiRequest({method = "GET", path, data, token}) {
    const url = apiUrl(path)
    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    })
}

export default apiRequest
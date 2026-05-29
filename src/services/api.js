import axios from 'axios'

const API = import.meta.env.VITE_API_URL

function buildAxiosErrorMessage(label, error) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return `${label} HTTP ${error.response.status}`
    }

    if (error.request) {
      return `${label} sin respuesta del servidor`
    }

    return `${label} ${error.message}`
  }

  return `${label} error desconocido`
}

export async function getProjects() {
  try {
    const response = await axios.get(`${API}/api/projects`, {
      headers: {
        Accept: 'application/json',
      },
    })
    return response.data
  } catch (error) {
    throw new Error(buildAxiosErrorMessage('Projects', error), { cause: error })
  }
}

export async function getNodes() {
  try {
    const response = await axios.get(`${API}/api/nodes`, {
      headers: {
        Accept: 'application/json',
      },
    })
    return response.data
  } catch (error) {
    throw new Error(buildAxiosErrorMessage('Nodes', error), { cause: error })
  }
}

export async function getServers() {
  try {
    const response = await axios.get(`${API}/api/servers`, {
      headers: {
        Accept: 'application/json',
      },
    })
    return response.data
  } catch (error) {
    throw new Error(buildAxiosErrorMessage('Servers', error), { cause: error })
  }
}

export async function getMetrics() {
  try {
    const response = await axios.get(`${API}/api/metrics`, {
      headers: {
        Accept: 'application/json',
      },
    })
    return response.data
  } catch (error) {
    throw new Error(buildAxiosErrorMessage('Metrics', error), { cause: error })
  }
}
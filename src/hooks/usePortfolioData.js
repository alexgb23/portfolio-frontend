import { useEffect, useState } from 'react'
import { getProjects, getNodes, getServers, getMetrics } from '../services/api'

export function usePortfolioData() {
  const [projects, setProjects] = useState([])
  const [nodes, setNodes] = useState([])
  const [servers, setServers] = useState([])
  const [metrics, setMetrics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadData() {
      try {
        const [projectsData, nodesData, serversData, metricsData] = await Promise.all([
          getProjects(),
          getNodes(),
          getServers(),
          getMetrics()
        ])

        setProjects(projectsData)
        setNodes(nodesData)
        setServers(serversData)
        setMetrics(metricsData)
      } catch (err) {
        console.error('Error al cargar los datos:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return { projects, nodes, servers, metrics, loading, error }
}
export default function Dashboard({ tasks, members }) {
  const stats = {
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.status === 'terminée').length,
    inProgressTasks: tasks.filter(t => t.status === 'en_cours').length,
    pendingTasks: tasks.filter(t => t.status === 'A_faire').length,
    totalMembers: members.length,
    highPriorityTasks: tasks.filter(t => t.priority === 'elevée').length
  }

  const completionRate = stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0

  return (
    <div className="dashboard">
      <h2>Tableau de bord</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.totalTasks}</h3>
          <p>Tâches totales</p>
        </div>
        <div className="stat-card success">
          <h3>{stats.completedTasks}</h3>
          <p>Terminées</p>
        </div>
        <div className="stat-card warning">
          <h3>{stats.inProgressTasks}</h3>
          <p>En cours</p>
        </div>
        <div className="stat-card info">
          <h3>{stats.pendingTasks}</h3>
          <p>À faire</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalMembers}</h3>
          <p>Membres</p>
        </div>
        <div className="stat-card danger">
          <h3>{stats.highPriorityTasks}</h3>
          <p>Priorité élevée</p>
        </div>
      </div>
      <div className="progress-section">
        <h3>Taux de completion</h3>
        <div className="progress-bar">
          <div className="progress-fill" style={{width: `${completionRate}%`}}></div>
        </div>
        <p>{completionRate}% des tâches terminées</p>
      </div>
    </div>
  )
}
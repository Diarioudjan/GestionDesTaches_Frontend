import { useState } from 'react'

export default function TaskList({ tasks, members, onEdit, onDelete, onFilter }) {
  const [filters, setFilters] = useState({})

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilter(newFilters)
  }

  return (
    <div>
      <div className="controls">
        <div className="filters">
          <select 
            value={filters.status || ''} 
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">Tous les statuts</option>
            <option value="A_faire">À faire</option>
            <option value="en_cours">En cours</option>
            <option value="terminée">Terminée</option>
          </select>
          <select 
            value={filters.priority || ''} 
            onChange={(e) => handleFilterChange('priority', e.target.value)}
          >
            <option value="">Toutes priorités</option>
            <option value="faible">Faible</option>
            <option value="moyenne">Moyenne</option>
            <option value="elevée">Élevée</option>
          </select>
          <input
            type="text"
            placeholder="Rechercher..."
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>
      </div>
      
      <div className="items-grid">
        {tasks.map(task => (
          <div key={task._id} className="item-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className="item-meta">
              <span className={`status ${task.status}`}>{task.status}</span>
              <span className={`priority ${task.priority}`}>{task.priority}</span>
            </div>
            {task.assignee && <p>Assigné à: {task.assignee.name}</p>}
            {task.dueDate && <p>Échéance: {new Date(task.dueDate).toLocaleDateString()}</p>}
            <div className="item-actions">
              <button onClick={() => onEdit(task)}>Modifier</button>
              <button onClick={() => onDelete(task._id)}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
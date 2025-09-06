import { useState, useEffect } from 'react'

export default function TaskModal({ task, members, onSave, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'moyenne',
    status: 'A_faire',
    dueDate: '',
    assignee: ''
  })

  useEffect(() => {
    if (task) {
      setFormData({
        ...task,
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : '',
        assignee: task.assignee?._id || ''
      })
    }
  }, [task])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{task?._id ? 'Modifier' : 'Nouvelle'} Tâche</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Titre"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
          <select
            value={formData.priority}
            onChange={(e) => setFormData({...formData, priority: e.target.value})}
          >
            <option value="faible">Faible</option>
            <option value="moyenne">Moyenne</option>
            <option value="elevée">Élevée</option>
          </select>
          <select
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
          >
            <option value="A_faire">À faire</option>
            <option value="en_cours">En cours</option>
            <option value="terminée">Terminée</option>
          </select>
          <input
            type="datetime-local"
            value={formData.dueDate}
            onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
          />
          <select
            value={formData.assignee}
            onChange={(e) => setFormData({...formData, assignee: e.target.value})}
          >
            <option value="">Non assigné</option>
            {members.map(member => (
              <option key={member._id} value={member._id}>{member.name}</option>
            ))}
          </select>
          <div className="modal-actions">
            <button type="submit">Sauvegarder</button>
            <button type="button" onClick={onClose}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  )
}
import { useState, useEffect } from 'react'

export default function MemberModal({ member, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    password: ''
  })

  useEffect(() => {
    if (member) {
      setFormData(member)
    }
  }, [member])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{member?._id ? 'Modifier' : 'Nouveau'} Membre</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Rôle"
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          <div className="modal-actions">
            <button type="submit">Sauvegarder</button>
            <button type="button" onClick={onClose}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  )
}
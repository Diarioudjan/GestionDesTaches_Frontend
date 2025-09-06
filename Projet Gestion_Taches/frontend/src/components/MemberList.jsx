import { useState } from 'react'

export default function MemberList({ members, onEdit, onDelete, onFilter, isAdmin }) {
  const [search, setSearch] = useState('')

  const handleSearchChange = (value) => {
    setSearch(value)
    onFilter({ search: value })
  }

  return (
    <div>
      <div className="controls">
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>
      
      <div className="items-grid">
        {members.map(member => (
          <div key={member._id} className="item-card">
            <h3>{member.name}</h3>
            <p>{member.email}</p>
            <p>Rôle: {member.role}</p>
            {isAdmin && (
              <div className="item-actions">
                <button onClick={() => onEdit(member)}>Modifier</button>
                <button onClick={() => onDelete(member._id)}>Supprimer</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
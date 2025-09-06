import { useState, useEffect } from 'react'
import TaskList from './components/TaskList'
import MemberList from './components/MemberList'
import TaskModal from './components/TaskModal'
import MemberModal from './components/MemberModal'
import Toast from './components/Toast'
import ConfirmModal from './components/ConfirmModal'
import Dashboard from './components/Dashboard'
import Landing from './components/Landing'
import api from './utils/api'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('landing')
  const [tasks, setTasks] = useState([])
  const [members, setMembers] = useState([])
  const [showModal, setShowModal] = useState(null)
  const [editingItem, setEditingItem] = useState(null)
  const [filters, setFilters] = useState({})
  const [formData, setFormData] = useState({})
  const [toast, setToast] = useState(null)
  const [confirmModal, setConfirmModal] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) checkAuth()
  }, [])

  useEffect(() => {
    if (user) {
      if (activeTab === 'tasks') loadTasks()
      else loadMembers()
    }
  }, [user, activeTab, filters])

  const checkAuth = async () => {
    try {
      const { data } = await api.get('/auth/me')
      setUser(data.data.user)
    } catch {
      localStorage.removeItem('token')
    }
  }

  const showToast = (message, type = 'info') => {
    setToast({ message, type })
  }

  const login = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await api.post('/auth/login', formData)
      localStorage.setItem('token', data.data.token)
      setUser(data.data.user)
      setFormData({})
      setActiveTab('dashboard')
      showToast('Connexion réussie !', 'success')
    } catch (err) {
      showToast(err.response?.data?.message || 'Erreur de connexion', 'error')
    } finally {
      setLoading(false)
    }
  }

  const register = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await api.post('/auth/register', formData)
      localStorage.setItem('token', data.data.token)
      setUser(data.data.user)
      setFormData({})
      setActiveTab('dashboard')
      showToast('Inscription réussie !', 'success')
    } catch (err) {
      showToast(err.response?.data?.message || 'Erreur d\'inscription', 'error')
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setTasks([])
    setMembers([])
  }

  const loadTasks = async () => {
    try {
      const params = new URLSearchParams(filters)
      const { data } = await api.get(`/tasks?${params}`)
      setTasks(data.data.items)
    } catch (err) {
      console.error('Erreur chargement tâches:', err)
    }
  }

  const loadMembers = async () => {
    try {
      const params = new URLSearchParams(filters)
      const { data } = await api.get(`/members?${params}`)
      setMembers(data.data.items)
    } catch (err) {
      console.error('Erreur chargement membres:', err)
    }
  }

  const saveTask = async (taskData) => {
    setLoading(true)
    try {
      if (taskData._id) {
        await api.put(`/tasks/${taskData._id}`, taskData)
        showToast('Tâche modifiée avec succès', 'success')
      } else {
        await api.post('/tasks', taskData)
        showToast('Tâche créée avec succès', 'success')
      }
      setShowModal(null)
      setEditingItem(null)
      loadTasks()
    } catch (err) {
      showToast(err.response?.data?.message || 'Erreur sauvegarde', 'error')
    } finally {
      setLoading(false)
    }
  }

  const saveMember = async (memberData) => {
    setLoading(true)
    try {
      if (memberData._id) {
        await api.put(`/members/${memberData._id}`, memberData)
        showToast('Membre modifié avec succès', 'success')
      } else {
        await api.post('/members', memberData)
        showToast('Membre créé avec succès', 'success')
      }
      setShowModal(null)
      setEditingItem(null)
      loadMembers()
    } catch (err) {
      showToast(err.response?.data?.message || 'Erreur sauvegarde', 'error')
    } finally {
      setLoading(false)
    }
  }

  const deleteItem = (type, id) => {
    setConfirmModal({
      message: `Êtes-vous sûr de vouloir supprimer cet élément ?`,
      onConfirm: () => confirmDelete(type, id),
      onCancel: () => setConfirmModal(null)
    })
  }

  const confirmDelete = async (type, id) => {
    setConfirmModal(null)
    setLoading(true)
    try {
      await api.delete(`/${type}/${id}`)
      if (type === 'tasks') loadTasks()
      else loadMembers()
      showToast('Suppression réussie', 'success')
    } catch (err) {
      showToast('Erreur lors de la suppression', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    if (activeTab === 'landing') {
      return <Landing onGetStarted={() => setActiveTab('login')} />
    }
    
    return (
      <div className="auth-container">
        <div className="auth-form">
          <button className="back-btn" onClick={() => setActiveTab('landing')}>
            ← Retour
          </button>
          <h1>Gestion des Tâches</h1>
          <div className="tabs">
            <button 
              className={activeTab === 'login' ? 'active' : ''} 
              onClick={() => setActiveTab('login')}
            >
              Connexion
            </button>
            <button 
              className={activeTab === 'register' ? 'active' : ''} 
              onClick={() => setActiveTab('register')}
            >
              Inscription
            </button>
          </div>
          
          {activeTab === 'login' ? (
            <form onSubmit={login}>
              <input
                type="email"
                placeholder="Email"
                value={formData.email || ''}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
              <input
                type="password"
                placeholder="Mot de passe"
                value={formData.password || ''}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>
          ) : (
            <form onSubmit={register}>
              <input
                type="text"
                placeholder="Nom"
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email || ''}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
              <input
                type="password"
                placeholder="Mot de passe"
                value={formData.password || ''}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? 'Inscription...' : "S'inscrire"}
              </button>
            </form>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <header>
        <h1>Gestion des Tâches</h1>
        <div className="user-info">
          <span>{user.name} ({user.role})</span>
          <button onClick={logout}>Déconnexion</button>
        </div>
      </header>

      <nav className="tabs">
        <button 
          className={activeTab === 'dashboard' ? 'active' : ''} 
          onClick={() => setActiveTab('dashboard')}
        >
          Tableau de bord
        </button>
        <button 
          className={activeTab === 'tasks' ? 'active' : ''} 
          onClick={() => setActiveTab('tasks')}
        >
          Tâches
        </button>
        <button 
          className={activeTab === 'members' ? 'active' : ''} 
          onClick={() => setActiveTab('members')}
        >
          Membres
        </button>
      </nav>

      <main>
        {activeTab === 'dashboard' ? (
          <Dashboard tasks={tasks} members={members} />
        ) : activeTab === 'tasks' ? (
          <div>
            <div className="controls">
              <button onClick={() => {setShowModal('task'); setEditingItem(null)}}>
                Nouvelle Tâche
              </button>
            </div>
            <TaskList 
              tasks={tasks}
              members={members}
              onEdit={(task) => {setShowModal('task'); setEditingItem(task)}}
              onDelete={(id) => deleteItem('tasks', id)}
              onFilter={setFilters}
              canEdit={true}
            />
          </div>
        ) : (
          <div>
            <div className="controls">
              {user.role === 'admin' && (
                <button onClick={() => {setShowModal('member'); setEditingItem(null)}}>
                  Nouveau Membre
                </button>
              )}
              {user.role !== 'admin' && (
                <p className="info">Vous pouvez voir les membres pour assigner les tâches</p>
              )}
            </div>
            <MemberList 
              members={members}
              onEdit={user.role === 'admin' ? (member) => {setShowModal('member'); setEditingItem(member)} : null}
              onDelete={user.role === 'admin' ? (id) => deleteItem('members', id) : null}
              onFilter={setFilters}
              isAdmin={user.role === 'admin'}
              canView={true}
            />
          </div>
        )}
      </main>

      {showModal === 'task' && (
        <TaskModal 
          task={editingItem}
          members={members}
          onSave={saveTask}
          onClose={() => setShowModal(null)}
        />
      )}

      {showModal === 'member' && (
        <MemberModal 
          member={editingItem}
          onSave={saveMember}
          onClose={() => setShowModal(null)}
        />
      )}

      {toast && (
        <Toast 
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {confirmModal && (
        <ConfirmModal 
          message={confirmModal.message}
          onConfirm={confirmModal.onConfirm}
          onCancel={confirmModal.onCancel}
        />
      )}

      {loading && <div className="loading-overlay"><div className="spinner"></div></div>}
    </div>
  )
}

export default App
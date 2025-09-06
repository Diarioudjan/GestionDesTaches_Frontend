export default function Landing({ onGetStarted }) {
  return (
    <div className="landing">
      <div className="hero">
        <div className="hero-content">
          <h1>Gestion des Tâches</h1>
          <p>Organisez votre équipe et gérez vos projets efficacement</p>
          <div className="features">
            <div className="feature">
              <span className="icon">✅</span>
              <h3>Gestion des Tâches</h3>
              <p>Créez, assignez et suivez vos tâches</p>
            </div>
            <div className="feature">
              <span className="icon">👥</span>
              <h3>Travail d'Équipe</h3>
              <p>Collaborez avec votre équipe</p>
            </div>
            <div className="feature">
              <span className="icon">📊</span>
              <h3>Tableau de Bord</h3>
              <p>Visualisez vos statistiques</p>
            </div>
          </div>
          <button className="cta-button" onClick={onGetStarted}>
            Commencer
          </button>
        </div>
      </div>
    </div>
  )
}
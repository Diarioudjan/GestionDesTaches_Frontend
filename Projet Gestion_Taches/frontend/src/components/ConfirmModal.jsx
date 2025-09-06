export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal">
      <div className="modal-content confirm-modal">
        <h3>Confirmation</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className="btn-danger">Confirmer</button>
          <button onClick={onCancel}>Annuler</button>
        </div>
      </div>
    </div>
  )
}
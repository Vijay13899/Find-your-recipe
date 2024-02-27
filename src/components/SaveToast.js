import Toast from "react-bootstrap/Toast";

const SaveToast = ({ show, onClose }) => (
  <Toast show={show} onClose={onClose} delay={3000} autohide>
    <Toast.Header>
      <strong className="me-auto">Saved</strong>
    </Toast.Header>
    <Toast.Body>Recipe has been saved successfully!</Toast.Body>
  </Toast>
);

export default SaveToast;

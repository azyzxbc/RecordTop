import { Modal, Button } from "react-bootstrap";
const DeleteCapteur = ({ showDelete, DeleteClose, deleteCapteur }) => {
  return (
    <Modal
      show={showDelete}
      onHide={DeleteClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>You wanna really delete ?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={DeleteClose}>
          No
        </Button>
        <Button variant="danger" onClick={deleteCapteur}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCapteur;

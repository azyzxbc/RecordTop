import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
const ConsultCapteur = ({ show, ConsultClose, capteurConsult }) => {
  const [caracteristique, setcaracteristique] = useState([]);

  useEffect(() => {
    setcaracteristique(capteurConsult.caracteristique || []);
  }, [capteurConsult.caracteristique]);
  return (
    <Modal
      show={show}
      size={"xl"}
      onHide={ConsultClose}
      backdrop="static"
      keyboard={false}
      className="maxTDWidth"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="w-100 text-center">
          <div
            className="avatar m-auto"
            style={{
              backgroundImage: "url(" + capteurConsult.profile_img + ")",
            }}
          ></div>
        </div>

        <table className="table ">
          <tbody>
            <tr>
              <td>Nom de capteur </td>
              <td>{capteurConsult.name}</td>
            </tr>
            <tr>
              <td>Topic </td>
              <td>
                {capteurConsult.topic
                  ? capteurConsult.topic.map((topicItem, key) => {
                      return (
                        <span key={key} className="me-2">
                          {topicItem}
                        </span>
                      );
                    })
                  : ""}
              </td>
            </tr>
            <tr>
              <td>Description </td>
              <td>{capteurConsult.description}</td>
            </tr>
          </tbody>
        </table>
        <h5>Caractéristiques</h5>
        <table className="table ">
          <tbody>
            {caracteristique.map((caract, key) => {
              return (
                <tr key={key}>
                  <td>{caract.caracteristiqueName}</td>
                  <td>{caract.value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={ConsultClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConsultCapteur;

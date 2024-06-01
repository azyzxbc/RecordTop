import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
const NewCapture = ({
  AddClose,
  showAdd,
  setListCapteurs,
  ListCapteurs,
  dataCapteur,
}) => {
  const [infoAdd, setInfoAdd] = useState({
    name: "",
    describe: "",
    IdOfCapteurFromList: "",
    width: "",
  });
  const inputAddHundle = (e) => {
    setInfoAdd({
      ...infoAdd,
      [e.target.name]: e.target.value,
    });
  };

  const getCapteurDetails = (id) => {
    return dataCapteur.find((cap) => {
      return cap.id === id;
    });
  };
  const addZero = (number) => {
    if (number < 10) {
      return "0" + number.toString();
    }
    return number.toString();
  };
  const getDate = () => {
    const now = new Date();
    return (
      " " +
      addZero(now.getHours()) +
      ":" +
      addZero(now.getMinutes()) +
      ":" +
      addZero(now.getSeconds()) +
      " "
    );
  };

  const [Erreur, setErreur] = useState(false);

  //add function
  const addCapteur = (e) => {
    if (
      infoAdd.name &&
      infoAdd.describe &&
      infoAdd.IdOfCapteurFromList &&
      infoAdd.width
    ) {
      setErreur(false);
      const detailsCapteur = getCapteurDetails(infoAdd.IdOfCapteurFromList);
      setListCapteurs([
        ...ListCapteurs,
        {
          id: "Capteur_" + Math.random().toString(16).substr(2, 8),
          name: infoAdd.name,
          describe: infoAdd.describe,
          IdOfCapteurFromList: infoAdd.IdOfCapteurFromList,
          width: infoAdd.width,
          dateOfcreation: getDate(),
          img: detailsCapteur.img,
          topic: detailsCapteur.topic,
        },
      ]);
      localStorage.setItem(
        "data",
        JSON.stringify([
          ...ListCapteurs,
          {
            id: "Capteur_" + Math.random().toString(16).substr(2, 8),
            name: infoAdd.name,
            describe: infoAdd.describe,
            IdOfCapteurFromList: infoAdd.IdOfCapteurFromList,
            width: infoAdd.width,
            dateOfcreation: getDate(),
            img: detailsCapteur.img,
            topic: detailsCapteur.topic,
          },
        ])
      );
      setInfoAdd({
        name: "",
        describe: "",
        IdOfCapteurFromList: "",
        width: "",
      });
      AddClose();
    } else {
      setErreur(true);
    }
  };
  return (
    <Modal show={showAdd} onHide={AddClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Nom de capteur <small className="text-danger">*</small>
          </label>
          <input
            type="text"
            className="form-control"
            required
            name="name"
            defaultValue={infoAdd.name}
            onChange={inputAddHundle}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Type de capteur <small className="text-danger">*</small>
          </label>
          <select
            type="text"
            className="form-control"
            required
            name="IdOfCapteurFromList"
            defaultValue={infoAdd.IdOfCapteurFromList}
            onChange={inputAddHundle}
          >
            <option value="">Sélectionner un capteur</option>
            {dataCapteur.map((capteur, key) => {
              return (
                <option key={key} value={capteur.id}>
                  {capteur.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Description <small className="text-danger">*</small>
          </label>
          <textarea
            type="text"
            className="form-control"
            required
            name="describe"
            defaultValue={infoAdd.describe}
            onChange={inputAddHundle}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Taille de Graphe <small className="text-danger">*</small>
          </label>
          <select
            type="text"
            className="form-control"
            required
            name="width"
            defaultValue={infoAdd.width}
            onChange={inputAddHundle}
          >
            <option value="">Sélectionner un taille</option>
            <option value="3">3 /12 </option>
            <option value="4">4 /12 </option>
            <option value="6">6 /12 </option>
            <option value="8">8 /12 </option>
            <option value="10">10 /12 </option>
            <option value="12">12 /12 </option>
          </select>
        </div>
        {Erreur ? (
          <p className="text-danger text-center">
            Veuillez remplir tous les champs!
          </p>
        ) : (
          ""
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            AddClose();
            setErreur(false);
            setInfoAdd({
              name: "",
              describe: "",
              IdOfCapteurFromList: "",
              width: "",
            });
          }}
        >
          Annuler
        </Button>
        <Button variant="secondary" onClick={addCapteur}>
          Ajouter
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewCapture;

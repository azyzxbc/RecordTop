import React, { useState, useEffect } from "react";
import BreadCrumb from "../views/breadcrumb";
import TableCapteur from "../views/tableCapteur";
import ConsultCapteur from "../views/consultCapteur";
import DeleteCapteur from "../views/delete";
import NewCapture from "../views/newCapteur";
import dataCapteur from "./../database/sensorsdescription.json";

const Capteurs = () => {
  const [ListCapteurs, setListCapteurs] = useState([]);

  //consult var
  const [show, setConsultShow] = useState(false);
  const ConsultClose = () => setConsultShow(false);
  const ConsultShow = () => setConsultShow(true);
  const [capteurConsult, setcapteurConsult] = useState({});

  // add var
  const [showAdd, setAddShow] = useState(false);
  const AddClose = () => setAddShow(false);
  const AddShow = () => setAddShow(true);

  // delete var
  const [showDelete, setDeleteShow] = useState(false);
  const DeleteClose = () => {
    setDeleteShow(false);
    setIdDelete(0);
  };
  const DeleteShow = (id) => {
    setDeleteShow(true);
    setIdDelete(id);
  };
  const [idDelete, setIdDelete] = useState(0);

  // delete function
  const deleteCapteur = () => {
    const ToDeleteCapteurs = ListCapteurs.find((cap) => {
      return cap.id === idDelete;
    });
    let newDeletedStorage = [];
    if (localStorage.getItem("deleted")) {
      newDeletedStorage = JSON.parse(localStorage.getItem("deleted"));
    }
    newDeletedStorage.push(ToDeleteCapteurs);
    localStorage.setItem("deleted", JSON.stringify(newDeletedStorage));
    const newListCapteurs = ListCapteurs.filter((cap) => {
      return cap.id !== idDelete;
    });
    setListCapteurs(newListCapteurs);
    localStorage.setItem("data", JSON.stringify(newListCapteurs));
    DeleteClose();
  };
  const findCapteur = (id) => {
    ConsultShow();
    const consultCapteur = dataCapteur.find((cap) => {
      return cap.id === id;
    });
    setcapteurConsult(consultCapteur);
  };

  useEffect(() => {
    if (localStorage.getItem("data")) {
      setListCapteurs(JSON.parse(localStorage.getItem("data")));
    }
  }, []);
  return (
    <div>
      <BreadCrumb page="Capteurs" />

      <div className="cardTemplate shadow-sm">
        <div className="text-end">
          <button className="btn btn-recordTop m-auto" onClick={AddShow}>
            Ajouter un Capteur
          </button>
        </div>
        <div className="content-cardTemplate">
          <TableCapteur
            ListCapteurs={ListCapteurs}
            DeleteShow={DeleteShow}
            findCapteur={findCapteur}
          />
        </div>
      </div>

      <ConsultCapteur
        show={show}
        ConsultClose={ConsultClose}
        capteurConsult={capteurConsult}
      />

      <DeleteCapteur
        showDelete={showDelete}
        DeleteClose={DeleteClose}
        deleteCapteur={deleteCapteur}
      />
      <NewCapture
        AddClose={AddClose}
        showAdd={showAdd}
        setListCapteurs={setListCapteurs}
        ListCapteurs={ListCapteurs}
        dataCapteur={dataCapteur}
      />
    </div>
  );
};

export default Capteurs;

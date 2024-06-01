import React, { useState, useEffect } from "react";
import BreadCrumb from "../views/breadcrumb";
import TableCapteur from "../views/tableCapteur";
import ConsultCapteur from "../views/consultCapteur";
import dataCapteur from "./../database/sensorsdescription.json";

const History = () => {
  const [ListCapteurs, setListCapteurs] = useState([]);

  //consult var
  const [show, setConsultShow] = useState(false);
  const ConsultClose = () => setConsultShow(false);
  const ConsultShow = () => setConsultShow(true);
  const [capteurConsult, setcapteurConsult] = useState({});

  const findCapteur = (id) => {
    ConsultShow();
    const consultCapteur = dataCapteur.find((cap) => {
      return cap.id === id;
    });
    setcapteurConsult(consultCapteur);
  };
  useEffect(() => {
    if (localStorage.getItem("deleted")) {
      setListCapteurs(JSON.parse(localStorage.getItem("deleted")));
    }
  }, []);
  return (
    <div>
      <BreadCrumb page="Capteurs" />

      <div className="cardTemplate shadow-sm">
        <div className="content-cardTemplate">
          <TableCapteur ListCapteurs={ListCapteurs} findCapteur={findCapteur} />
        </div>
      </div>

      <ConsultCapteur
        show={show}
        ConsultClose={ConsultClose}
        capteurConsult={capteurConsult}
      />
    </div>
  );
};

export default History;

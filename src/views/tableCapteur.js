import { BiTrashAlt, BiPlayCircle } from "react-icons/bi";

const TableCapteur = ({ ListCapteurs, DeleteShow, findCapteur }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>
            <div className="data"></div>
          </th>
          <th>
            <div className="data">Nom</div>
          </th>
          <th>
            <div className="data">Description</div>
          </th>
          <th>
            <div className="data">Taille de Graphe</div>
          </th>
          <th>
            <div className="data">Date de création</div>
          </th>
          <th>
            <div className="data"></div>
          </th>
        </tr>
      </thead>
      <tbody>
        {ListCapteurs.map((item, key) => {
          return (
            <tr key={key}>
              <td>
                <div className="data">
                  <div
                    className="picture"
                    style={{
                      backgroundImage: "url(" + item.img + ")",
                    }}
                  ></div>
                </div>
              </td>
              <td>
                <div className="data">{item.name}</div>
              </td>
              <td>
                <div className="data">{item.describe}</div>
              </td>
              <td>
                <div className="data">{item.width} /12</div>
              </td>
              <td>
                <div className="data">{item.dateOfcreation}</div>
              </td>
              <td>
                <div className="actions">
                  <div
                    className="action"
                    onClick={() => {
                      findCapteur(item.IdOfCapteurFromList);
                    }}
                  >
                    <BiPlayCircle />
                  </div>
                  {typeof DeleteShow === "function" ? (
                    <div
                      className="action"
                      onClick={() => {
                        DeleteShow(item.id);
                      }}
                    >
                      <BiTrashAlt />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableCapteur;

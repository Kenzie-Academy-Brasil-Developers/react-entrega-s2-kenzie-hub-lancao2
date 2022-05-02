import logo from "../../assets/logo.svg";
import plus from "../../assets/Add.svg";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import AddTach from "../../components/AddTech/AddTech";
import axios from "axios";
import { Link } from "react-router-dom";
import EditTech from "../../components/EditTech/EditTech";
import "./style.css";

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    position: "absolute",
    top: "20%",
    left: "10px",
    right: "10px",
    bottom: "20%",
    border: "none",
    background: "#212529",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "0px",
  },
};

const Dashboard = () => {
  const [techs, setTechs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [userName, setUserName] = useState([]);
  const [userStatus, setUserStatus] = useState([]);
  const [atualTech, setAtualTech] = useState([]);
  const [techId, setTechId] = useState([]);

  const user_id = localStorage.getItem("@Kenziehub:user");
  useEffect(() => {
    axios
      .get(`https://kenziehub.herokuapp.com/users/${user_id}`)
      .then((response) => {
        setTechs(response.data.techs);
        setUserName(response.data.name);
        setUserStatus(response.data.course_module);
      });
  }, [techs]);

  const handleOpenModal = () => {
    modalOpen === false ? setModalOpen(true) : setModalOpen(false);
  };
  const handleOpenModalEdit = () => {
    modalOpenEdit === false ? setModalOpenEdit(true) : setModalOpenEdit(false);
  };
  const functionModalEdit = (event) => {
    setTechId(event.id);
    setAtualTech(event.title);
    handleOpenModalEdit();
  };
  return (
    <div className="dashboardScream">
      <header>
        <img src={logo} alt="Logo KenzieHub" />
        <Link to="/">
          <button>Sair</button>
        </Link>
      </header>
      <div className="userProfile">
        <h3>Olá, {userName}</h3>
        <p>{userStatus}</p>
      </div>

      <div className="techs">
        <div className="techs_header">
          <h3>Tecnologias</h3>
          <button onClick={handleOpenModal}>
            <img src={plus} alt="button add tech" />
          </button>
        </div>
        <ul>
          {techs &&
            techs.map((event, index) => (
              <li key={index} onClick={() => functionModalEdit(event)}>
                <h4>{event.title}</h4>
                <p>{event.status}</p>
              </li>
            ))}
        </ul>
      </div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={handleOpenModal}
        style={customStyles}
      >
        <AddTach handleOpenModal={handleOpenModal} />
      </Modal>
      <Modal
        isOpen={modalOpenEdit}
        onRequestClose={handleOpenModalEdit}
        style={customStyles}
      >
        <EditTech
          techId={techId}
          atualTech={atualTech}
          handleOpenModalEdit={handleOpenModalEdit}
        />
      </Modal>
    </div>
  );
};
export default Dashboard;

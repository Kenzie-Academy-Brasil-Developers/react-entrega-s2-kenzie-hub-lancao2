import logo from "../../assets/logo.svg";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import AddTach from "../../components/AddTech/AddTech";
import axios from "axios";
import { Link } from "react-router-dom";
import EditTech from "../../components/EditTech/EditTech";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
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
    <>
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
      <header>
        <img src={logo} alt="Logo KenzieHub" />
        <Link to="/">
          <button>Sair</button>
        </Link>
      </header>
      <div className="UserProfile">
        <h3>Olá, {userName}</h3>
        <p>{userStatus}</p>
      </div>

      <div className="techs">
        <div>
          <h3>Tecnologias</h3>
          <button onClick={handleOpenModal}> open</button>
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
    </>
  );
};
export default Dashboard;

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
const EditTech = ({ techId, atualTech, handleOpenModalEdit }) => {
  const token = localStorage.getItem("@Kenziehub:token");
  const schema = yup.object().shape({
    status: yup.string().required("Campo obrigatorio"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    const techStatus = {
      status: data.status,
    };

    axios
      .put(
        `https://kenziehub.herokuapp.com/users/techs/${techId}`,
        techStatus,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        handleOpenModalEdit();
        return toast.success("Tecnologia alterada com sucesso", {
          theme: "dark",
        });
      })
      .catch((erro) => toast.error("Ops, algo deu errado", { theme: "dark" }));
  };

  const deleteTech = () => {
    axios
      .delete(`https://kenziehub.herokuapp.com/users/techs/${techId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        handleOpenModalEdit();
        return toast.success("Tecnologia deletada com sucesso", {
          theme: "dark",
        });
      })
      .catch((err) =>
        toast.error(" delet Ops, algo deu errado", { theme: "dark" })
      );
  };

  return (
    <>
      <div className="header">
        <h2>Detalhes da Tecnologia</h2>
        <button onClick={handleOpenModalEdit}>Sair</button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Nome do projeto
          <input type="text" value={atualTech} disabled="true" />
          <span>{errors.tech?.message}</span>
        </label>
        <label>
          Selecione Status
          <select {...register("status")}>
            <option value="Iniciante">Iniciante</option>
            <option value="Intermediario">Intermediario</option>
            <option value="Avançado">Avançado</option>
          </select>
          <span>{errors.status?.message}</span>
        </label>
        <div className="buttons">
          <button type="submit">Salvar Alteraçoes</button>
          <button className="delete" onClick={deleteTech}>
            Excluir
          </button>
        </div>
      </form>
    </>
  );
};
export default EditTech;

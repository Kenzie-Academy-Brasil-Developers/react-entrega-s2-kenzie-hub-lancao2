import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
import "./style.css";
const AddTach = ({ handleOpenModal }) => {
  const schema = yup.object().shape({
    title: yup.string().required("Campo obrigatorio"),
    status: yup.string().required("Campo obrigatorio"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    const token = localStorage.getItem("@Kenziehub:token");
    console.log(token);

    axios
      .post("https://kenziehub.herokuapp.com/users/techs", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        handleOpenModal();
        return toast.success("Tecnologia adicionada com sucesso", {
          theme: "dark",
        });
      })
      .catch((err) => toast.error("Ops, algo deu errado", { theme: "dark" }));
  };

  return (
    <div className="modalAdd">
      <div className="modalAdd_header">
        <h2>Cadastrar tecnologia</h2>
        <button onClick={handleOpenModal}>X</button>
      </div>
      <div className="modalAdd_form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Nome
            <input type="text" {...register("title")} />
            <span>{errors.title?.message}</span>
          </label>
          <label>
            Selecione Status
            <select {...register("status")}>
              <option value="Iniciante">Iniciante</option>
              <option value="Intermediario">Intermediario</option>
              <option value="Avançado">Avançado</option>
            </select>
            {errors.status?.message}
          </label>
          <button type="submit">Cadastrar tecnologia</button>
        </form>
      </div>
    </div>
  );
};
export default AddTach;

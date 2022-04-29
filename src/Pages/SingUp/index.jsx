import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
const SingUp = () => {
  const history = useHistory();
  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatorio"),
    email: yup.string().required("Campo obrigatorio").email("email invalido"),
    password: yup
      .string()
      .required("Campo obrigatorio")
      .min(6, "Deve ter mais de 5 digitos"),
    confirmpassword: yup
      .string()
      .required("Campo obrigatorio")
      .oneOf([yup.ref("password"), null], "Senha divergente"),
    course_modules: yup.string().required("Campo Obrigatorio"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const backToLogin = (second) => {
    const timer = setTimeout(() => {
      history.push("/");
    }, second * 1000);
    return () => clearTimeout(timer);
  };

  const onSubmit = (data) => {
    const { email, password, name, course_modules } = data;
    const singUpUser = {
      email: email,
      password: password,
      name: name,
      bio: "Lorem ipsum dolor emet",
      contact: "Não enviado",
      course_module: course_modules,
    };
    console.log(singUpUser);
    axios
      .post("https://kenziehub.herokuapp.com/users", singUpUser)
      .then((response) => {
        console.log(response);
        toast.success("Conta criada com sucesso", {
          theme: "dark",
        });
        backToLogin(2);
      })
      .catch((error) => {
        toast.error("ops, Algo deu errado", {
          theme: "dark",
        });
      });
  };

  return (
    <div className="SingUpScream">
      <div className="SingUpHeader">
        <img src={logo} alt="Logo kenzie hub" />
        <Link to="/">
          <button>Voltar</button>
        </Link>
      </div>
      <div className="SingUpConteiner">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Nome
            <input type="text" {...register("name")} />
            <span>{errors.name?.message}</span>
          </label>
          <label>
            Email
            <input type="text" {...register("email")} />
            <span>{errors.email?.message}</span>
          </label>
          <label>
            Senha
            <input type="password" {...register("password")} />
            <span>{errors.password?.message}</span>
          </label>
          <label>
            Confirmar Senha
            <input type="password" {...register("confirmpassword")} />
            <span>{errors.confirmpassword?.message}</span>
          </label>
          <label>
            Selecionar Modulo
            <select {...register("course_modules")}>
              <option value="Primeiro módulo (Introdução ao Frontend)">
                Primeiro módulo (Introdução ao Frontend)
              </option>
              <option value="Segundo módulo (Frontend Avançado)">
                Segundo módulo (Frontend Avançado)
              </option>
              <option value="Terceiro módulo (Introdução ao Backend)">
                Terceiro módulo (Introdução ao Backend)
              </option>
              <option value="Quarto módulo (Backend Avançado)">
                Quarto módulo (Backend Avançado)
              </option>
            </select>
            <span>{errors.course_modules?.message}</span>
          </label>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};
export default SingUp;

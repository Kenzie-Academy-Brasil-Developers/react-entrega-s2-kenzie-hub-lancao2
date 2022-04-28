import logo from "../../assets/logo.svg";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const Login = ({ setUser }) => {
  const history = useHistory;

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Campo Email é obrigatorio")
      .email("email invalido"),
    password: yup.string().required("Campo Senha é obrigatorio"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("https://kenziehub.herokuapp.com/sessions", data)
      .then((response) => {
        history.push(`/user/${response.user.name}`);
        setUser(response.data.user);
        window.localStorage.clear();
        window.localStorage.setItem("@Kenziehub:token", response.data.token);
        window.localStorage.setItem("@Kenziehub:user", response.data.user);
      })
      .catch(() =>
        toast.error("Ops, algo deu errado", {
          theme: "dark",
        })
      );
  };

  return (
    <div className="LoginScream">
      <img src={logo} alt="Logo kenzie hub" />
      <div className="Login_Conteiner">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Email
            <input type="text" {...register("email")} />
            <span>{errors.email?.message}</span>
          </label>
          <label>
            Senha <input type="password" {...register("password")} />
            <span>{errors.password?.message}</span>
          </label>
          <button type="submit">Entrar</button>
        </form>
        <div className="newSingup">
          <label>
            Ainda nao possue uma conta?
            <Link to="/SingUp">
              <button>Cadastre-se</button>
            </Link>
          </label>
        </div>
      </div>
    </div>
  );
};
export default Login;

import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import InputComponent from "../../components/Input-Component/inputComponent";
import { AppContext } from "../../context/AppContext";
import { auth } from "../../services/firebaseConection";

const schema = z.object({
  email: z
    .string()
    .email("Este campo é obrigatório!")
    .nonempty("Preencha todos os campos!"),
  name: z.string().nonempty("Preencha todos os campos!"),
  password: z.string().nonempty("Preencha todos os campos!"),
});

type FormData = z.infer<typeof schema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const { user, handleInfoUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmitUser = (data: FormData) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        handleInfoUser({
          email: data.email,
          name: data.name,
        });
        console.log(data);
        navigate(`/user/${user?.uid}`, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <section className="w-2xl h-95 max-h-screen flex flex-col p-4  items-center justify-center bg-slate-300 rounded-lg m-3 gap-4">
        <form className="w-full px-4" onSubmit={handleSubmit(handleSubmitUser)}>
          <h1 className="text-3xl font-medium my-2 text-center ">
            Dev<span className="text-3xl font-medium text-blue-500">Post</span>
          </h1>
          <div className="flex flex-col w-full">
            <label className="font-medium text-black">Email</label>
            <InputComponent
              register={register}
              error={errors.email?.message}
              type="email"
              name="email"
              placeholder="Digite seu email"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium text-black">Senha</label>
            <InputComponent
              type="password"
              name="password"
              placeholder="********"
              error={errors.password?.message}
              register={register}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium text-black">Nome do usuário</label>
            <InputComponent
              type="text"
              name="name"
              placeholder="Digite o nome do usuário"
              error={errors.name?.message}
              register={register}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-black p-2 rounded-lg font-medium text-xl mt-2 cursor-pointer"
          >
            Entrar
          </button>
        </form>
        <p className="mb-5 text-lg font-medium text-center">
          Ainda não possui conta ?{" "}
          <a href="/register" className="text-lg text-red-500 font-medium">
            Cadastre-se
          </a>
        </p>
      </section>
    </main>
  );
};

export default LoginPage;

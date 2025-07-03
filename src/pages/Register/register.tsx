import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import z from "zod";

import InputComponent from "../../components/Input-Component/inputComponent";
import { auth, db } from "../../services/firebaseConection";

const schema = z.object({
  name: z.string().nonempty("Digite seu nome"),
  age: z.string().nonempty("Digite sua idade"),
  userName: z.string().nonempty("Digite o nome para seu usuario"),
  email: z
    .string()
    .email("Este campo é obrigatório!")
    .nonempty("Preencha todos os campos!"),
  password: z
    .string()
    .min(6, "Mínimo 6 caracteres")
    .nonempty("Preencha todos os campos!"),
});

type FormData = z.infer<typeof schema>;

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  // const { signed, handleInfoUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleRegisterUser = async (data: FormData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential;
      await setDoc(doc(db, "users", user.user.uid), {
        name: data.name,
        userName: data.userName,
        email: user.user.email,
        age: data.age,
      });
      toast.success("Usuário criado com sucesso!");
      navigate(`/user/${user.user.uid}`);
    } catch (error) {
      toast.error("Error ao cadastrar usuário!");
      console.log(error);
    }
  };

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <section className="w-full max-w-xl  flex flex-col p-4  items-center justify-center bg-slate-300 rounded-lg m-3 ">
        <form
          className="w-full p-4 "
          onSubmit={handleSubmit(handleRegisterUser)}
        >
          <h1 className="text-3xl font-medium my-2 text-center ">
            Dev<span className="text-3xl font-medium text-blue-500">Post</span>
          </h1>
          <div className="flex flex-col w-full ">
            <label className="font-medium text-black">Nome</label>
            <InputComponent
              register={register}
              error={errors.name?.message}
              type="text"
              name="name"
              placeholder="Digite seu nome"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium text-black">Idade</label>
            <InputComponent
              register={register}
              error={errors.age?.message}
              type="text"
              name="age"
              placeholder="Digite sua idade"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium text-black">Nome do usuário</label>
            <InputComponent
              register={register}
              error={errors.userName?.message}
              type="text"
              name="userName"
              placeholder="Digite seu nome de usuário"
            />
          </div>
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
          <button
            type="submit"
            className="w-full bg-white text-black p-2 rounded-lg font-medium text-xl mt-4 cursor-pointer"
          >
            Criar
          </button>
        </form>
        <p className="mb-4 text-lg font-medium">
          já possui uma conta ?{" "}
          <a href="/login" className="text-lg text-red-500 font-medium">
            Faça login
          </a>
        </p>
      </section>
    </main>
  );
};

export default RegisterPage;

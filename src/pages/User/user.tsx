import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import z from "zod";

import InputComponent from "../../components/Input-Component/inputComponent";
import NavComponent from "../../components/NavBar-Component/navComponent";
import { AppContext } from "../../context/AppContext";
import { db } from "../../services/firebaseConection";

const schema = z.object({
  title: z.string().nonempty("Preencha todos os campos!"),
  author: z.string().nonempty("Preencha todos os campos!"),
  description: z.string().nonempty("Preencha todos os campos!"),
});

type FormData = z.infer<typeof schema>;

const UserProfilePage = () => {
  const { signed, user } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  if (!signed) {
    return <Navigate to="/login" />;
  }

  const handleAddPost = (data: FormData) => {
    addDoc(collection(db, "posts"), {
      Author: data.author,
      Description: data.description,
      Title: data.title,
      created: new Date(),
    })
      .then(() => {
        reset();
        toast.success("Post adicionado com sucesso!");
      })
      .catch((error) => {
        toast.error("Ocorreu um erro na sua postagem!");
        console.log(error);
      });
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <NavComponent />
      <section className="flex items-center justify-between m-2 p-2">
        <div className="border-1 rounded-xl w-xs h-105 bg-slate-500  ">
          <h1 className="text-black font-medium text-xl text-center p-4">
            Dados do usuario
          </h1>
          <div className="flex flex-col gap-1">
            <p>Nome: {user?.name}</p>
          </div>
        </div>
        <div className="flex flex-col w-xl max-w-2xl h-105 max-h-screen bg-slate-500 rounded-xl p-4 m-3 gap-2">
          <h1 className="text-black font-medium text-xl text-center">
            Postagem
          </h1>
          <form className="w-full p-2" onSubmit={handleSubmit(handleAddPost)}>
            <div className="flex flex-col gap-1">
              <label className="text-xl  text-black ">Título</label>
              <InputComponent
                register={register}
                placeholder="Digite o título do post"
                name="title"
                type="text"
                error={errors.title?.message}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xl  text-black ">Autor</label>
              <InputComponent
                register={register}
                placeholder="Digite seu nome"
                name="author"
                type="text"
                error={errors.author?.message}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xl  text-black ">Descrição</label>
              <textarea
                className="border-1 rounded-lg bg-white text-black w-full h-24 px-2 outline-none mb-2"
                {...register("description")}
                name="description"
                id="description"
                placeholder="Digite seu comentário"
              />
            </div>
            <button
              className="w-full items-center justify-center bg-black text-white text-lg p-1.5 rounded-lg font-medium"
              type="submit"
            >
              Postar
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default UserProfilePage;

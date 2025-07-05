import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { AppContext } from "../../context/AppContext";
import { db } from "../../services/firebaseConection";

export interface PostProps {
  id: string;
  title: string;
  author: string;
  description: string;
}

const PostsPage = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = () => {
      if (!user?.uid) {
        navigate("/login", { replace: true });
        return;
      }
      const postRef = collection(db, "posts");
      const queryRef = query(postRef, where("uuid", "==", user.uid));

      getDocs(queryRef).then((snapshot) => {
        const listPosts: PostProps[] = [];
        snapshot.forEach((doc) => {
          listPosts.push({
            id: doc.id,
            title: doc.data().title,
            author: doc.data().author,
            description: doc.data().description,
          });
        });

        setPosts(listPosts);
        console.log(listPosts);
      });
    };
    loadPosts();
  }, [user]);

  const handleDeletePost = async (id: string) => {
    const postItem = id;
    const postRef = doc(db, "posts", postItem);
    await deleteDoc(postRef)
      .then(() => {
        toast.success("Post deletado com sucesso!");
        setPosts(posts.filter((post) => post.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <div
          className="flex flex-col bg-slate-100 m-2 gap-2 rounded-sm p-2 lg:flex "
          key={post.id}
        >
          <div className="flex items-center justify-between">
            <Link
              className="p-1 border-1 rounded-lg bg-black"
              to={`/user/${user?.uid}`}
            >
              <h1 className="text-white font-medium text-xl">{post.author}</h1>
            </Link>

            <p className="text-sm text-red-500 font-medium">{post.id}</p>
          </div>
          <hr className="bg-slate-900" />
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <h1 className="font-bold text-black text-xl">{post.author}:</h1>
              <h1 className="text-black text-xl">{post.title}</h1>
            </div>
            <div className="w-full border-1 rounded-lg p-1 h-30 ">
              {post.description}
            </div>

            <button
              onClick={() => handleDeletePost(post.id)}
              className="w-full p-2 bg-slate-800 text-white font-medium rounded-lg cursor-pointer mb-2"
            >
              Deletar Post
            </button>
          </div>
        </div>
      ))}
    </main>
  );
};

export default PostsPage;

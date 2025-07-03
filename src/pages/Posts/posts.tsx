import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { db } from "../../services/firebaseConection";

export interface PostProps {
  id: string;
  title: string;
  author: string;
  description: string;
}

const PostsPage = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    handleSearchPosts();
  }, [posts]);

  const handleSearchPosts = async () => {
    const PostRef = collection(db, "posts");
    await getDocs(PostRef)
      .then((snapshot) => {
        const lista: PostProps[] = [];
        snapshot.forEach((doc) => {
          if (!doc.data()) {
            navigate("/");
          }
          lista.push({
            id: doc.id,
            title: doc.data().Title,
            author: doc.data().Author,
            description: doc.data().Description,
          });
        });
        setPosts(lista);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main className="w-full h-screen flex flex-col bg-slate-400 gap-4">
      {posts.map((post) => (
        <div
          className="flex flex-col bg-slate-100 m-2 gap-2 rounded-sm p-2"
          key={post.id}
        >
          <div className="flex items-center justify-between">
            <h1 className="text-black font-medium text-xl">{post.author}</h1>
            <p className="text-sm text-red-500 font-medium">{post.id}</p>
          </div>
          <hr className="bg-slate-900" />
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <h1 className="font-bold text-black text-xl">{post.author}:</h1>
              <h1 className="text-black text-xl">{post.title}</h1>
            </div>
            <div className="w-full border-1 rounded-lg p-1 h-30 mb-4">
              {post.description}
            </div>
          </div>
        </div>
      ))}
    </main>
  );
};

export default PostsPage;

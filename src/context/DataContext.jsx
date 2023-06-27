import { useState, useContext, createContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useJwt } from "react-jwt";

export const DataContext = createContext();

export default function DataContextProvider(props) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [avatarImg, setAvatarImg] = useState(null);
  const [postImg, setPostImg] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [flag, setFlag] = useState(false);

  const { token, login } = useContext(AuthContext);

  const { decodedToken } = useJwt(token);

  console.log(".split error, our token", decodedToken)

  // getUserPosts
  const getUserPosts = async () => {
    try {
      const res = await fetch("http://localhost:8080/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // getAvatarImage
  const getAvatarImage = async () => {
    try {
      const res = await fetch("http://localhost:8080/avatar/getavatar", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setAvatarImg(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentUser = async () => {
    try {
      const data = await fetch(`http://localhost:8080/user/${decodedToken?._id}`)
      const user = await data.json()
      setCurrentUser(user.data)
      console.log("our current user", user)
    } catch (error) {
      console.error(error)
    }
  }

  // findAndUpdateUser
  const findAndUpdateUser = async () => {
    const user = avatarImg?.avatar.find(
      (userAvatar) => userAvatar?.user_id === decodedToken?._id
    );
    const databody = {
      avatar: user?.url,
      _id: user?.user_id,
    };
    await fetch("http://localhost:8080/user/updateuser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(databody),
    });
  };

  useEffect(() => {
    getAvatarImage();
  }, [token, currentUser]);

  useEffect(() => {
    if(decodedToken)
    getCurrentUser();
  }, [flag, decodedToken]);

  useEffect(() => {
    if(avatarImg)
    findAndUpdateUser();
  }, [avatarImg]);

  return (
    <DataContext.Provider
      value={{
        login,
        loading,
        posts,
        setPosts,
        setLoading,
        getUserPosts,
        decodedToken,
        token,
        currentUser,
        setFlag,
        flag,
        findAndUpdateUser,
        postImg,
        setPostImg,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

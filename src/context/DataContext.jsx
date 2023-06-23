import { useState, useContext, createContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useJwt } from "react-jwt";

export const DataContext = createContext();

export default function DataContextProvider(props) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [avatarImg, setAvatarImg] = useState(null);
  const [postImg, setPostImg] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [flag, setFlag] = useState(false);

  const { token, login } = useContext(AuthContext);

  const { decodedToken } = useJwt(token);

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

  // getCurrentUser
  const getCurrentUser = () => {
    const singleUser = allUsers?.data.find(
      (user) => user?._id === decodedToken?._id
    );
    setCurrentUser(singleUser);
  };

  // getAllUsers
  const getAllUsers = async () => {
    try {
      const res = await fetch(`http://localhost:8080/user/getallusers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setAllUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  // findAndUpdateUser
  const findAndUpdateUser = async () => {
    const user = avatarImg?.avatar.find(
      (userAvatar) => userAvatar?.user_id === decodedToken?._id
    );
    const databody = {
      avatar: user?.url,
      _id: user?.user_id,
    };
    const data = await fetch("http://localhost:8080/user/updateuser", {
      method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      body: JSON.stringify(databody),
    });
  };

  useEffect(() => {
    getAllUsers();
  }, [flag]);

  useEffect(() => {
    getAvatarImage();
  }, [token, currentUser]);

  useEffect(() => {
    getCurrentUser();
  }, [allUsers]);

  useEffect(() => {
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
        allUsers,
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

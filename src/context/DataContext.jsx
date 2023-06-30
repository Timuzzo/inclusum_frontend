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
  const [dbFacilitiesData, setDbFacilitiesData] = useState([]);
  const [allDBTrainStations, setAllDBTrainStations] = useState([]);
  const [cityPosts, setCityPosts] = useState([]);
  const [germanCities, setGermanCities] = useState({});

  const { token, login } = useContext(AuthContext);

  const { decodedToken } = useJwt(token);

  // getUserPosts
  const getUserPosts = async () => {
    try {
      const res = await fetch("https://inclusum.onrender.com/posts", {
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
      const res = await fetch(
        "https://inclusum.onrender.com/avatar/getavatar",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setAvatarImg(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentUser = async () => {
    try {
      const data = await fetch(
        `https://inclusum.onrender.com/user/${decodedToken?._id}`
      );
      const user = await data.json();
      setCurrentUser(user.data);
    } catch (error) {
      console.error(error);
    }
  };

  // get posts based on current users city in profile
  const getCityPosts = async () => {
    try {
      const data = await fetch(
        `https://inclusum.onrender.com/posts/${currentUser?.city}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const cityPost = await data.json();
      setCityPosts(cityPost);
    } catch (error) {
      console.error(error);
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
    await fetch("https://inclusum.onrender.com/user/updateuser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(databody),
    });
  };

  // get all Deutsche Bahn train stations from MongoDB
  const getAllDBTrainStations = async () => {
    try {
      const res = await fetch(
        "https://inclusum.onrender.com/station/alltrainstations"
      );
      const data = await res.json();
      setAllDBTrainStations(data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // get Deutsche Bahn inactive facility data

  const getDbFacilitiesData = async () => {
    try {
      const res = await fetch(
        "https://apis.deutschebahn.com/db-api-marketplace/apis/fasta/v2/facilities",
        {
          headers: {
            Accept: "application/json",
            "DB-Client-Id": process.env.REACT_APP_ID,
            "DB-Api-Key": process.env.REACT_APP_KEY,
          },
        }
      );
      const data = await res.json();
      const inactiveResults = data?.filter(
        (result) => result.state === "INACTIVE"
      );
      setDbFacilitiesData(inactiveResults);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //merge dbFacilitiesData with train Station data from MongoDB

  const mergedDBDataArray = dbFacilitiesData.map((facility) => {
    const haveEqualStationNumber = (stationNumber) =>
      stationNumber.stationNumber === facility.stationnumber;
    const stationNameWithEqualNumber = allDBTrainStations.find(
      haveEqualStationNumber
    );
    return Object.assign({}, facility, stationNameWithEqualNumber);
  });

  // fetch all available German cities

  const getGermanCities = async () => {
    try {
      const res = await fetch(
        "https://gist.githubusercontent.com/Occator/43f453889148735abb69dd6cf49635ed/raw/9b1dd9d2544c26282ed53a31db8236bfd6d6cc45/german_cities.json  "
      );

      const data = await res.json();
      console.log("data", data);
      setGermanCities(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getGermanCities();
  }, []);

  useEffect(() => {
    getAllDBTrainStations();
  }, []);

  useEffect(() => {
    if (currentUser) getCityPosts();
  }, [currentUser]);

  useEffect(() => {
    getDbFacilitiesData();
  }, []);

  useEffect(() => {
    if (!avatarImg) getAvatarImage();
  }, [token, currentUser]);

  useEffect(() => {
    if (decodedToken) getCurrentUser();
  }, [flag, decodedToken]);

  useEffect(() => {
    if (avatarImg) findAndUpdateUser();
  }, [avatarImg]);

  console.log("german cities", germanCities);

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
        mergedDBDataArray,
        cityPosts,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

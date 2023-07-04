import { useState, useContext, createContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useJwt } from "react-jwt";

export const DataContext = createContext();

export default function DataContextProvider(props) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMyAccount, setLoadingMyAccount] = useState(false);
  const [avatarImg, setAvatarImg] = useState(null);
  const [postImg, setPostImg] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [flag, setFlag] = useState(false);
  const [mergedDBDataArray, setMergedDBDataArray] = useState([]);
  const [filteredDBPosts, setFilteredDBPosts] = useState([]);
  const [cityPosts, setCityPosts] = useState([]);

  const { token, login } = useContext(AuthContext);

  const { decodedToken } = useJwt(token);

  // getUserPosts
  const getUserPosts = async () => {
    setLoadingMyAccount(true);
    try {
      const res = await fetch("https://inclusum.onrender.com/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMyAccount(false);
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
    setLoading(true);
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
    } finally {
      setLoading(false);
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


  //merge dbFacilitiesData with train Station data from MongoDB

  
  
  useEffect(() => {
  // get all Deutsche Bahn train stations from MongoDB
  let dbFacilitiesData = []
  let allDBTrainStations=[]
  const getAllDBTrainStations = async () => {
    try {
      const res = await fetch(
        "https://inclusum.onrender.com/station/alltrainstations"
      );
      const data = await res.json();
      allDBTrainStations = data?.data;
    } catch (error) {
      console.log(error);
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
        console.log("facilities",inactiveResults)
      dbFacilitiesData= inactiveResults;
    } catch (error) {
      console.log(error);
    }
  };
  const getData = async () => {
    await  getAllDBTrainStations();
    await getDbFacilitiesData();
    setMergedDBDataArray(dbFacilitiesData.filter(el => !!el.geocoordX && !!el.geocoordY ).map((facility) => {
      const haveEqualStationNumber = (stationNumber) =>
        stationNumber.stationNumber === facility.stationnumber;
      const stationNameWithEqualNumber = allDBTrainStations.find(
        haveEqualStationNumber
      );
      return Object.assign({}, facility, stationNameWithEqualNumber);
    }));

    
  }

  getData()
  }, []);

  useEffect(()=>{
    currentUser && setFilteredDBPosts(mergedDBDataArray?.filter((post) => post.stationName.includes(currentUser.city)))
  }, [mergedDBDataArray,currentUser])

  useEffect(() => {
    if (currentUser) getCityPosts();
  }, [currentUser, flag]);


  useEffect(() => {
    if (!avatarImg) getAvatarImage();
  }, [token, currentUser]);

  useEffect(() => {
    if (decodedToken) getCurrentUser();
  }, [flag, decodedToken]);

  useEffect(() => {
    if (avatarImg) findAndUpdateUser();
  }, [avatarImg]);

  console.log("description data", mergedDBDataArray);


 
  
  return (
    <DataContext.Provider
      value={{
        filteredDBPosts,
        login,
        loading,
        posts,
        setPosts,
        loadingMyAccount,
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

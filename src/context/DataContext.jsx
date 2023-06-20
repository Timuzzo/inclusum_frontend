import {useState, useContext, createContext} from 'react';
import {AuthContext} from '../context/AuthContext'
import {useJwt} from 'react-jwt';


export const DataContext = createContext();

export default function DataContextProvider(props){
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { token } = useContext(AuthContext);
    const { login } = useContext(AuthContext);
    
    const { decodedToken } = useJwt(token);

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

    return(
        <DataContext.Provider value={{login, loading, posts, setPosts, setLoading, getUserPosts, decodedToken, token }}>
            {props.children}
        </DataContext.Provider>
    )
}
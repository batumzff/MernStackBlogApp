import axios from "axios"
import { useSelector } from "react-redux";

const useAxios = () => {
   const { token } = useSelector(state=> state.auth)

    const axiosPublic = axios.create({
        baseURL: `${import.meta.env.VITE_BASE_URL}`,
      });

      const axiosWithToken = axios.create({
        baseURL: `${import.meta.env.VITE_BASE_URL}`,
        headers: {Authorization: `Token ${token}`}
      });
    
     
  return { axiosPublic, axiosWithToken }
}

export default useAxios
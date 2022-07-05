import { useContext } from "react";
import FirebaseContext from "../context/FirebaseContext";

const useAuth = () => {
    return useContext(FirebaseContext);
}

export default useAuth;
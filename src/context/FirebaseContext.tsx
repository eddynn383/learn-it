import { FC, createContext, useState, useEffect } from "react";
import { auth, db } from "../services/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, getDocs, setDoc, getDoc, onSnapshot, doc, query, where } from "firebase/firestore";

const FirebaseContext = createContext<IPropsContext>(null!);

interface IPropsFP {
    children: any;
}

interface IPropsContext {
    currentUser: any;
    setCurrentUser: any;
    currentPage: any;
    setCurrentPage: any;
    signup: any;
    signin: any;
    signout: any;
    getDB: any;
    getConditionedDB: any;
    setDB: any;
    getSnapshot: any;
}

export const FirebaseProvider:FC<IPropsFP> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(undefined)
    const [currentPage, setCurrentPage] = useState('Dashboard')
    const [loading, setLoading] = useState(true)

    const getDB = (dbGetAll:boolean, dbName:string, dbTarget:string) => {
        if (dbGetAll) {
            return getDocs(collection(db, dbName))
        }
        return getDoc(doc(db, dbName, dbTarget))
    }

    const getConditionedDB = (dbName:string, dbConditionTarget:string, dbCondition:string ) => {
        return getDocs(query(collection(db, dbName), where(dbConditionTarget, "==", dbCondition)))
    }

    const setDB = (dbName:string, dbTarget:string, dbValue:any, dbMerge:boolean) => {
        return setDoc(doc(db, dbName, dbTarget), dbValue, {merge: dbMerge ? dbMerge : false})
    }

    const getSnapshot = (dbName:string, dbTarget:string) => {
        return onSnapshot(doc(db, dbName, dbTarget), (doc) => doc.data())
    }

    const signup = (email:string, password:string) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signin = (email:string, password:string) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user:any) => {
            setCurrentUser(user)
            setLoading(false)
        });

        return unsubscribe;
    },[])

    const value = {
        currentUser, 
        setCurrentUser,
        currentPage,
        setCurrentPage,
        signup,
        signin,
        signout,
        getDB,
        getConditionedDB,
        setDB,
        getSnapshot
    }

    return (
        <FirebaseContext.Provider value={value}>
            {!loading && children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseContext
import { getDocs, collection, addDoc, setDoc, doc } from "firebase/firestore"; 
import { getDb } from "./db.mjs"

const collection_name = "users"

export const findAll = async () => {
    const doc_refs = await getDocs(collection(getDb(), collection_name))

    const res = []
    

    doc_refs.forEach(users => {
        res.push({
            id: users.id, 
            ...users.data()
        })
    })

    return res
}

export const create = args => addDoc(collection(getDb(), collection_name), args)

export const update = args => {
    const {id, ...params} = args 
    return setDoc(doc(getDb(), collection_name, id), params)
}
import { useState, useEffect, useReducer } from "react";

import { db } from '../firebase/config'

import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null
}

const insertReducer = (state, action) => {
    switch (action.type) {

        case 'LOADING':
            return { loading: true, error: null }

        case 'INSERTED_DOC':
            return { loading: false, error: null }

        case 'ERROR':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const useInsertDocument = (docColection) => {

    const [response, dispatch] = useReducer(insertReducer, initialState)

    //deal with memory leak
    const [cancelled, setCancelled] = useState(false)
    console.log(cancelled)

    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action)
        } else {
            console.log('check function fail', 'cancelled state: ', cancelled)
        }
    }

    const insertDocument = async (document) => {
        setCancelled(false)
        checkCancelBeforeDispatch({ type: 'LOADING' })

        try {

            const newDocument = { ...document, createdAt: Timestamp.now() }

            const insertedDocument = await addDoc(
                collection(db, docColection),
                newDocument
            )
            
            setCancelled(false)
            checkCancelBeforeDispatch({
                type: 'INSERTED_DOC',
                payload: insertedDocument
            })

        } catch (error) {
            setCancelled(false)
            checkCancelBeforeDispatch({
                type: 'ERROR',
                payload: error.message
            })
        }
    }

    useEffect(() => {
        setCancelled(true)
    }, [])

    return { insertDocument, response }
}
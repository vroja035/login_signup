import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import { useRefreshMutation } from "../slices/authApiSlice"
import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../slices/authSlice"
import usePersist from "../hooks/usePersist"
import { CircularProgress } from "@mui/material"

const PersistState = () => {

    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)

    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    const navigate = useNavigate();

    useEffect(() => {

        if (effectRan.current === true) { // React 18 Strict Mode

            const verifyRefreshToken = async () => {
                //console.log('verifying refresh token')
                try {
                    //const response = 
                    await refresh()
                    //const { accessToken } = response.data
                    setTrueSuccess(true)
                }
                catch (err) {
                    //console.error(err)
                }
            }

            if (!token && persist) verifyRefreshToken()
        }

        return () => effectRan.current = true

        // eslint-disable-next-line
    }, [])


    let content
    if (isLoading) { //persist: yes, token: no
        content = <CircularProgress/>
    } else if (isError) { //persist: yes, token: no
        console.log('Error: Access Token Invalid.')
        content = navigate("/")
    } else{
        content = <Outlet />
    }

    return content;
}
export default PersistState
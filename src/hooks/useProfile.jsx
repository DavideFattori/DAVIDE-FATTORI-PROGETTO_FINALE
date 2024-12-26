import { useState, useEffect, useContext } from 'react'
import supabase from '../supabase/client'
import SessionContext from '../context/SessionContext'
import { toast, Bounce } from 'react-toastify';


export default function useProfile() {
    const session = useContext(SessionContext)
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [first_name, setFirst_name] = useState(null)
    const [last_name, setLast_name] = useState(null)
    const [avatar_url, setAvatar_url] = useState(null)

    useEffect(() => {
        let ignore = false
        async function getProfile() {

            if (!session) return
            
            setLoading(true)
            const { user } = session

            const { data, error } = await supabase
                .from('profiles')
                .select(`username, first_name, last_name, avatar_url`)
                .eq('id', user.id)
                .single()

            if (!ignore) {
                if (error) {
                    toast.error(error.message, {
                        position: "bottom-right",
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    });
                } else if (data) {
                    setUsername(data.username)
                    setFirst_name(data.first_name)
                    setLast_name(data.last_name)
                    setAvatar_url(data.avatar_url)
                }
            }

            setLoading(false)
        }

        getProfile()

        return () => {
            ignore = true
        }
    }, [session])


    return { loading, username, first_name, last_name, avatar_url, setUsername, setFirst_name, setLast_name, setAvatar_url, setLoading }

}
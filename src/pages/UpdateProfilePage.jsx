import { useContext } from 'react'
import { Link } from "react-router";
import supabase from '../supabase/client'
import SessionContext from '../context/SessionContext'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import Loader from "../components/Loader";
import useProfile from '../hooks/useProfile'
import Avatar from '../components/Avatar'
import '../style/profilePage.css'



export default function UpdateProfilePage() {
    const session = useContext(SessionContext)
    const { loading, username, first_name, last_name, avatar_url, setUsername, setFirst_name, setLast_name, setAvatar_url, setLoading } = useProfile()

    async function updateProfile(event, avatarUrl) {
        event.preventDefault()

        setLoading(true)
        const { user } = session

        const updates = {
            id: user.id,
            username,
            first_name,
            last_name,
            avatar_url: avatarUrl,
            updated_at: new Date(),
        }

        const { error } = await supabase.from('profiles').upsert(updates)

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
        } else {
            setAvatar_url(avatarUrl)
            toast.success('Modifiche effettuate con successo', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
        setLoading(false)
    }

    return (

        <div className="container-fluid text-white profileContainerCustom">
            <ToastContainer />
            <div className="row w-50">
                <div className="col-12">
                    <div className="rounded-3 p-4 form">
                        <h1>Modifica il tuo profilo</h1>
                        <form onSubmit={updateProfile} className='d-flex flex-column justify-content-center'>
                            {loading && <Loader />}

                            <Avatar
                                url={avatar_url}
                                size={150}
                                onUpload={(event, url) => {
                                    updateProfile(event, url)
                                }}
                            />

                            <label className='mb-1' htmlFor="username">Username</label>
                            <input className='rounded-pill inputCustom form-control'
                                id="username"
                                type="text"
                                required
                                value={username || ''}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <label className='mb-1 mt-3' htmlFor="first_name">Nome</label>
                            <input className='rounded-pill inputCustom form-control'
                                id="first_name"
                                type="text"
                                value={first_name || ''}
                                onChange={(e) => setFirst_name(e.target.value)}
                            />

                            <label className='mb-1 mt-3' htmlFor="last_name">Cognome</label>
                            <input className='rounded-pill inputCustom form-control'
                                id="last_name"
                                type="text"
                                value={last_name || ''}
                                onChange={(e) => setLast_name(e.target.value)}
                            />

                            <button className="btn rounded-pill mt-3 text-white btnCustom" type="submit" disabled={loading}>
                                {loading ? <Loader /> : 'Aggiorna'}
                            </button>

                            <button className="btn rounded-pill mt-3 text-white btnCustom" type="button" onClick={() => supabase.auth.signOut()}>
                                Esci
                            </button>

                        </form>

                    </div>
                </div>
            </div>
        </div>

    )
}
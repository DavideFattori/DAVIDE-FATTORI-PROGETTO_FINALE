import { useContext } from 'react'
import { useNavigate } from "react-router";
import supabase from '../supabase/client'
import SessionContext from '../context/SessionContext'
import { ToastContainer } from 'react-toastify';
import showToast from "../components/Toast";
import Loader from "../components/Loader";
import useProfile from '../hooks/useProfile'
import Avatar from '../components/Avatar'
import '../style/profilePage.css'



export default function UpdateProfilePage() {
    const session = useContext(SessionContext)
    const { loading, username, first_name, last_name, avatar_url, setUsername, setFirst_name, setLast_name, setAvatar_url, setLoading } = useProfile()
    const navigate = useNavigate()

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
            showToast(error.message, "error");
        } else {
            setAvatar_url(avatarUrl)
            showToast('Modifiche effettuate con successo', "success");
        }
        setLoading(false)
    }

    return (

        <div className="container-fluid text-white profileContainerCustom d-flex justify-content-center">
            <ToastContainer />
            <div className="row">
                <div className="col-12">
                    <div className="col-12 d-flex justify-content-center mb-3">
                        <button className="bg-transparent border-0 d-flex align-items-center fs-5 backBtn" onClick={() => navigate(-1)}><i className="fi fi-br-angle-left d-flex align-items-center"></i> indietro</button>
                    </div>
                    <div className="rounded-3 p-4 form">
                        <h1 className='text-center titleModifyProfile mb-2'>Modifica il tuo profilo</h1>
                        <form onSubmit={updateProfile} className='d-flex flex-column justify-content-center'>
                            {loading && <Loader />}

                            <Avatar
                                url={avatar_url}
                                size={150}
                                onUpload={(event, url) => {
                                    updateProfile(event, url)
                                }}
                            />

                            <label className='mb-1 mt-3' htmlFor="username">Username</label>
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
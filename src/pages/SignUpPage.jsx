import { Link, useNavigate } from 'react-router';
import supabase from '../supabase/client';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import '../style/logSignPages.css'

export default function SignUpPage() {

    const navigate = useNavigate();

    const handleSubmission = async (event) => {

        event.preventDefault();

        const formRegister = event.currentTarget;
        const { email, password, username, first_name, last_name } = Object.fromEntries(new FormData(formRegister));

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        username,
                        first_name,
                        last_name,
                    }
                }
            })
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
                toast.success('Utente registrato con successo', {
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
                await new Promise((resolve) => setTimeout(resolve, 3000));
                formRegister.reset();
                navigate('/');
            }
        } catch (error) {
            alert(error)
        }
    };





    return (
        <div className="container-fluid text-white formContainer">
            <ToastContainer />
            <div className="row w-50">
                <div className="col-12">
                    <div className="rounded-3 p-4 form">
                        <h1>Registrati</h1>
                        <form onSubmit={handleSubmission} className='d-flex flex-column justify-content-center'>
                            {/* <label className='mb-1' htmlFor="name">Nome</label> */}
                            <input className='rounded-pill inputCustom form-control mt-3' type="text" placeholder="Username" name="username" required />
                            {/* <label className='mb-1' htmlFor="name">Nome</label> */}
                            <input className='rounded-pill inputCustom form-control mt-3' type="text" placeholder="Nome" name="first_name" required />
                            {/* <label className='mb-1' htmlFor="name">Cognome</label> */}
                            <input className='rounded-pill inputCustom form-control mt-3' type="text" placeholder="Cognome" name="last_name" required />
                            {/* <label className='mb-1' htmlFor="email">Email</label> */}
                            <input className='rounded-pill inputCustom form-control mt-3' type="text" placeholder="Email" name="email" required />
                            {/* <label className='mb-1 mt-3' htmlFor="password">Password</label> */}
                            <input className='rounded-pill inputCustom form-control mt-3' type="password" placeholder="Password" name="password" required />
                            <button className='btn rounded-pill mt-3 text-white btnCustom' type="submit">Registrati</button>
                        </form>
                        <h6 className='text-decoration-underline mb-0 mt-3'>Hai già un account? <Link className='text-decoration-none linkToLogin' to="/login">Accedi</Link></h6>
                    </div>
                </div>
            </div>
        </div>
    )
}
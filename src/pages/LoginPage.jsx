import { Link } from 'react-router';
import supabase from '../supabase/client';
import '../style/logSignPages.css'

export default function LoginPage() {

    const handleSignIn = async (event) => {
        event.preventDefault();
        const formLogin = event.currentTarget;
        const { email, password } = Object.fromEntries(new FormData(formLogin));
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            if (error) {
                alert(error)
            } else {
                formLogin.reset();
            }
        } catch (error) {
            alert(error)
        }
    };


    return (
        <div className="container-fluid text-white formContainer">
            <div className="row w-50">
                <div className="col-12">
                    <div className="rounded-3 p-4 form">
                        <h1>Accedi</h1>
                        <form onSubmit={handleSignIn} className='d-flex flex-column justify-content-center'>
                            <label className='mb-1' htmlFor="email">Email</label>
                            <input className='rounded-pill inputCustom form-control' type="text" placeholder="Email" name="email" required />
                            <label className='mb-1 mt-3' htmlFor="password">Password</label>
                            <input className='rounded-pill inputCustom form-control' type="password" placeholder="Password" name="password" required />
                            <button className='btn rounded-pill mt-3 text-white btnCustom' type="submit">Accedi</button>
                        </form>
                        <h6 className='text-decoration-underline mb-0 mt-3'>Non hai un account? <Link className='text-decoration-none linkToLogin' to="/signup">Registrati</Link></h6>
                    </div>
                </div>
            </div>
        </div>
    )
}
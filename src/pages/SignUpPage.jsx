import { Link } from 'react-router';
import supabase from '../supabase/client';
import '../style/logSignPages.css'

export default function SignUpPage() {

    const handleSubmission = async (event) => {

        event.preventDefault();
        const formRegister = event.currentTarget;
        const { email, password } = Object.fromEntries(new FormData(formRegister));
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            })
            if (error) {
                alert(error)
            } else {
                console.log(data);
                formRegister.reset();
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
                        <h1>Registrati</h1>
                        <form onSubmit={handleSubmission} className='d-flex flex-column justify-content-center'>
                            <label className='mb-1' htmlFor="email">Email</label>
                            <input className='rounded-pill inputCustom form-control' type="text" placeholder="Email" name="email" required />
                            <label className='mb-1 mt-3' htmlFor="password">Password</label>
                            <input className='rounded-pill inputCustom form-control' type="password" placeholder="Password" name="password" required />
                            <button className='btn rounded-pill mt-3 text-white btnCustom' type="submit">Registrati</button>
                        </form>
                        <h6 className='text-decoration-underline mb-0 mt-3'>Hai già un account? <Link className='text-decoration-none linkToLogin' to="/login">Accedi</Link></h6>
                    </div>
                </div>
            </div>
        </div>
    )
}
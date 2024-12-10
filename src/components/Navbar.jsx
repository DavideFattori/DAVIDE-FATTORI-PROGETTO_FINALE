import '../style/navbar.css'

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg position-absolute w-100">
            <div className="container-fluid">
                <a className="navbar-brand text-white" href="#"><img className='logoNav me-2' src="/logo_bordo.png" alt="logo" />Rehacktor</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <form className="d-flex w-100 ms-md-5 position-relative" role="search">
                        <input className="form-control me-2 rounded-pill searchInputCustom w-100 me-md-5" type="search" placeholder="Cerca" aria-label="Search" />
                        <button className="btnSearchNavCustom" type="submit"><i className="fi fi-rr-search"></i></button>
                    </form>

                    <ul className="navbar-nav ms-4 mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active text-white" aria-current="page" href="#">Registrati</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#">Accedi</a>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    )
}
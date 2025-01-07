import '../style/header.css'

export default function Header({text}) {
    return (
        <header>
            <div className="d-flex align-items-center ps-3 ps-md-5 headerTitleContainer">
                <h1 className='text-white display-3 fw-bold border-bottom border-3 w-75 pb-2 headerTitle'>{text.toUpperCase()}</h1>
            </div>
        </header>
    )
}
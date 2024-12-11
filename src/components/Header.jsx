import '../style/header.css'

export default function Header({text}) {
    return (
        <header>
            <div className="d-flex align-items-center ps-5 headerTitle">
                <h1 className='text-white display-3 fw-bold border-bottom border-3 w-75 pb-2'>{text}</h1>
            </div>
        </header>
    )
}
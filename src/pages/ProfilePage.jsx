import { Link } from "react-router";

export default function ProfilePage() {
    return (
        <div>
            <h1 className="text-white">Profile</h1>
            <Link to="/profile/update" className="text-white">Update</Link>
        </div>
    )
}
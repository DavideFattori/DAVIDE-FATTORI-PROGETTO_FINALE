import { Link } from "react-router";
import useProfile from '../hooks/useProfile'
import getProfileAvatar from "../hooks/getProfileAvatar";
import '../style/profilePage.css'

export default function ProfilePage() {

    const { loading, username, first_name, last_name, avatar_url } = useProfile()

    const avatarUrl = getProfileAvatar(avatar_url)
    

    return (
        <div className="container-fluid profileContainerCustom">
            <div className="row">
                <div className="col-8">
                    <img className="profileImage" src={avatarUrl} alt="profile-image" />
                    <h1 className="text-white">{username}</h1>
                    <Link to="/profile/update" className="text-white">Update</Link>
                </div>
            </div>
        </div>
    )
}
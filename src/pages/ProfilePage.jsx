import { Link } from "react-router";
import useProfile from '../hooks/useProfile'
import getProfileAvatar from "../hooks/getProfileAvatar";
import '../style/profilePage.css'

export default function ProfilePage() {

    const { loading, username, first_name, last_name, avatar_url } = useProfile()
    const avatarUrl = getProfileAvatar(avatar_url)
    
    
    return (
        <div className="container-fluid profileContainerCustom">
            <div className="row justify-content-center">
                <div className="col-3">
                    <img className="profileImage img-fluid" src={avatarUrl} alt="profile-image" />
                </div>
                <div className="col-4">
                    <h3 className="text-white">Username: {username}</h3>
                    <h3 className="text-white">Nome: {first_name}</h3>
                    <h3 className="text-white">Cognome: {last_name}</h3>
                    <Link to="/profile/update" className="text-white">Update</Link>
                </div>
            </div>
        </div>
    )
}
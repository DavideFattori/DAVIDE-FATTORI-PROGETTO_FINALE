import { useEffect, useState } from 'react'
import supabase from '../supabase/client'

export default function getProfileAvatar(url) {

    const [avatarUrl, setAvatarUrl] = useState(null)
    
    useEffect(() => {
        if (url) downloadImage(url)
    }, [url])

    async function downloadImage(path) {
        try {
            const { data, error } = await supabase.storage.from('avatars').download(path)
            if (error) {
                throw error
            }
            const url = URL.createObjectURL(data)
            setAvatarUrl(url)
        } catch (error) {
            console.log('Error downloading image: ', error.message)
        }
    }

    return avatarUrl

}
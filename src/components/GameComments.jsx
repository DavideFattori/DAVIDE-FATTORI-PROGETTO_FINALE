import { useState, useEffect, useContext } from "react";
import supabase from "../supabase/client";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import SessionContext from "../context/SessionContext";
import { format } from 'date-fns';
import '../style/gameDetail.css';


export default function GameComments({ game }) {

    const [comments, setComments] = useState([]);
    const session = useContext(SessionContext);


    //funzione per aggiungere un commento
    async function handleCommentSubmit(event) {
        event.preventDefault();
        const formComment = event.currentTarget;
        const { comment } = Object.fromEntries(new FormData(formComment));
        if (!comment) {
            toast.error('Inserisci un commento', {
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
            return;
        }
        const { error } = await supabase
            .from('comments')
            .insert([{
                profile_id: session.user.id,
                profile_username: session.user.user_metadata.username,
                game_id: game.id,
                content: comment
            }])
            .select();

        if (!error) {
            toast.success('Commento aggiunto', {
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
        }
    }


    const getInitialComments = async () => {

        if (comments.length) return;

        const { data, error } = await supabase
            .from('comments')
            .select(`*`)
            .eq('game_id', game.id)
            .order('created_at', { ascending: false });

        if (error) {
            setError(error);
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
            return;
        }

        setComments(data);
    };


    useEffect(() => {

        getInitialComments();

        const channel = supabase
            .channel('comments')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'comments'
                },
                () => getInitialComments()
            )
            .subscribe();

        return () => {
            if (channel) { supabase.removeChannel(channel) };
            channel.unsubscribe();
        }

    }, [])


    return (
        
            <div className="container-fluid bg-transparent border text-white rounded-3">
                <ToastContainer />
                <div className="row containerCommenti">
                    <div className="col-12 p-0">
                        {comments.length === 0 && <p className="m-0 text-white p-3">Non ci sono commenti</p>}
                        {comments.map((comment) => (
                            <div className="border-bottom p-3 d-flex flex-column" key={comment.id}>
                                <p className="m-0 text-white-50">{comment.profile_username}:</p>
                                <h6 className="m-0">{comment.content}</h6>
                                <p className="m-0 ms-auto text-white-50 dataCommento">{format(new Date(comment.created_at), 'dd/MM/yyyy, HH:mm')}</p>
                            </div>
                        ))}

                    </div>
                </div>
                {session &&
                    <form className="row py-2 border-top commentForm" onSubmit={handleCommentSubmit}>
                        <div className="col-12 d-flex">
                            <input className="w-100 rounded bg-transparent text-white commentInput" type="text" name="comment" placeholder="Scrivi un commento" />
                            <button className="btn ms-auto text-white commentSubmitButton" type="submit">Invia</button>
                        </div>
                    </form>
                }
            </div>
        
    )
}
import { useState, useEffect } from "react";
import supabase from "../supabase/client";

export default function GameComments({ game }) {

    const [comments, setComments] = useState([]);
    const [error, setError] = useState("");

    const getInitialComments = async () => {

        if (comments.length) return;

        const { data, error } = await supabase
            .from('comments')
            .select(`*`)
            .eq('game_id', game.id)
            .order('created_at', { ascending: false });

        if (error) {
            setError(error.message);
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
            <div className="row">
                <div className="col-12 p-0">
                    {comments.length === 0 && <p>Non ci sono commenti</p>}
                    {comments.map((comment) => (
                        <div className="border-bottom px-2 py-3" key={comment.id}>
                            <p className="m-0">{comment.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
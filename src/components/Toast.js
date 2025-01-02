import { toast, Bounce } from 'react-toastify';

export default function showToast(message, type) {
    if (type === "error") {
        return toast.error(message, {
            style: {
                width: "80%",
                right: "1rem",
            },
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


    } else if (type === "success") {
        return toast.success(message, {
            style: {
                width: "80%",
                right: "1rem",
            },
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
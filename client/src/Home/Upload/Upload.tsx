import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import auth from '../../firebase.init';
type FormValues = {
    title: string;
    note: string;
    email: string;
    errors?: string;
};
export default function Upload() {
    const [user] = useAuthState(auth)
    const email = user ? user.email : '';
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = async data => {
        const newData = {
            title: data.title || '',
            note: data.note,
            email: email
        }
        console.log(newData);
        reset();
        const res = await axios.post('http://localhost:5000/api/notes', newData);
        if (res.status === 200) {
            toast.success('Note added successfully');
        }

    }
    return (
        <div className="max-w-full md:w-1/2 mx-auto p-3">
            <form onSubmit={handleSubmit(onSubmit)}
                className="shadow-md rounded bg-base-100 p-5 md:px-10">
                <h1 className="font-bold">Add a note</h1>
                <div className="my-2">
                    <input
                        type="text"
                        placeholder="Title"
                        className="input input-bordered w-full"
                        {...register("title", { maxLength: 30 })}
                    />
                    <span>
                        {errors?.title && <p className="text-red-500">Max length is 30</p>}
                    </span>
                </div>
                <div className="my-2">
                    <textarea className="resize-y input input-bordered  w-full"
                        placeholder='Note'
                        {...register("note", { required: true })}
                    ></textarea>
                    <span>
                        {errors.note && <p className="text-red-500">Note is required</p>}
                    </span>
                </div>
                <div className="text-center">
                    <button
                        className="btn btn-primary text-white"
                    >
                        Save Note
                    </button>
                </div>
            </form>
        </div>
    )
}

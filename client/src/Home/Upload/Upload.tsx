import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
type FormValues = {
    title: string;
    note: string;
    email: string;
    errors?: string;
};
export default function Upload() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = async data => {
        const newData = {
            title: data.title || '',
            note: data.note,
            email: 'nahidhassanbulbul@gmail.com'
        }
        console.log(newData);
        reset();
        const res = await axios.post('http://localhost:5000/api/notes', newData);
        console.log(res);

    }
    return (
        <div className="max-w-full md:w-1/2 mx-auto p-3">
            <form onSubmit={handleSubmit(onSubmit)}
                className="shadow rounded bg-base-100 p-5 md:p-10">
                <div className="my-2">
                    <input
                        type="text"
                        placeholder="Title"
                        className="input input-bordered w-full"
                        {...register("title")}
                    />
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
                <div className="my-3 text-center">
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

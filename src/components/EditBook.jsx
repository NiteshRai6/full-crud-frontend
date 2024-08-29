import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function EditBook() {

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

    const navigate = useNavigate();

    const location = useLocation();
    const { state } = location;
    // console.log(state);

    setValue('title', state.title);
    setValue('author', state.author);
    setValue('pages', state.pages);
    setValue('published', state.published);

    async function handleFormSubmit(data) {
        try {
            const res = await axios.put(`http://localhost:4000/api/books/${state._id}`, data);
            console.log(res);
            if (res.data.success) {
                navigate('/');
            }
        }
        catch (err) {
            console.log(err);
        }
    }


    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-3xl m-10 text-gray-700'>Edit Book</h1>

            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className='text-xl flex flex-col gap-5 justify-center items-center'>

                <div className='flex flex-col gap-1'>
                    <label htmlFor='title'>Title</label>
                    <input
                        {...register('title', { required: true })}
                        type='text'
                        className='border border-gray-500 p-1 w-80'
                        id='title'
                    />
                    {errors.title && <p className='text-red-500'>Title is required.</p>}
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor='author'>Author</label>
                    <input
                        {...register('author', { required: true })}
                        type='text'
                        className='border border-gray-500 p-1 w-80'
                        id='author'
                    />
                    {errors.author && <p className='text-red-500'>Author is required.</p>}
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor='pages'>Pages</label>
                    <input
                        {...register('pages', { required: true })}
                        type='number'
                        className='border border-gray-500 p-1 w-80'
                        id='pages'
                    />
                    {errors.pages && <p className='text-red-500'>Pages is required.</p>}
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor='published'>Published On</label>
                    <input
                        {...register('published')}
                        type='date'
                        className='border border-gray-500 p-1 w-80'
                        id='published'
                    />
                </div>

                <div className='flex gap-5 justify-center items-center mt-5'>
                    <button
                        className='px-3 py-1 lg:px-5 lg:py-2 lg:text-xl  bg-green-500 rounded-lg text-white'
                    >
                        Update
                    </button>

                    <Link to='/' className='text-center'>
                        <button
                            className='px-3 py-1 lg:px-5 lg:py-2 lg:text-xl text-center lg:w-20 bg-[magenta] rounded-lg text-white'
                        >
                            Back
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

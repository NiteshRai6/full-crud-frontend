import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TableData from './TableData';
import { Link } from 'react-router-dom';

export default function Home() {
    const [books, setBooks] = useState([]);

    async function getData() {
        try {
            const res = await axios.get('http://localhost:4000/api/books');
            setBooks(res.data.books)
        }
        catch (err) {
            console.log(err);
        }
    }

    async function handleDelete(id) {
        try {
            const res = await axios.delete(`http://localhost:4000/api/books/${id}`);
            // console.log(res);
            getData();
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    // console.log(books);

    return (
        <div className='m-5 lg:m-20 flex flex-col gap-5'>

            <Link to='/add-book' className='text-center'>
                <button
                    className='px-3 py-1 lg:px-5 lg:py-2 lg:text-xl text-center lg:w-20 bg-green-500 rounded-lg text-white'
                >
                    Add
                </button>
            </Link>

            <div className='overflow-x-auto whitespace-nowrap'>
                <table className='min-w-full'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Pages</th>
                            <th>Published Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {books?.map(book => (
                            <TableData
                                key={book._id}
                                book={book}
                                handleDelete={handleDelete}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

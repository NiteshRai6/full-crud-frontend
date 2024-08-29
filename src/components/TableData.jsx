import React from 'react';
import { Link } from 'react-router-dom';

export default function TableData({ book, handleDelete }) {

    function formatDate(dateInput) {
        const date = new Date(dateInput);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }).replace(/ /g, '-');
    }

    return (
        <tr>
            <td>{book?.title}</td>
            <td>{book?.author}</td>
            <td>{book?.pages}</td>
            <td>{formatDate(book.published)}</td>

            <td className='flex gap-2 lg:gap-5 justify-center items-center'>
                <Link to={`/edit-book/${book._id}`} state={book}>
                    <button className='px-3 py-1 lg:w-20 bg-blue-500 rounded-lg text-white lg:text-xl'>
                        Edit
                    </button>
                </Link>

                <button
                    onClick={() => handleDelete(book._id)}
                    className='px-3 py-1 lg:w-20 bg-red-500 rounded-lg text-white'>
                    Delete
                </button>
            </td>
        </tr>
    )
}

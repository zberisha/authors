import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AuthorList.css';

const AuthorList = () => {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchAuthors = async () => {
        try {
            const response = await axios.get('http://localhost:3000/authors');
            setAuthors(response.data);
        } catch (error) {
            console.error('Error fetching authors:', error);
        }
        };

        fetchAuthors();
    }, []); 

    const handleDelete = async (id) => {
        try {
        await axios.delete(`http://localhost:3000/authors/${id}`);
        setAuthors(authors.filter((author) => author._id !== id));
        } catch (error) {
        console.error('Error deleting author:', error);
        }
    };

    return (
        <div className='container'>
        <h1>Favorite authors</h1>
            <Link to="/authors/new">Add an author</Link>
            <p className='purple'>We have quotes by: </p>
        <table>
            <tr key="header" className='table-header'> 
                <th>Author</th>
                <th>Authors available</th>
            </tr>
            {authors.map((author) => (
            <tr key={author._id}>
                <td className='purple'>{author.name}</td>
                <td className='buttons-td'>
                    <button className='edit-button'><Link to={`/authors/${author._id}/edit`}>Edit</Link></button>
                    <button className='delete-button' onClick={() => handleDelete(author._id)}>Delete</button>
                </td>
            </tr>
            ))}
        </table>
        </div>
    );
};

export default AuthorList;



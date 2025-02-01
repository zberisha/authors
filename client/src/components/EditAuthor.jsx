import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './EditAuthor.css';

const EditAuthor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [author, setAuthor] = useState(null);
    const [error, setError] = useState(null); // State to hold any error message

    useEffect(() => {
        const fetchAuthor = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/authors/${id}`);
            setAuthor(response.data);
        } catch (err) {
            setError("We're sorry, but we could not find the author you are looking for.");
            navigate('/authors/new');
        }
        };

        fetchAuthor();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!author) {
        setError('Author not found');
        return;
        }
        if (!author.name || author.name.length < 3) {
        setError('Author name must be at least 3 characters long');
        return;
        }
        try {
        await axios.put(`http://localhost:3000/authors/${id}`, author);
        navigate('/authors');
        setError(null); 
    } catch (err) {
        console.error('Error updating author:', err.response?.data.message || err.message);
        setError(err.response?.data.message || err.message);
        }
    };



    if (!author) {
        return <div className='content'>Loading...</div>;
    }

    return (
        <>
        <h1>Edit Author</h1>
        <Link to="/">Home</Link>
        <p>Edit this author</p>
        <form onSubmit={handleSubmit}>
            <div className='form-content'>
                <label>Name:</label>
                <br/>
                <input
                type="text"
                name="name"
                value={author.name}
                onChange={(e) => setAuthor({ ...author, name: e.target.value })}
                />
                {error && <p className='error-message'>{error}</p>}
                <div className='buttons'>
                <button type='button'><Link to="/authors">Cancel</Link></button>
                <button type="submit">Submit</button>
                </div>
            </div>
        </form>
        </>
    );
};

export default EditAuthor;
// src/components/AuthorForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './EditAuthor.css';

const AuthorForm = () => {
    const [author, setAuthor] = useState({ name: '' });
    const [error, setError] = useState(null); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!author.name || author.name.length < 3) {
        setError('Author name must be at least 3 characters long');
        return;
        }
        try {
        await axios.post('http://localhost:3000/authors', author);
        navigate('/authors');
        setError(null); 
    } catch (error) {
        console.error('Error adding author:', error.response?.data.message || error.message);
        setError(error.response?.data.message || error.message);
        }
    };

    return (
        <>
        <h1>Favorite Authors</h1>
        <Link to="/">Home</Link>

        <p className='purple'>Add a new author:</p>
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

export default AuthorForm;
const Author = require('../models/Author');

exports.getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find().sort('name');
        res.status(200).json(authors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) {
        return res.status(404).json({ message: 'Author not found' });
        }
        res.status(200).json(author);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createAuthor = async (req, res) => {
    try {
        const newAuthor = new Author(req.body);
        await newAuthor.save();
        res.status(201).json(newAuthor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateAuthor = async (req, res) => {
    try {
        const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedAuthor) {
        return res.status(404).json({ message: 'Author not found' });
        }
        res.json(updatedAuthor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteAuthor = async (req, res) => {
    try {
        await Author.findByIdAndDelete(req.params.id);
        res.json({ message: 'Author deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



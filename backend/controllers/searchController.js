const Post = require('../../frontend/views/postModel.js');

exports.searchPosts = async (req, res) => {
    try {
        const query = req.query.query;
        const results = await Post.find({ title: { $regex: query, $options: 'i' } }); // Adjust based on your schema
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
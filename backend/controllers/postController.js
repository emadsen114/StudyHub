const Post = require('../../frontend/views/postModel.js');

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.render('postPage', { post });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
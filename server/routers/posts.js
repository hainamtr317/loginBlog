import express from 'express';
import { getPosts, createPost, updatePost } from '../controllers/posts.js';

import { createUser, userLogin, userData } from '../controllers/user.js';

const router =express.Router();

router.post('/register', createUser);

router.post('/login',userLogin);

router.post('/data', userData);

router.get('/', getPosts);

router.post('/',createPost);

router.post('/update', updatePost);

export default router;
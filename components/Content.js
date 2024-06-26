// components/Content.js

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import notFavoritIcon from '../public/img/unselected.svg';
import favoriteIcon from '../public/img/selected.svg';
import axios from 'axios';

const Content = () => {
    const [posts, setPosts] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('/api/files');
                setPosts(res.data.files);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError('Failed to fetch posts. Please try again later.');
            }
        };

        fetchPosts();
    }, []);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="px-4">
            {error && <p className="text-red-500">{error}</p>}
            {posts.map((post, index) => (
                <div key={index} className="flex mb-4 p-4 border rounded-lg shadow text-montserrat">
                    <div>
                        <h3 className="text-16px font-regulr">{post.name}</h3>
                        <p className='my-2 text-12px'>{post.summary}</p>
                        
                        <div className='flex my-4 gap-x-4 gap-y-2 flex-wrap text-white'>
                            {post.tags.map((tag, idx) => (
                                <div key={idx} className='px-4 py-1 bg-orangeCustom text-montserrat rounded-lg'>
                                    <p>{tag}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                        
                    <div className='flex-none'>
                        <Image className='' src={isFavorite ? favoriteIcon : notFavoritIcon}
                        onClick={toggleFavorite} alt="Favorite toggle" />                       
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Content;

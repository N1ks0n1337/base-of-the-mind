import React from 'react';

const Content = ({ posts }) => {
    return (
        <div className="p-4">
            {posts.map((post, index) => (
                <div key={index} className="mb-4 p-4 border rounded shadow">
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    <p>{post.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Content;
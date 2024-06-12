import React, { useState } from 'react';
import Image from 'next/image';
import notFavoritIcon from '../public/img/unselected.svg';
import favoriteIcon from '../public/img/selected.svg';

const Content = ({ posts }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(! isFavorite);
    }

    return (
        <div className="px-4">
            {posts.map((post, index) => (
                <div key={index} className="flex mb-4 p-4 border rounded-lg shadow text-montserrat">
                    <div className=''>
                        <h3 className="text-16px font-regulr">{post.title}</h3>
                        <p className='my-2 text-12px'>{post.description}</p>
                        
                        <div className='flex my-4 gap-x-4 gap-y-2 flex-wrap text-white'>{/*Где-то здесь добавить map*/}
                            <div className='px-4 py-1 bg-orangeCustom text-montserrat rounded-lg'>
                                <p>ИТС</p>
                            </div>
                            <div className='px-4 py-1 bg-orangeCustom text-montserrat rounded-lg'>{/*Добавить потом map и удалить лишнии div*/}
                                <p>ПАС, МИДиС</p>
                            </div>
                            <div className='px-4 py-1 bg-orangeCustom text-montserrat rounded-lg'>
                                <p>Транспорт</p>
                            </div>
                            <div className='px-4 py-1 bg-orangeCustom text-montserrat rounded-lg'>
                                <p>Атлантика</p>
                            </div>
                            <div className='px-4 py-1 bg-orangeCustom text-montserrat rounded-lg'>
                                <p>Андрейченко</p>
                            </div>
                            <div className='px-4 py-1 bg-orangeCustom text-montserrat rounded-lg'>
                                <p>Бразилия</p>
                            </div>
                            <div className='px-4 py-1 bg-orangeCustom text-montserrat rounded-lg'>
                                <p>Андрейченко</p>
                            </div>{/*Удалять до сюда*/}
                        </div>
                    </div>
                        
                    <div className='flex-none'>
                        <Image className='' src={isFavorite ? favoriteIcon : notFavoritIcon}
                        onClick={toggleFavorite} />                       
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Content;
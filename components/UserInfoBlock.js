import Image from 'next/image';
import UserDefoultPhoto from '../public/img/userDefoultPhoto.svg';
import { useAuth } from '../context/AuthContext';

const UserInfoBlock = () => {
    const { user, logout } = useAuth();
    return (
        <div className="flex flex-col w-2/3">
            <div className="flex justify-center items-center border-b-2 border-b-blueCustom pb-6">
                <div className="flex w-full gap-5 justify-center items-center">
                    <div className='w-24 h-24 relative'>
                        <Image src={UserDefoultPhoto} />
                    </div>
                    <div className='flex flex-col w-full'>
                        {user ? (
                            <div className="">
                                <input 
                                    type="text"  
                                    className="border p-2 mb-4 w-full text-14px border-blueDarkCustom rounded-xl w-full"
                                    value={user.name}
                                    placeholder='Введите имя'
                                /> 
                                <input 
                                    type="text"  
                                    className="border p-2 mb-4 w-full text-14px border-blueDarkCustom rounded-xl w-full"
                                    value={user.email}
                                    placeholder='Ваша почта'
                                /> 
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <input 
                                    type="text"  
                                    className="border p-2 mb-4 w-full text-14px border-blueDarkCustom rounded-xl w-full"
                                    placeholder='Введите имя'
                                /> 
                                <input
                                    type="text"
                                    className="border p-2 mb-4 w-full text-14px border-blueDarkCustom rounded-xl w-full"
                                    placeholder='Ваша почта'
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfoBlock;
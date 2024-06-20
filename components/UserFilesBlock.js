import { useAuth } from "../context/AuthContext"
import Content from "./Content";
import Image from 'next/image';
import EditBtnSmall from '../public/img/editBtnSmall.svg';
import DeleteBtnSmall from '../public/img/deleteBtnSmall.svg';

const UserFileBlock = () => {
    const {user, logout} = useAuth();

    return (
        <div className="flex flex-col w-2/3">
            <div className="my-6 text-montserrat">
                <p className="text-22px">
                    Ваши файлы
                </p>
                <p className="my-3 text-12px">
                    Здесь вы можете увидеть все файлы, добавленные вами на платформу. Вы можете их отредактировать или удалить
                </p>
            </div>
            <div className="flex w-2/3 into-left">
                <Content />
                <div className="flex flex-col gap-2 items-center">
                    <button >
                        <Image src={EditBtnSmall} />
                    </button>
                    
                    <button>
                        <Image src={DeleteBtnSmall} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserFileBlock;
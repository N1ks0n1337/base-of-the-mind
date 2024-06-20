import Link from "next/link";
import Image from "next/image";
import LostKubBlure from '../public/img/lostKubBlure.svg';

const Custom404 = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-greyCustom text-blueDarkCustom">
            <Image src={LostKubBlure} className="pb-5"/>
            <h1 className="text-6xl font-bold mb-4 text-48px text-montserrat text-medium">Ошибка 404</h1>
            <Link href="/">
                Вернуться на главную страницу
            </Link>
        </div>
    )
}

export default Custom404;
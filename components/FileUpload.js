import Image from 'next/image';
import fileImg from '../public/img/filesImg.svg';

const FileUpload = ({}) => {
    return (
        <div className="flex flex-col my-6 border border-2 border-orangeCustom p-4 md:w-80 md:h-80 justify-around items-center rounded-lg">
            <p className='text-wrap text-14px'>Загрузите свой файл, после модерации он будет добавлен на платформу</p>
            <Image src={fileImg} />
            <p className='text-14px'>txt, csv, pdf, word, xlsx</p>
        </div>
    )
}

export default FileUpload;
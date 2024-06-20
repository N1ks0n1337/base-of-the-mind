import Content from "../components/Content";
import Header from "../components/Header";
import UserFileBlock from "../components/UserFilesBlock";
import UserInfoBlock from "../components/UserInfoBlock";

const Profile = () => {

    return (
        <div>
            <Header/>
            <div className="flex">
                <div className=" flex flex-col xl:w-2/3 h-screen self-center py-10 items-center">
                    <UserInfoBlock />
                    <UserFileBlock />
                </div>
                <div className="flex flex-col xl:w-1/3 h-screen py-10">
                    <div className="xl:w-2/3 border-b-2 border-b-blueCustom pb-1">
                        <p className="w-2/3 text-14px">
                            Новые статьи
                        </p>
                    </div>
                    <Content className="w-full" />
                </div>
            </div>
        </div>
    )
}

export default Profile;
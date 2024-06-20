import { useState } from "react";


const MenuTabs = () => {
    const [activeTab, setActivityTab] = useState('На платформе');

    const tabs = [
        {name: 'На платформе'},
        {name: 'На модерации'},
        {name: 'Удаленные'}
    ];

    return (
        <div className="w-full">
            <div className="flex justify-between">
                {tabs.map((tab) => (
                    <div key={tab.name}
                        className={`cursor-pointer text-lg font-medium ${
                            activeTab === tab.name
                              ? 'border-b-4 border-blue-500 text-black'
                              : 'border-b-4 border-transparent text-gray-500'
                          }`}
                        onClick={() => setActivityTab(tab.name)}
                    >
                        {tab.name}
                    </div>
                ))}
            </div>
            <div className="mt-4">
                {activeTab === 'На платформе' && 
                <p>Контент на платформе</p>
                }
                {activeTab === 'На модерации' && <p>Контент на модерации</p>}
                {activeTab === 'Удаленные' && <p>Удаленный контент</p>}
            </div>
        </div>
    );
};

export default MenuTabs;
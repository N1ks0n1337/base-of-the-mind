// components/Filters.js
import React, { useState } from 'react';
import Tag from './Tag';
import CheckboxYear from './CheckboxYear';

const tagsData = [
    { id: 1, label: 'ИТС' },
    { id: 2, label: 'Транспорт' },
    { id: 3, label: 'Ключевое слово' },
    { id: 4, label: 'ЦД' },
    { id: 5, label: 'Туризм' },
    { id: 6, label: 'Здраво' },
    { id: 7, label: 'Слово' },
    { id: 8, label: 'Слово' },
    { id: 9, label: 'Слово' },

  ]; {/*Потом это заменить на map c данными с БД*/}

  const yearData = [
    { id: 1, label: '2012-2013' },
    { id: 2, label: '2013-2014' },
    { id: 3, label: '2014-2015' },
    { id: 4, label: '2015-2016' },
    { id: 5, label: '2016-2017' },
    { id: 6, label: '2017-2018' },
    { id: 7, label: '2018-2019' },
    { id: 8, label: '2019-2020' },
    { id: 9, label: '2020-2021' },
    { id: 10, label: '2021-2022' },
    { id: 11, label: '2022-2023' },
    { id: 4, label: '2023-2024' }
  ];{/*Потом это заменить на map c данными с БД*/}

  const directions = [
    {id: 1, name: 'Инвестиционный климат и развитие бизнеса'},
    {id: 2, name: 'ЖКХ и Энергетика'},
    {id: 3, name: 'Развитие городского транспорта'},
    {id: 4, name: 'Экология'},
    {id: 5, name: 'Архитектура, градостроительство и организация городского пространства'},
    {id: 8, name: 'Образование и воспитание'},
    {id: 7, name: 'Здравоохранение и здравостроительство'},
    {id: 8, name: 'Культура и искуство'},
    {id: 9, name: 'Туризм и сервис'},
    {id: 10, name: 'Организация работы CityLab'},
    {id: 11, name: 'Цифровой двойник города как инструмент системы управления УГЧ'},
    {id: 12, name: 'Мониторинг реализации стратегии'}
  ]

const Filters = ({ applyFilters }) => {
    const [year, setYear] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [direction, setDirection] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedYear, setSelectedYear] = useState([]);
    const [queryYear, setQueryYear] = useState('');

    const handleApply = () => {
        applyFilters({ year, keywords, direction });
    };

    const toggleTag = (tag) => {
        setSelectedTags((prevState) =>
          prevState.includes(tag)
            ? prevState.filter((t) => t !== tag)
            : [...prevState, tag]
        );
      };

      const handleSearch = () => {
        onSerch(queryYear);
      }

    return (
        <div className="xl:w-84 p-4 my-6 border border-2 border-orangeCustom rounded-lg">
            <h2 className="font-regular text-12px">Фильтры:</h2>
            {/* Add filter fields here */}
            <div className='p-2'>
                <form>
                    <div className='flex flex-col text-montserrat'>
                        {/*Чекбоксы с годами*/}
                        <div className='flex flex-col gap-2 my-4'>
                            <h3 className='text-14px'>Год</h3>
                            <input
                                type='text'
                                onChange={(e) => setQueryYear(e.target.value)}
                                placeholder='2023'
                                className='border border-blueCustom rounded-lg w-auto p-2 text-14px' />
                            <div className='h-24 overflow-y-auto leftscrollbar'>
                                {yearData.map((year) => (
                                    <CheckboxYear key={year.id}
                                        label={year.label}
                                        isSelected={selectedYear.includes(year.label)}
                                    />
                                ))}
                            </div>
                        </div>
                        {/*Теги*/}
                        <div className='flex flex-col gap-2 my-2'>
                            <h3 className='text-14px'>Ключевые слова</h3>
                            <input
                                type='text'
                                onChange={(e) => setQueryYear(e.target.value)}
                                placeholder='Искусственный интеллект'
                                className='border border-blueCustom rounded-lg w-auto p-2 text-14px' />
                            <div className='h-24 overflow-y-auto leftscrollbar'>
                                {tagsData.map((tags) => (
                                    <CheckboxYear key={tags.id}
                                        label={tags.label}
                                        isSelected={selectedTags.includes(tags.label)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 my-2'>
                            <h3 className='text-14px'>Направления</h3>
                            <input
                                type='text'
                                onChange={(e) => setQueryYear(e.target.value)}
                                placeholder='CityLab'
                                className='border border-blueCustom rounded-lg w-auto p-2 text-14px' />
                            <div className='h-24 overflow-y-auto leftscrollbar'>
                                {directions.map((direction) => (
                                    <CheckboxYear key={direction.id}
                                        label={direction.name}
                                        isSelected={selectedTags.includes(direction.name)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className='flex justify-center text-14px'>
                <button onClick={handleApply} className="w-screen mt-4 px-4 py-2 bg-blueCustom text-white rounded-lg">Применить</button>
            </div>
        </div>
    );
};

export default Filters;

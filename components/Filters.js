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
    { id: 4, label: 'Здраво' },
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

const Filters = ({ applyFilters }) => {
    const [year, setYear] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [direction, setDirection] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedYear, setSelectedYear] = useState([]);

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

    return (
        <div className="xl:w-96 p-4 my-6 border border-2 border-orangeCustom rounded-lg">
            <h2 className="font-regular text-12px">Фильтры:</h2>
            {/* Add filter fields here */}
            <div className='p-2'>
                <form>
                    <div className='flex flex-col text-montserrat'>
                        <div className='flex flex-col gap-1'>
                            <h3 className='text-14px'>Тип файла</h3>
                            <label className='mx-4'>
                                <input
                                    type="checkbox"
                                    id="option1"
                                    name='option1'
                                    className=''
                                />
                                <span className='ml-2 text-14px'>PDF</span>
                            </label>
                            <label className='mx-4'>
                                <input
                                    type="checkbox"
                                    id="option1"
                                    name='option1'
                                    className=''
                                />
                                <span className='ml-2 text-14px'>TXT</span>
                            </label>
                        </div>
                        {/*Чекбоксы с годами*/}
                        <div className='flex flex-col gap-2 my-4'>
                            <h3 className='text-14px'>Год</h3>
                            <div>
                                {yearData.map((year) => (
                                    <CheckboxYear key={year.id}
                                        label={year.label}
                                        isSelected={selectedYear.includes(year.label)}
                                        />
                                ))}
                            </div>
                        </div>
                        {/*Теги*/}
                        <div>
                            <h3 className='text-14px'>Ключевые слова</h3>
                            <div  className="flex flex-wrap gap-x-4 gap-y-2 m-4">
                                {tagsData.map((tag) => (
                                    <Tag key={tag.id}
                                        label={tag.label}
                                        isSelected={selectedTags.includes(tag.label)}
                                        onClick={() => toggleTag(tag.label)} />
                                ))}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className='flex justify-center text-14px'>
                <button onClick={handleApply} className="w-screen mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Применить</button>
            </div>
        </div>
    );
};

export default Filters;

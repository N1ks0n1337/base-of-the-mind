import { useState } from "react"

const SliderYear = ({ min, max, step, defaultValue, onChange,  trackHeight = '2px'}) => {
    const [minValue, setMinValue] = useState(defaultValue[0]);
    const [maxValue, setMaxValue] = useState(defaultValue[1]);

    const handleMinChange = (event) => {
        const value = Math.min(Number(event.target.value), maxValue - step);
        setMinValue(value);
        onChange([value, maxValue]);
    };

    const handleMaxChange = (event) => {
        const value = Math.max(Number(event.target.value), minValue + step);
        setMaxValue(value);
        onChange([minValue, value]);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-between items-center w-full gap-1">
                <span className="text-black text-14px text-montserrat">{min}</span>
                
                <div className="relative w-full">
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={minValue}
                        onChange={handleMinChange}
                        className="absolute w-full -top-1.5"
                        placeholder={minValue}
                    />
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={maxValue}
                        onChange={handleMaxChange}
                        className="absolute w-full -top-1.5"
                        placeholder={maxValue}
                    />
                    <div className="relative w-full h-1 bg-black" style={{ height: trackHeight, backgroundColor: 'black' }}>
                        <div
                            className="absolute h-1 bg-blueCustom"
                            style={{
                                height: trackHeight,
                                left: `${((minValue - min) / (max - min)) * 100}%`,
                                right: `${100 - ((maxValue - min) / (max - min)) * 100}%`,
                            }}
                        />
                    </div>
                </div>

                <span className="text-black text-14px text-montserrat">{max}</span>
            </div>
            
            <div className="flex justify-around w-full text-12px text-blueCustom">
                <span>{minValue}</span>
                <span>{maxValue}</span>
            </div>
        </div>
    )
}

export default SliderYear;
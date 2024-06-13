const Tag = ({label, isSelected, onClick}) => {
    return (
    <div 
        onClick={onClick}
        className={`cursor-pointer px-4 py-1 rounded-lg tetxt-montserat text-12px ${isSelected ? 'border border-orangeCustom bg-orangeCustom text-white' : 'border border-orangeCustom text-orangeCustom'}`}>
        {label}
    </div>
    // <div>
    //     <label className="mx-4">
    //         <input
    //             type="checkbox"
    //             id="tag"
    //             name="tag"
    //             className={`form-checkbox text-blueCustom cursor-pointer text-14px ${isSelected ? 'bg-blueCustom' : 'bg-grey'}`} />
    //     </label>
    //     <span className="ml-2">{label}</span>
    // </div>
    )
}

export default Tag;
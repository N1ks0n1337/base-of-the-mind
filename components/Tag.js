const Tag = ({label, isSelected, onClick}) => {
    return (
        <div 
        onClick={onClick}
        className={`cursor-pointer px-4 py-1 rounded-lg tetxt-montserat text-12px ${isSelected ? 'border border-orangeCustom bg-orangeCustom text-white' : 'border border-orangeCustom text-orangeCustom'}`}>
        {label}
    </div>
    )
}

export default Tag;
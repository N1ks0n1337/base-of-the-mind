  const CheckboxYear = ({label, isSelected}) => {
    return (
      <div>
        <label className='mx-4'>
          <input
            type="checkbox"
            id="option1"
            name='option1'
            className={`form-checkbox text-blueCustom cursor-pointer text-14px ${isSelected ? 'bg-blueCustom' : 'bg-grey'}`}
            />
          <span className='ml-2'>{label}</span>
        </label>
      </div>
    )
  }

  export default CheckboxYear;
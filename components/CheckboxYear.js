// components/CheckboxYear.js
const CheckboxYear = ({ label, isSelected }) => {
  return (
    <div className="flex gap-x-1 text-14px">
      <label className='mx-4'>
        <input
          type="checkbox"
          id="option1"
          name='option1'
          className={`custom-checkbox form-checkbox text-blueCustom cursor-pointer text-14px ${isSelected ? 'bg-blueCustom' : 'bg-grey'} `}
        />
      </label>
      <span className=''>{label}</span>
    </div>
  )
}

export default CheckboxYear;
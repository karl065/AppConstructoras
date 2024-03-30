/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import '../../src/stylesInput/styles.css'
const InputWithLabel = ({ op, label, value, onChange, handleBlur, id, name, type }) => {

    return (
        <div className="App  flex flex-wrap mb-0 rounded-lg w-full bg-slate-800">
            {op ?
                <label className='relative cursor-pointer inline-block w-64 bg-secondary-1000 rounded-lg'>
                    <input
                        type={type}
                        id={id}
                        name={name}
                        placeholder=''
                        onChange={onChange}
                        onBlur={handleBlur}
                        value={value}
                        className='w-full p-2 bg-secondary-1000 text-white outline-none rounded-lg focus:border focus:border-secondary-button text-colors'
                    />
                    <span
                        className='text-lg text-white text-opacity-50 absolute left-0 top-0 px-1 transition duration-200 input-text'>
                        {label}</span>
                </label>
                : <label className='relative cursor-pointer inline-block w-full bg-secondary-1000 rounded-lg'>
                    <textarea
                        type={type}
                        id={id}
                        name={name}
                        placeholder=''
                        onChange={onChange}
                        onBlur={handleBlur}
                        value={value}
                        className='w-full p-2 bg-secondary-1000 text-white outline-none rounded-lg focus:border focus:border-secondary-button text-colors'
                    />
                    <span
                        className='text-lg text-white text-opacity-50 absolute left-0 top-0 px-1 transition duration-200 input-text'>
                        {label}</span>
                </label>
            }
        </div >
    );
}

export default InputWithLabel;

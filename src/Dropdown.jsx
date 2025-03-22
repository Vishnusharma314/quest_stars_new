const Dropdown = ({ onSelect, label, option, name }) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 ">
        {label}
        <span className="text-red-500">*</span>
      </label>
      <select
        name={name}
        onChange={onSelect}
        required
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">-Select-</option>
        {option.map((item) => (
          <option value={item.value} key={`${item.value}}`}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;

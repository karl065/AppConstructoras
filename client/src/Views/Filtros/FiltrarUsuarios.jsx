
const FilterComponent = ({ msgButon }) => {

    return (
        <div className="mb-1">
            <label className="block text-white text-sm font-bold mb-1">
                Filtrar por cualquier criterio:
            </label>
            <div className="mb-0 flex items-center gap-3">

                <input
                    type="text"
                    value={null}
                    onChange={null}
                    className="shadow appearance-none border rounded flex-grow py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                />
                <button
                    onClick={null}
                    className="bg-secondary-button hover:bg-secondary-buttonH text-white font-bold py-2 px-3 rounded ml-auto focus:outline-none focus:shadow-outline"
                >
                    {msgButon}
                </button>
            </div>
        </div>
    );
};

export default FilterComponent;

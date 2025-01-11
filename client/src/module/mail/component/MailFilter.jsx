import { useTheme } from '../../../context/ThemeContext';

const MailFilter = ({ sortBy, setSortBy, sortOrder, setSortOrder, search, setSearch }) => {

    const {themeValue} = useTheme();

    return (
        <div className={`flex justify-between items-center mb-6 text-${themeValue.fontcolor}-500 font-${themeValue.fontweight} text-${themeValue.fontstyle} shadow-md rounded-lg p-4 ${themeValue.theme}`}>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by subject or sender"
                className={`rounded p-1 md:p-2 flex-1 mr-4 ${themeValue.bgvalue2}`}
            />
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`${themeValue.bgvalue2} rounded p-1 md:p-2 bg-white mr-4`}
            >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="title">Sort by Title</option>
            </select>
            <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className={`${themeValue.bgvalue2} rounded p-1 md:p-2 bg-white mr-4`}
            >
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
            </select>
        </div>
    );
};

export default MailFilter;

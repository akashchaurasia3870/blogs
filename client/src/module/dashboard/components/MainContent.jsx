import React, { useContext } from 'react';
import Home from './Home';
import Blogs from './Blogs';
import Users from './Users';
import Notifications from './Notifications';
import FAQ from './FAQ';
import Settings from './Settings';
import Accounts from './Accounts';
import Profile from '../../user/pages/profile';
import SearchSection from './Search/dash_search';
import Mails from '../../mail/pages/Mails';
import Notification from '../../notification/pages/Notification'
import Reports from './Reports';
import Horizontalbar from './Horizontalbar';
import { useTheme } from '../../../context/ThemeContext';

const MainContent = ({ activePage,onMenuItemClick }) => {

    const {themeValue} = useTheme();

    // const onMenuItemClick = (item)=>{
    //     setActivePage(item)
    // }


    const renderPageContent = () => {
        switch (activePage) {
            case 'Home':
                return <Home menuChange={onMenuItemClick} />;
            case 'Blogs':
                return <Blogs />;
            case 'Users':
                return <Users />;
            case 'Notifications':
                return <Notification />;
            case 'Mails':
                return <Mails />;
            case 'Settings':
                return <Settings />;
            // case 'Reports':
                // return <Reports />;
            case 'Accounts':
                return <Profile />;
            default:
                return <Home menuChange={onMenuItemClick} />;
        }
    };

    return (
        <div className={`flex-1 overflow-y-scroll ${themeValue.bgvalue2} text-${themeValue.fontsize} text-${themeValue.fontcolor}-500`}>
            <SearchSection className='rounded-none' />
            <div className="mt-0 p-4">
                {renderPageContent(activePage)}
            </div>
            <div className='md:hidden'>
                <Horizontalbar menuChange={onMenuItemClick} />
            </div>
        </div>
    );
};
export default MainContent;

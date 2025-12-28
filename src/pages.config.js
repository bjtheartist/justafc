import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Referrals from './pages/Referrals';
import Careers from './pages/Careers';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Services": Services,
    "About": About,
    "Contact": Contact,
    "Referrals": Referrals,
    "Careers": Careers,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};
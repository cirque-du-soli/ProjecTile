import { React, useState, useRef } from 'react';
import { Button } from 'reactstrap';
import AdminToggleButton from "../admin/AdminToggleButton.jsx";
import { newToastMessage } from '../customToast.js';


function Footer({ props }) {

    const mainPanelRef = useRef(null);

    // initial states
    const [isAdmin, setIsAdmin] = useState((localStorage.getItem('isAdmin') === 'true')); // userAdminState
    localStorage.setItem('isAdmin', isAdmin);

    function toggleIsAdmin() {
        // update storage
        localStorage.setItem('isAdmin', (localStorage.getItem('isAdmin') === 'true') ? 'false' : 'true');
        // update state (re-renders div)
        setIsAdmin(localStorage.getItem('isAdmin'));

        // setUserAdminState(!userAdminState);
        // setIsAdmin(userAdminState);
    }

    return (
        <footer className="bg-teal-500 text-white py-4 fixed bottom-0 w-full">
            <div className="container mx-auto flex flex-wrap justify-between items-center font-semibold">
                <div className="w-full md:w-auto mb-4 md:mb-0">
                    <a href='/' className="text-black hover:text-gray-400 mr-4">Home</a>
                    <span className="text-black">|</span>
                    <a href='#' className="text-black hover:text-gray-400 ml-4 mr-4">Terms of Service</a>
                    <span className="text-black">|</span>
                    <a href='#' className="text-black hover:text-gray-400 ml-4">Privacy Policy</a>
                    <span className="text-black"> | </span>
                    <AdminToggleButton props={{ isAdmin: isAdmin, toggleIsAdmin: toggleIsAdmin, newToastMessage: newToastMessage}} />
                </div>

                <div className="w-full md:w-auto text-center md:text-right">
                    <p className="text-black">© 2024: Team 1 Web Development Inc.</p>
                </div>
            </div>
        </footer>
    );
}
export default Footer;
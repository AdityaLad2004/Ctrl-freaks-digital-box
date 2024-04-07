// components/Navbar.js

import Link from 'next/link';
import Image from 'next/image'
import Logo from '../assets/logo.png'
import Profile from '../assets/profile.jpg'
const Navbar = () => {
    return (
        <nav className="flex items-center justify-between bg-gray-800 text-white p-4">
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    <Image
                        className="w-8 h-8 rounded-full"
                        src={Logo}
                        width={500}
                        height={500}


                    />
                </div>
                <ul className="flex space-x-4">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/complaints">Complaints</Link></li>

                    <li><Link href="/addEmployee">Add Employee</Link></li>
                </ul>
            </div>
            <div>
                <Image
                    className="w-8 h-8 rounded-full"
                    src={Profile}
                    width={500}
                    height={500}


                />
            </div>
        </nav>
    );
};

export default Navbar;

import { NavLink } from 'react-router-dom';

const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/response", label: "Response" },
    { path: "/profile/username", label: "Profile" },
];

const Navbar = () => {
    return (
        <div>
            <nav>
                <ul>
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            <NavLink to={link.path}>{link.label}</NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;

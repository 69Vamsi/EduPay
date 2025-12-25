import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, GraduationCap, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-r from-brand-50 via-white to-brand-50 text-brand-900 shadow-md border-b border-brand-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo Section */}
                    <div className="flex items-center cursor-pointer group" onClick={() => {
                        if (user) logout();
                        navigate('/login');
                    }}>
                        {/* Logo blends naturally with white bg */}
                        <img src="/logo.jpg" alt="BVC Group" className="h-12 w-auto object-contain mr-3 mix-blend-multiply" />

                        <div className="flex flex-col border-l-2 border-brand-200 pl-3 py-1">
                            <span className="font-heading font-extrabold text-2xl tracking-normal text-brand-900 leading-none">
                                BVCEduPay
                            </span>
                            <span className="text-[11px] uppercase tracking-[0.2em] text-brand-500 font-bold mt-1 font-heading">
                                Group of Institutions
                            </span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {user ? (
                            <>
                                <div className="flex items-center space-x-3 pl-6">
                                    {user.role === 'librarian' && (
                                        <Link to="/librarian/dashboard" className="text-sm font-bold text-gray-500 hover:text-brand-600 mr-2">
                                            Dashboard
                                        </Link>
                                    )}
                                    {user.role === 'placement_officer' && (
                                        <Link to="/placement/dashboard" className="text-sm font-bold text-gray-500 hover:text-brand-600 mr-2">
                                            Dashboard
                                        </Link>
                                    )}
                                    {user.role === 'hostel_warden' && (
                                        <Link to="/hostel/dashboard" className="text-sm font-bold text-gray-500 hover:text-brand-600 mr-2">
                                            Dashboard
                                        </Link>
                                    )}
                                    <div className="flex flex-col items-end hidden md:flex">
                                        <span className="text-sm font-bold text-brand-900">{user.name}</span>
                                        <span className="text-xs font-medium text-brand-500 bg-brand-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                            {user.role}
                                        </span>
                                    </div>
                                    <div className="h-10 w-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 border-2 border-white shadow-sm ring-1 ring-brand-200">
                                        <User className="h-5 w-5" />
                                    </div>
                                </div>

                                <button
                                    onClick={logout}
                                    className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                                    title="Logout"
                                >
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="px-6 py-2.5 rounded-full bg-brand-600 text-white font-medium shadow-md hover:bg-brand-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-brand-600 hover:text-brand-900 hover:bg-brand-100 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0 z-50">
                    <div className="px-4 pt-4 pb-6 space-y-4">
                        {user ? (
                            <>
                                <div className="flex items-center space-x-3 mb-4 p-3 bg-brand-50 rounded-lg">
                                    <div className="h-10 w-10 bg-brand-200 rounded-full flex items-center justify-center text-brand-700">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-brand-900">{user.name}</p>
                                        <p className="text-xs font-medium text-brand-500 uppercase">{user.role}</p>
                                    </div>
                                </div>

                                {user.role === 'librarian' && (
                                    <Link to="/librarian/dashboard" className="block text-base font-medium text-gray-700 hover:text-brand-600 hover:bg-gray-50 px-3 py-2 rounded-md" onClick={() => setIsOpen(false)}>
                                        Library Dashboard
                                    </Link>
                                )}
                                {user.role === 'placement_officer' && (
                                    <Link to="/placement/dashboard" className="block text-base font-medium text-gray-700 hover:text-brand-600 hover:bg-gray-50 px-3 py-2 rounded-md" onClick={() => setIsOpen(false)}>
                                        Placement Dashboard
                                    </Link>
                                )}
                                {user.role === 'hostel_warden' && (
                                    <Link to="/hostel/dashboard" className="block text-base font-medium text-gray-700 hover:text-brand-600 hover:bg-gray-50 px-3 py-2 rounded-md" onClick={() => setIsOpen(false)}>
                                        Hostel Dashboard
                                    </Link>
                                )}

                                <button
                                    onClick={() => {
                                        logout();
                                        setIsOpen(false);
                                    }}
                                    className="w-full flex items-center text-base font-medium text-red-600 hover:bg-red-50 px-3 py-2 rounded-md transition-colors"
                                >
                                    <LogOut className="h-5 w-5 mr-3" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="block w-full text-center px-6 py-3 rounded-lg bg-brand-600 text-white font-bold shadow-md hover:bg-brand-700"
                                onClick={() => setIsOpen(false)}
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

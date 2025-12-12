import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
    FiHome,
    FiSearch,
    FiPlusSquare,
    FiHeart,
    FiBell,
    FiMenu,
    FiSettings,
    FiLogOut,
    FiUser
} from "react-icons/fi";

export default function Navbar({
    currentUser = { id: "me", name: "User", avatar: "https://i.pravatar.cc/150?img=11" },
    unreadNotifications = 3, // Example prop
    onSignOut = () => { console.log("Signing out..."); },
    onSearch = (q) => { console.log("Searching:", q); },
}) {
    const navigate = useNavigate();
    const location = useLocation();

    // State
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [isNotifOpen, setNotifOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Refs for click detection
    const profileRef = useRef(null);
    const notifRef = useRef(null);

    // --- Navigation Data ---
    const navItems = [
        { name: "Home", icon: <FiHome size={24} />, path: "/" },
        { name: "Search", icon: <FiSearch size={24} />, path: "/search" },
        { name: "Create", icon: <FiPlusSquare size={24} />, path: "/create" }, // distinct action
        { name: "Activity", icon: <FiHeart size={24} />, path: "/activity" },
        { name: "Profile", icon: <FiUser size={24} />, path: `/profile/${currentUser.id}` },
    ];

    // --- Effects ---

    // Close dropdowns on outside click or Escape key
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setNotifOpen(false);
            }
        };

        const handleEsc = (event) => {
            if (event.key === "Escape") {
                setProfileOpen(false);
                setNotifOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEsc);
        };
    }, []);

    // Close menus when route changes
    useEffect(() => {
        setProfileOpen(false);
        setNotifOpen(false);
    }, [location]);

    // --- Handlers ---

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const cleanedQuery = searchQuery.trim();
        if (cleanedQuery) {
            onSearch(cleanedQuery);
            navigate(`/search?q=${encodeURIComponent(cleanedQuery)}`);
            // Optional: clear query after search
            // setSearchQuery(""); 
        }
    };

    return (
        <>
            {/* =======================
                TOP NAVIGATION (Desktop & Mobile Header)
               ======================= */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f1724]/90 backdrop-blur-md border-b border-white/10 h-16 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">

                    {/* LEFT: Logo */}
                    <div
                        onClick={() => navigate("/")}
                        className="cursor-pointer flex items-center gap-2 group"
                    >
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:bg-indigo-500 transition-colors">
                            S
                        </div>
                        <span className="text-white font-bold text-xl tracking-tight hidden sm:block">
                            SocialApp
                        </span>
                    </div>

                    {/* CENTER: Search Bar (Desktop Only) */}
                    <div className="hidden md:flex flex-1 max-w-md mx-6">
                        <form onSubmit={handleSearchSubmit} className="relative w-full group">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-400 transition-colors" size={18} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search users, posts..."
                                className="w-full bg-[#1a2332] text-gray-200 text-sm rounded-full py-2.5 pl-10 pr-4 border border-transparent focus:border-indigo-500 focus:bg-[#0f1724] focus:outline-none transition-all placeholder-gray-500"
                            />
                        </form>
                    </div>

                    {/* RIGHT: Actions */}
                    <div className="flex items-center gap-2 sm:gap-4">

                        {/* Desktop Nav Links */}
                        <div className="hidden md:flex items-center gap-1">
                            <NavLink to="/" className={({ isActive }) => `p-2.5 rounded-full hover:bg-white/10 transition-colors ${isActive ? "text-indigo-400" : "text-gray-300"}`}>
                                <FiHome size={22} />
                            </NavLink>
                            <NavLink to="/create" className={({ isActive }) => `p-2.5 rounded-full hover:bg-white/10 transition-colors ${isActive ? "text-indigo-400" : "text-gray-300"}`}>
                                <FiPlusSquare size={22} />
                            </NavLink>
                        </div>

                        {/* Notifications Dropdown */}
                        <div className="relative" ref={notifRef}>
                            <button
                                onClick={() => {
                                    setNotifOpen(!isNotifOpen);
                                    setProfileOpen(false);
                                }}
                                className={`p-2.5 rounded-full hover:bg-white/10 transition-colors relative ${isNotifOpen ? "bg-white/10 text-white" : "text-gray-300"}`}
                            >
                                <FiBell size={22} />
                                {unreadNotifications > 0 && (
                                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0f1724]"></span>
                                )}
                            </button>

                            {/* Dropdown Menu */}
                            {isNotifOpen && (
                                <div className="absolute right-0 mt-3 w-80 bg-[#1a2332] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                                    <div className="px-4 py-3 border-b border-white/5 flex justify-between items-center">
                                        <h3 className="font-semibold text-white">Notifications</h3>
                                        <span className="text-xs text-indigo-400 cursor-pointer hover:underline">Mark all read</span>
                                    </div>
                                    <div className="max-h-64 overflow-y-auto">
                                        {/* Mock Content */}
                                        <div className="p-4 text-center text-gray-400 text-sm">
                                            No new notifications.
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Profile Dropdown */}
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={() => {
                                    setProfileOpen(!isProfileOpen);
                                    setNotifOpen(false);
                                }}
                                className="flex items-center gap-2 rounded-full p-1 hover:bg-white/10 transition-colors border border-transparent focus:border-white/20"
                            >
                                <img
                                    src={currentUser.avatar}
                                    alt={currentUser.name}
                                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white/10"
                                />
                                <span className="hidden lg:block text-sm font-medium text-gray-200 pr-2">
                                    {currentUser.name}
                                </span>
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-3 w-56 bg-[#1a2332] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                                    <div className="px-4 py-3 border-b border-white/5">
                                        <p className="text-sm text-white font-medium">{currentUser.name}</p>
                                        <p className="text-xs text-gray-400 truncate">@{currentUser.id}</p>
                                    </div>
                                    <div className="py-1">
                                        <button onClick={() => navigate(`/profile/${currentUser.id}`)} className="flex items-center w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                                            <FiUser className="mr-3" /> Profile
                                        </button>
                                        <button onClick={() => navigate("/settings")} className="flex items-center w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                                            <FiSettings className="mr-3" /> Settings
                                        </button>
                                    </div>
                                    <div className="py-1 border-t border-white/5">
                                        <button onClick={onSignOut} className="flex items-center w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                                            <FiLogOut className="mr-3" /> Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* =======================
                BOTTOM NAVIGATION (Mobile Only)
               ======================= */}

            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0f1724]/95 backdrop-blur-lg border-t border-white/10 pb-safe">
                <div className="flex items-center justify-around h-16 px-2">
                    {navItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex flex-col items-center justify-center w-full  h-full space-y-1 ${isActive ? "text-indigo-500  border-t-blue-500 border " : "text-gray-400 hover:text-gray-200"
                                }`
                            }
                        >
                            {/* Render icon with conditional logic if needed */}
                            <span className="text-xl">{item.icon}</span>
                            {/* Optional: Show labels on slightly larger mobile screens */}
                            {/* <span className="text-[10px] font-medium">{item.name}</span> */}
                        </NavLink>
                    ))}
                </div>
            </nav>

            <div className=" h-16 md:h-16" />

        </>
    );
}
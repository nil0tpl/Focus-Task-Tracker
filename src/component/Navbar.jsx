import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { DarkModeContext } from "./context/DarkModeContext";

export default function Navbar() {
	const { theme, setTheme } = useContext(DarkModeContext);
	const location = useLocation();

	const toggleTheme = () => {
		if (theme === "light") {
			setTheme("dark");
			document.body.classList.add("bg-gray-800", "text-white");
			document.body.classList.remove("bg-white", "text-gray-800");
		} else {
			document.body.classList.add("bg-white", "text-gray-800");
			document.body.classList.remove("bg-gray-800", "text-white");
			setTheme("light");
		}
	}
	return (
		<>
			{/* <!-- Navbar --> */}
			<nav className={`shadow-lg border-b border-gray-200 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						{/* <!-- Logo/Brand --> */}
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<h1 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
									Focus Task Tracker
								</h1>
							</div>
						</div>

						{/* <!-- Desktop Navigation --> */}
						<div className="block">
							<div className="ml-10 flex items-baseline space-x-4">
								<Link
									to="/"
									className={`${theme === 'light' ? `${location.pathname === "/" ? "text-gray-800" : "text-gray-500"}` : `${location.pathname === "/" ? "text-white" : "text-gray-200"}`} hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium`}
								>
									Home
								</Link>
								<Link to="/task" className={`${theme === 'light' ? `${location.pathname === "/task" ? "text-gray-800" : "text-gray-500"}` : `${location.pathname === "/task" ? "text-white" : "text-gray-200"}`} hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium `}>
									Tasks
								</Link>
							</div>
						</div>

						{/* <!-- Theme Toggle & User Profile --> */}
						<div className="flex items-center space-x-4">
							{/* <!-- Theme Toggle --> */}
							<button
								onClick={toggleTheme}
								className={`p-2 rounded-lg ${
									theme === "dark"
										? "bg-gray-700 hover:bg-gray-600"
										: "bg-gray-200 hover:bg-gray-300"
								} transition-colors`}
							>
								{theme === "dark" ? (
									<svg className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
									</svg>
								) : (
									<svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
									</svg>
								)}
							</button>

							{/* <!-- User Profile --> */}
							<div className="relative">
								<button className="bg-gray-800 dark:bg-gray-600 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
									<img
										className="h-8 w-8 rounded-full"
										src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
										alt="Profile"
									/>
								</button>
							</div>
						</div>
					</div>
				</div>

				
			</nav>
		</>
	);
}

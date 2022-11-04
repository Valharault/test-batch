import Footer from "./Footer";
import {useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import {SafeArea} from "capacitor-plugin-safe-area";

export default function Layout({children}) {

    const [isSidebarOpen, setSideOpen] = useState(true);
    const [isUserDropDownOpen, setUserDropDownOpen] = useState(false);

    const toggleSidebar = () => {
        setSideOpen(!isSidebarOpen);
    }

    const toggleUserDropDown = () => {
        setUserDropDownOpen(!isUserDropDownOpen);
    }


    const [appInsets, setAppInsets] = useState({top: 0, bottom:0})

    useEffect(() => {
        const setupWithInsets = async function () {
            const insets = await SafeArea.getSafeAreaInsets()
            console.log(insets)
            appInsets.top = insets.insets.top
            appInsets.bottom = insets.insets.bottom
            if (insets.insets.top === 0) {
                appInsets.height = '4rem'
            } else {
                appInsets.height = appInsets.top * 2 + 'px'
            }
            setAppInsets({...appInsets})
        }
        setupWithInsets();
    }, []);

    return (
        <div id="page-container" style={{marginTop: appInsets.top + 'px', marginBottom: appInsets.bottom + 'px'}} className={`flex flex-col mx-auto w-full min-h-screen bg-gray-100 px-safe ${isSidebarOpen ? 'lg:pl-64' : ''}`}>
            <nav id="page-sidebar" style={{marginTop: appInsets.top + 'px', marginBottom: appInsets.bottom + 'px'}} className={`flex flex-col fixed top-0 left-0 bottom-0 w-full lg:w-64 h-full bg-gray-800 text-gray-200 z-50 transform transition-transform duration-500 ease-out ${isSidebarOpen ? 'lg:translate-x-0 translate-x-0' : 'lg:-translate-x-full -translate-x-full'}`} aria-label="Main Sidebar Navigation">
                <div
                    className="h-16 bg-gray-600 bg-opacity-25 flex-none flex items-center justify-between lg:justify-center px-4 w-full">
                    <a href="javascript:void(0)"
                       className="inline-flex items-center space-x-2 font-bold text-lg tracking-wide text-white hover:opacity-75">
                        <svg className="hi-solid hi-cube-transparent inline-block w-5 h-5 text-indigo-400"
                             fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"
                                  clipRule="evenodd"/>
                        </svg>
                        <span>SupplySpace</span>
                    </a>

                    <div className="lg:hidden">
                        <button type="button" onClick={toggleSidebar}
                                className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-5 text-sm rounded border-transparent text-white opacity-75 hover:opacity-100 focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:opacity-75">
                            <svg className="hi-solid hi-x inline-block w-4 h-4 -mx-1" fill="currentColor"
                                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="overflow-y-auto">
                    <div className="p-4 w-full">
                        <nav className="space-y-1">
                            <NavLink to={'/dashboard'} onClick={() => setTimeout(() => {setSideOpen(false)}, 150)}
                               className="flex items-center space-x-3 px-3 font-medium rounded text-gray-50 bg-gray-700 bg-opacity-60">
                                <span className="flex-none flex items-center opacity-50">
                                  <svg className="hi-outline hi-home inline-block w-5 h-5" stroke="currentColor" fill="none"
                                       viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round"
                                                                                                    strokeLinejoin="round" strokeWidth="2"
                                                                                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                                </span>
                                <span className="py-2 grow">Dashboard</span>
                                <span
                                    className="px-2 py-1 rounded-full text-xs font-medium leading-4 bg-opacity-10 text-gray-100 bg-gray-400">3</span>
                            </NavLink>
                            <div
                                className="px-3 pt-5 pb-2 text-xs font-medium uppercase tracking-wider text-gray-400">Features
                            </div>
                            <a href="javascript:void(0)"
                               className="flex items-center space-x-3 px-3 font-medium rounded text-gray-300 hover:text-gray-100 hover:bg-gray-700 hover:bg-opacity-60 active:bg-gray-700 active:bg-opacity-40">
                                <span className="flex-none flex items-center opacity-50">
                                  <svg className="hi-outline hi-view-grid inline-block w-5 h-5" stroke="currentColor" fill="none"
                                       viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round"
                                                                                                    strokeLinejoin="round" strokeWidth="2"
                                                                                                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
                                </span>
                                <span className="py-2 grow">Inventaire</span>
                                <span className="px-2 py-1 rounded-full text-xs font-medium leading-4 bg-opacity-10 text-gray-100 bg-gray-400">99+</span>
                            </a>
                            <NavLink to={"/mes-ventes"} onClick={() => setTimeout(() => {setSideOpen(false)}, 150)}
                               className="flex items-center space-x-3 px-3 font-medium rounded text-gray-300 hover:text-gray-100 hover:bg-gray-700 hover:bg-opacity-60 active:bg-gray-700 active:bg-opacity-40">
            <span className="flex-none flex items-center opacity-50">
              <svg className="hi-outline hi-clipboard-list inline-block w-5 h-5" stroke="currentColor" fill="none"
                   viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="2"
                                                                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
            </span>
                                <span className="py-2 grow">Ventes</span>
                                <span
                                    className="px-2 py-1 rounded-full text-xs font-medium leading-4 bg-opacity-10 text-gray-100 bg-gray-400">9</span>
                            </NavLink>
                            <div
                                className="px-3 pt-5 pb-2 text-xs font-medium uppercase tracking-wider text-gray-400">Account
                            </div>
                            <a href="javascript:void(0)"
                               className="flex items-center space-x-3 px-3 font-medium rounded text-gray-300 hover:text-gray-100 hover:bg-gray-700 hover:bg-opacity-60 active:bg-gray-700 active:bg-opacity-40">
            <span className="flex-none flex items-center opacity-50">
              <svg className="hi-outline hi-user inline-block w-5 h-5" stroke="currentColor" fill="none"
                   viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="2"
                                                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            </span>
                                <span className="py-2 grow">Mon compte</span>
                            </a>
                            <a href="javascript:void(0)"
                               className="flex items-center space-x-3 px-3 font-medium rounded text-gray-300 hover:text-gray-100 hover:bg-gray-700 hover:bg-opacity-60 active:bg-gray-700 active:bg-opacity-40">
            <span className="flex-none flex items-center opacity-50">
              <svg className="hi-outline hi-cog inline-block w-5 h-5" stroke="currentColor" fill="none"
                   viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="2"
                                                                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path
                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </span>
                                <span className="py-2 grow">Paramètres</span>
                            </a>
                            <a href="javascript:void(0)"
                               className="flex items-center space-x-3 px-3 font-medium rounded text-gray-300 hover:text-gray-100 hover:bg-gray-700 hover:bg-opacity-60 active:bg-gray-700 active:bg-opacity-40">
            <span className="flex-none flex items-center opacity-50">
              <svg className="hi-outline hi-lock-open inline-block w-5 h-5" stroke="currentColor" fill="none"
                   viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="2"
                                                                                d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/></svg>
            </span>
                                <span className="py-2 grow">Déconnexion</span>
                            </a>
                        </nav>
                    </div>
                </div>
            </nav>
            <header id="page-header" style={{paddingTop: appInsets.top + 'px', marginBottom: appInsets.bottom + 'px', height: appInsets.height}} className={`flex flex-none items-center h-16 bg-gray-800 shadow-sm fixed top-0 right-0 left-0 z-30 ${isSidebarOpen ? 'lg:pl-64' : ''}`}>
                <div className="flex justify-between max-w-10xl mx-auto px-4 lg:px-8 w-full">
                    <div className="flex items-center space-x-2">
                        <div className="hidden lg:block">
                            <button onClick={toggleSidebar} type="button" className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-6 rounded border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none">
                                <svg className="hi-solid hi-menu-alt-1 inline-block w-5 h-5" fill="currentColor"
                                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                                </svg>
                            </button>
                        </div>

                        <div className="lg:hidden">
                            <button onClick={toggleSidebar} type="button" className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-2 py-1 leading-5 rounded border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none">
                                <svg className="hi-solid hi-menu-alt-1 inline-block w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className="relative inline-block">
                            <button onClick={toggleUserDropDown} type="button" className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-2 py-1 leading-5 text-sm rounded border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none" id="tk-dropdown-layouts-user" aria-haspopup="true" aria-expanded="true">
                                <span>Val#4512</span>
                                <svg className="hi-solid hi-chevron-down inline-block w-5 h-5 opacity-50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                                </svg>
                            </button>
                            <div role="menu" aria-labelledby="tk-dropdown-layouts-user" className={`absolute right-0 origin-top-right mt-2 w-48 shadow-xl rounded z-1 ${isUserDropDownOpen ? '' : 'hidden'}`}>
                                <div className="bg-white ring-1 ring-black ring-opacity-5 rounded divide-y divide-gray-100">
                                    <div className="p-2 space-y-1">
                                        <a role="menuitem" href="javascript:void(0)"
                                           className="flex items-center space-x-2 rounded py-2 px-3 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:bg-gray-100 focus:text-gray-700">
                                            <svg className="hi-solid hi-user-circle inline-block w-5 h-5 opacity-50"
                                                 fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                            <span>Profile</span>
                                        </a>
                                        <a role="menuitem" href="javascript:void(0)"
                                           className="flex items-center space-x-2 rounded py-2 px-3 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:bg-gray-100 focus:text-gray-700">
                                            <svg className="hi-solid hi-inbox inline-block w-5 h-5 opacity-50"
                                                 fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                      d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                            <span>Inbox</span>
                                        </a>
                                    </div>
                                    <div className="p-2 space-y-1">
                                        <a role="menuitem" href="javascript:void(0)"
                                           className="flex items-center space-x-2 rounded py-2 px-3 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:bg-gray-100 focus:text-gray-700">
                                            <svg className="hi-solid hi-cog inline-block w-5 h-5 opacity-50"
                                                 fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                            <span>Settings</span>
                                        </a>
                                    </div>
                                    <div className="p-2 space-y-1">
                                        <button type="submit" role="menuitem"
                                                className="w-full text-left flex items-center space-x-2 rounded py-2 px-3 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:bg-gray-100 focus:text-gray-700">
                                            <svg className="hi-solid hi-lock-closed inline-block w-5 h-5 opacity-50"
                                                 fill="currentColor" viewBox="0 0 20 20"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                            <span>Sign out</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main id="page-content" className="flex flex-auto flex-col max-w-full pt-16">
                <div className="max-w-10xl mx-auto p-4 lg:p-8 w-full">
                    {children}
                </div>
            </main>

            <Footer/>

        </div>
    )
}

import React from 'react';
import {useSearchParams} from "react-router-dom";
import AuthApi from "./AuthApi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Browser } from '@capacitor/browser'

export default function Auth() {

    const [searchParams, setSearchParams] = useSearchParams();

    React.useEffect(() => {
        const code = searchParams.get('code');
        if (code) {
            AuthApi.login(code
            ).then(() => {
                toast("Login successful");
                console.log("Login successful");
            }).catch(() => {
                toast.error("Login failed");
                console.log("Login failed");
            })
            searchParams.delete('code');
            setSearchParams(searchParams);
        }
    })

    const loginWithDiscord = async () => {
        await Browser.open({url: 'https://discord.com/api/oauth2/authorize?client_id=922921815813271572&redirect_uri=http://localhost:3000/auth&response_type=code&scope=identify%20email'});
    }
    return (
        <div id="page-container" className="flex flex-col mx-auto w-full min-h-screen bg-gray-100">
            <main id="page-content" className="flex flex-auto flex-col max-w-full">
                <div
                    className="min-h-screen flex items-center justify-center relative overflow-hidden max-w-10xl mx-auto p-4 lg:p-8 w-full">
                    <div
                        className="pattern-dots-md text-gray-300 absolute top-0 right-0 w-32 h-32 lg:w-48 lg:h-48 transform translate-x-16 translate-y-16"></div>
                    <div
                        className="pattern-dots-md text-gray-300 absolute bottom-0 left-0 w-32 h-32 lg:w-48 lg:h-48 transform -translate-x-16 -translate-y-16"></div>

                    <div className="py-6 lg:py-0 w-full md:w-8/12 lg:w-6/12 xl:w-4/12 relative">
                        <div className="flex flex-col rounded shadow-sm bg-white overflow-hidden">
                            <div className="p-5 text-center">
                                <h1 className="text-4xl font-bold inline-flex items-center mb-1 space-x-3">
                                    <img src={'https://space.supplyfrance.com/assets/img.png'}/>
                                    <span>Supply Space</span>
                                </h1>
                            </div>
                            <div className="p-5 lg:p-6 grow w-full">
                                <div className="sm:p-5 lg:px-10 lg:py-4">
                                    <div>
                                        <button onClick={loginWithDiscord} type="submit"
                                                className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none w-full px-4 py-3 leading-6 rounded border-indigo-700 bg-indigo-700 text-white hover:text-white hover:bg-indigo-800 hover:border-indigo-800 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 active:bg-indigo-700 active:border-indigo-700">
                                            Connexion avec Discord
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

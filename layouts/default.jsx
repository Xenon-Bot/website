import {AuthProvider} from "../context/auth";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";

export default function DefaultLayout({children}) {
    return (
        <AuthProvider>
            <Head>
                <title>Xenon Bot</title>
            </Head>
            <div className="flex flex-col h-screen overflow-y-auto">
                <NavBar/>
                <div className="bg-theme-darkest text-gray-100 flex-auto">
                    {children}
                </div>
                <Footer/>
            </div>
        </AuthProvider>
    )
}
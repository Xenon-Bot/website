import {TokenProvider} from "../context/token";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";

export default function DashboardLayout({children}) {
    return (
        <TokenProvider>
            <Head>
                <title>Xenon Bot - Dashboard</title>
            </Head>
            <div className="flex flex-col h-screen overflow-y-auto">
                <NavBar/>
                <div className="bg-theme-darkest text-gray-100 flex-auto">
                    {children}
                </div>
            </div>
        </TokenProvider>
    )
}
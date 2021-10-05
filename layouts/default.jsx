import {TokenProvider} from "../context/token";
import {UserProvider} from "../context/user";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";

export default function DefaultLayout({children}) {
    return (
        <TokenProvider>
            <UserProvider>
                <Head>
                    <title>Xenon Bot</title>
                </Head>
                <div className="flex flex-col min-h-screen">
                    <NavBar/>
                    <div className="bg-theme-darkest text-gray-100 flex-auto">
                        {children}
                    </div>
                    <Footer/>
                </div>
            </UserProvider>
        </TokenProvider>
    )
}
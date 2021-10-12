import {TokenProvider} from "../context/token";
import DashboardNavBar from "../components/dashboard/DashboardNavBar";
import Head from "next/head";
import {UserProvider} from "../context/user";
import {GuildsProvider} from "../context/guilds";
import DashboardSideBar from "../components/dashboard/DashboardSideBar";
import {SelectedGuildProvider} from "../context/selectedGuild";
import {useState} from 'react'
import {TierProvider} from "../context/tier";

export default function DashboardLayout({children}) {
    const [sideBarVisible, setSideBarVisible] = useState(false)

    return (
        <TokenProvider>
            <UserProvider>
                <TierProvider>
                    <GuildsProvider>
                        <SelectedGuildProvider>
                            <Head>
                                <title>Dashboard | Xenon Bot</title>
                            </Head>
                            <div className="flex flex-col h-screen">
                                <DashboardNavBar toggleSideBar={() => setSideBarVisible(!sideBarVisible)}/>
                                <div className="bg-theme-darkest text-gray-100 flex-auto">
                                    <DashboardSideBar visible={sideBarVisible}
                                                      toggleSideBar={() => setSideBarVisible(!sideBarVisible)}/>
                                    <div className="flex-auto p-5 lg:p-10 overflow-y-auto md:ml-64 mt-20">
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </SelectedGuildProvider>
                    </GuildsProvider>
                </TierProvider>
            </UserProvider>
        </TokenProvider>
    )
}
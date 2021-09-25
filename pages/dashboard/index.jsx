import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import DashboardLayout from "../../layouts/dashboard";

export async function getStaticProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['dashboard'])),
        },
    };
}

export default function Dashboard() {
    return (<div>Dashboard</div>)
}

Dashboard.getLayout = page => {
    return <DashboardLayout>{page}</DashboardLayout>
}
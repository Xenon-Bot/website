import DashboardLayout from "../../layouts/dashboard";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export async function getStaticProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['dashboard', 'common'])),
        },
    };
}

export default function DashboardChatlogs() {
    return <div/>
}

DashboardChatlogs.getLayout = page => {
    return <DashboardLayout>{page}</DashboardLayout>
}
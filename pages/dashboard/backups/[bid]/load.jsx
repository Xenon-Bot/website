import DashboardLayout from "../../../../layouts/dashboard";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export async function getServerSideProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['dashboard', 'common'])),
        },
    };
}

export default function DashboardBackupLoad() {
    return (
        <div>

        </div>
    )
}

DashboardBackupLoad.getLayout = page => {
    return <DashboardLayout>{page}</DashboardLayout>
}
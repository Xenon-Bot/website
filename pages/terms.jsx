import Head from "next/head";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export async function getStaticProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default function Terms() {
    return (
        <div>
            <Head>
                <title>Terms of Service | Xenon Bot</title>
            </Head>
            <div className="grid justify-items-center px-3 md:px-5">
                <div className="w-full xl:w-304 my-10">
                    <h3 className="text-5xl mb-5">Terms of Service</h3>
                    <div className="bg-theme-darker rounded-md p-3 md:p-5 text-lg">
                        <p className="mb-5">
                            By inviting Xenon or Xenon Pro to your discord server or logging into our website
                            (https://xenon.bot) you agree that you have read, understood, and
                            accepted these terms. You are also responsible for informing the members in your discord
                            server about these terms.
                            If you do not agree with any of these terms, you are prohibited from using or adding any
                            version of Xenon to your server.
                        </p>

                        <h5 className="text-3xl mb-2">Disclaimer</h5>
                        <p className="mb-5">
                            You are strictly prohibited to use Xenon against the ToS of discord or for illegal purposes.
                            We are doing our best to prevent these activities, while trying to provide the best user
                            experience as possible. If you find people or communities using Xenon against the ToS of
                            discord or even for illegal activities, please send us an email to <span
                            className="text-blue-400">contact (at) xenon
                            (dot) bot</span>.
                        </p>

                        <h5 className="text-3xl mb-2">Proprietary Rights</h5>
                        <p className="mb-5">
                            We (Xenon Bot or more specifically Merlin Fuchs) own and retain all rights for public
                            available data (including but not limited to templates). We grant you the permission to use
                            this available data for your own needs, but strictly disallow any commercial use. You
                            therefore shall not sell, license or otherwise commercialize the data except if the
                            permission was expressly granted to you.
                        </p>

                        <h5 className="text-3xl mb-2">Availability</h5>
                        <ul className="mb-5 list-disc list-inside">
                            <li>Xenon is provided as-is. There are no guarantees that it will be available in the
                                future, and its purpose or availability may be changed at any time.
                            </li>
                            <li>User related data including backups may be deleted at any time.</li>
                            <li>User related data including backups is non-transferable between discord accounts.</li>
                            <li>Any premium features are not guaranteed. They may change or be revoked at any time.</li>
                            <li>Access to all or specific features of Xenon may be revoked, for all or a specific user,
                                at any time.
                            </li>
                        </ul>

                        <h5 className="text-3xl mb-2">Refund Policy</h5>
                        <p className="mb-3">
                            Refunds for payments may be issued when the user requests it and one of the following
                            requirements is met:
                        </p>
                        <ul className="mb-3 list-disc list-inside">
                            <li>it&apos;s the first payment and the user requests a refund on the same day</li>
                            <li>it&apos;s a monthly recurring payment and the user requests a refund in a three day
                                period
                            </li>
                            <li>it&apos;s an annual recurring payment and the user requests a refund in a seven day
                                period
                            </li>
                            <li>A major premium feature was removed and the user bought the tier specifically because of
                                that feature
                            </li>
                        </ul>
                        <p className="mb-5">
                            We still require a comprehensible explanation of the situation and never guarantee a refund.
                            Partial refunds might be issued for annual payments under special circumstances.

                            Refunds are never issued if you have broken our Terms of Service and therefore lost access
                            to certain or all features.
                        </p>
                        <p>Last Updated: <span className="text-blue-400">27.09.2021</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
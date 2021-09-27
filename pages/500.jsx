import Link from "next/link";
import Head from "next/head";

export default function Custom500() {
    return (
        <div className="my-20 px-5 text-center">
            <Head>
                <title>Internal Error | Xenon Bot</title>
            </Head>
            <div className="text-4xl font-bold mb-5">500 - Something Went Wrong</div>
            <div className="text-xl text-gray-300 mb-10">This is most likely a problem on our end, please try again later.</div>
            <Link href="/" passHref>
                <a className="bg-blue-500 px-5 py-2 rounded-md text-xl hover:bg-blue-600">Go Back</a>
            </Link>
        </div>
    )
}
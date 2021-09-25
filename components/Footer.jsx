import Link from 'next/link'

export default function Footer() {
    return (
        <div className="py-10 bg-theme-darker grid justify-items-center text-gray-100 px-5">
            <div className="w-full xl:w-304 flex flex-col lg:flex-row">
                <div className="flex flex-col flex-auto">
                    <div className="flex-auto">
                        <div className="flex items-center mb-5">
                            <img src="/logo.png" alt="" className="w-10 rounded-full mr-3"/>
                            <div className="text-2xl">Xenon Bot</div>
                        </div>
                        <div className="text-gray-400">Discord Backups, Templates and More</div>
                    </div>
                    <div className="flex-initial font-light text-gray-500">
                        <div>Copyirght 2021 © Merlin Fuchs</div>
                    </div>
                </div>
                <div className="flex flex-initial">
                    <div className="mr-24">
                        <div className="mb-4">Links</div>
                        <div className="mb-2">
                            <a href="/discord" target="_blank"
                               className="text-gray-400 hover:text-blue-300">Discord</a>
                        </div>
                        <div className="mb-2">
                            <a href="/twitter" target="_blank"
                               className="text-gray-400 hover:text-blue-300">Twitter</a>
                        </div>
                        <div className="mb-2">
                            <a href="/docs" target="_blank"
                               className="text-gray-400 hover:text-blue-300">Documentation</a></div>
                    </div>
                    <div>
                        <div className="mb-4">Legal</div>
                        <div className="mb-2">
                            <Link href="/terms" passHref>
                                <a className="text-gray-400 hover:text-blue-300">Terms of Service</a>
                            </Link>
                        </div>
                        <div className="mb-2">
                            <Link href="/privacy" passHref>
                                <a className="text-gray-400 hover:text-blue-300">Privacy Policy</a>
                            </Link>
                        </div>
                        <div className="mb-2">
                            <Link href="/contact" passHref>
                                <a className="text-gray-400 hover:text-blue-300">Contact</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
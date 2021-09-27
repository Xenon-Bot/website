import useApi from "../../hooks/api";
import Link from "next/link";
import {userAvatar} from "../../util";

export default function TemplateCreator({id}) {
    const {data: user, error} = useApi({
        path: `/users/${id}`
    })

    if (!user) return <div/>

    return (
        <Link passHref href={`/users/${user.id}`}>
            <a
                className="flex-auto md:flex-initial flex bg-theme-dark hover:bg-theme-light rounded-lg pl-3 pr-10 py-3 items-center cursor-pointer">
                <img src={userAvatar(user, {size: 128})} alt=""
                     className="rounded-full w-14 mr-4"/>
                <div>
                    <div id="creatorName" className="text-2xl">{user.username}</div>
                    <div className="text-gray-400 font-xl">
                        #<span id="creatorDiscriminator">{user.discriminator}</span>
                    </div>
                </div>
            </a>
        </Link>
    )
}
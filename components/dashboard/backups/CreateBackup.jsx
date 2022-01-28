import {useSelectedGuild} from "../../../context/selectedGuild";
import {useTier} from "../../../context/tier";
import {useEffect, useState} from 'react'
import apiRequest from "../../../api";
import {useToken} from "../../../context/token";
import {toast} from "react-toastify";
import CustomSelect from "../../CustomSelect";

export default function CreateBackup({newBackup}) {
    const [selectedGuild] = useSelectedGuild()
    const [token] = useToken()
    const tier = useTier()

    const [options, setOptions] = useState([])
    const [availableOptions, setAvailableOptions] = useState([])
    const [messageCount, setMessageCount] = useState(0)

    useEffect(() => {
        if (!tier) return
        setMessageCount(tier.info.max_backup_messages)
        setAvailableOptions(tier.info.allowed_backup_create_options.map(o => {
            return {
                label: o,
                value: o
            }
        }))
        setOptions(availableOptions)
    }, [tier])

    function handleCreate() {
        apiRequest({
            method: 'POST',
            path: '/backups',
            data: {
                guild_id: selectedGuild.id,
                options: options.map(o => o.value),
                message_count: messageCount
            },
            token
        })
            .then(async resp => {
                if (resp.ok) {
                    newBackup(await resp.json())
                    toast.success('The backup has been created')
                } else if (resp.status === 429) {
                    toast.error('Please wait before trying to create a new backup')
                } else {
                    toast.error('There was a problem while trying to create your backup')
                }
            })
    }

    return selectedGuild ? (
        <div>
            <div className="grid grid-cols-2 mb-5 gap-5">
                <div>
                    <div className="text-lg">Options</div>
                    <div className="font-thin text-gray-300 mb-3">Select what the bot will save</div>
                    <CustomSelect options={availableOptions} isMulti={true} onChange={options => setOptions(options)} value={options}/>
                </div>
                <div>
                    <div className="text-lg">Message Count</div>
                    <div className="font-thin text-gray-300 mb-3">The count of messages the bot will save in
                        each
                        channel
                    </div>
                    <input type="number" className="w-full bg-theme-light rounded-md px-3 py-2" min="0"
                           max="250" value={messageCount} onChange={e => {setMessageCount(parseInt(e.target.value) || 0)}}/>
                    {tier && tier.info.max_backup_messages < messageCount ? (
                        <div className="text-sm text-red-300 mt-1">
                            You need a higher tier to save this many messages in your backups.
                        </div>
                    ) : ''}
                </div>
            </div>

            <div className="text-right">
                <button className="px-3 py-2 rounded-md bg-blue-400 hover:bg-blue-300 text-black" onClick={handleCreate}>Create
                    Backup
                </button>
            </div>
        </div>
    ) : (
        <div className="text-gray-400">Select a guild at the top to create backups</div>
    )
}
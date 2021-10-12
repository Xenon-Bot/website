import {useSelectedGuild} from "../../../context/selectedGuild";
import {useEffect, useState} from "react";
import apiRequest from "../../../api";
import {useToken} from "../../../context/token";
import {useTier} from "../../../context/tier";
import {toast} from "react-toastify";

export default function ManageInterval() {
    const [selectedGuild] = useSelectedGuild()
    const [token] = useToken()
    const tier = useTier()

    const [enabled, setEnabled] = useState(false)
    const [interval, setInterval] = useState(24)
    const [messageCount, setMessageCount] = useState(0)
    const [keep, setKeep] = useState(1)

    useEffect(() => {
        if (!tier) return
        setMessageCount(tier.info.max_backup_messages)
        setKeep(tier.info.max_backup_interval_keep)
    }, [tier])

    useEffect(() => {
        if (!selectedGuild) return
        if (!token) return

        apiRequest({
            path: `/backups/intervals/${selectedGuild.id}`,
            token
        })
            .then(async resp => {
                if (!resp.ok) {
                    setEnabled(false)
                    return
                }

                const data = await resp.json()
                setInterval(data.interval)
                setMessageCount(data.message_count ?? 0)
                setKeep(data.keep ?? 1)
                setEnabled(true)
            })
    }, [selectedGuild, token])

    function handleSave() {
        apiRequest({
            method: 'PUT',
            path: `/backups/intervals/${selectedGuild.id}`,
            data: {
                interval: interval,
                message_count: messageCount,
                keep: keep
            },
            token
        })
            .then(async resp => {
                if (!resp.ok) {
                    toast.error('Failed to update the settings for automated backups')
                    return
                }

                const data = await resp.json()
                setInterval(data.interval)
                setMessageCount(data.message_count ?? 0)
                setKeep(data.keep ?? 1)
                setEnabled(true)
                toast.success('The settings for automated backups have been updated')
            })
    }

    function handleDisable() {
        apiRequest({
            method: 'DELETE',
            path: `/backups/intervals/${selectedGuild.id}`,
            token
        })
            .then(async resp => {
                if (!resp.ok) {
                    toast.error('Failed to disable automated backups')
                    return
                }

                setEnabled(false)
                toast.success('Automated backups have been disabled')
            })
    }

    return selectedGuild ? (
        <div>
            <div className="grid grid-cols-2 mb-5 gap-5 filter">
                <div>
                    <div className="text-lg">Interval</div>
                    <div className="font-thin text-gray-300 mb-3">How often backups are created
                    </div>
                    <select className="w-full rounded-md bg-theme-light px-3 py-2" value={interval}
                            onChange={e => setInterval(parseInt(e.target.value))}>
                        <option value={4}>4 hours</option>
                        <option value={8}>8 hours</option>
                        <option value={12}>12 hours</option>
                        <option value={24}>24 hours</option>
                        <option value={48}>2 days</option>
                        <option value={3 * 24}>3 days</option>
                        <option value={7 * 24}>7 days</option>
                        <option value={14 * 24}>14 days</option>
                        <option value={30 * 24}>30 days</option>
                    </select>
                    {tier && tier.info.min_backup_interval > interval ? (
                        <div className="text-sm text-red-300 mt-1">
                            You need to buy premium to set the interval this low.
                        </div>
                    ) : ''}
                </div>
                <div>
                    <div className="text-lg">Message Count</div>
                    <div className="font-thin text-gray-300 mb-3">The count of messages the bot will save in
                        each
                        channel
                    </div>
                    <input type="number" className="w-full bg-theme-light rounded-md px-3 py-2" min="0"
                           max="250" value={messageCount} onChange={e => setMessageCount(parseInt(e.target.value) || 0)}/>
                    {tier && tier.info.max_backup_messages < messageCount ? (
                        <div className="text-sm text-red-300 mt-1">
                            You need a higher tier to save this many messages in your backups.
                        </div>
                    ) : ''}
                </div>
                <div>
                    <div className="text-lg">Keep</div>
                    <div className="font-thin text-gray-300 mb-3">How many interval backups are kept for the
                        selected server
                    </div>
                    <input type="number" className="w-full bg-theme-light rounded-md px-3 py-2" min="0"
                           max="8" value={keep} onChange={e => setKeep(parseInt(e.target.value) || 1)}/>
                    {tier && tier.info.max_backup_interval_keep < keep ? (
                        <div className="text-sm text-red-300 mt-1">
                            You need a higher tier to keep this automated backups.
                        </div>
                    ) : ''}
                </div>
            </div>

            {enabled ? (
                <div className="text-right">
                    <button
                        className="px-3 py-2 rounded-md bg-red-400 hover:bg-red-300 mr-3 text-black"
                        onClick={handleDisable}>Disable
                    </button>
                    <button className="px-3 py-2 rounded-md bg-blue-400 hover:bg-blue-300 text-black"
                            onClick={handleSave}>Save
                    </button>
                </div>
            ) : (
                <div className="text-right">
                    <button className="px-3 py-2 rounded-md bg-blue-400 hover:bg-blue-300 text-black"
                            onClick={handleSave}>Enable
                    </button>
                </div>
            )}
        </div>
    ) : (
        <div className="text-gray-400">Select a guild at the top to setup automated backups</div>
    )
}
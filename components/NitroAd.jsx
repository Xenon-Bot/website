import {useEffect} from "react";

export default function NitroAd({name, refreshLimit = 10, refreshTime = 90, sizes, maxWidth, minWidth, rail = false, anchor = false}) {
    const adId = `nad_${name}`
    const demo = process.env.NODE_ENV === 'development'

    const options = {
        demo: demo,
        refreshLimit: refreshLimit,
        refreshTime: refreshLimit,
        renderVisibleOnly: true,
        refreshVisibleOnly: true,
        sizes: sizes,
        report: {
            enabled: true,
            wording: 'Report Ad',
            position: 'bottom-right'
        },
    }

    if (maxWidth && minWidth) {
        options.mediaQuery = `(max-width: ${maxWidth}px) and (min-width: ${minWidth}px)`
    } else if (maxWidth) {
        options.mediaQuery = `(max-width: ${maxWidth}px)`
    } else if (minWidth) {
        options.mediaQuery = `(min-width: ${minWidth}px)`
    }

    if (rail) {
        options.format = 'rail'
        options.rail = rail
        options.railOffsetTop = 0
        options.railOffsetBottom = 0
        options.railCollisionWhitelist = []
    } else if (anchor) {
        options.format = 'anchor'
        options.anchor = anchor
    }

    const script = `
        window['nitroAds'].createAd('${adId}', ${JSON.stringify(options)});
    `

    useEffect(() => {
        if (!process.browser) return

        const scriptTag = document.createElement('script')
        scriptTag.innerHTML = script
        document.body.appendChild(scriptTag)
    }, [script])

    return <div id={adId}/>
}
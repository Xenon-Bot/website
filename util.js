const DISCORD_CDN = 'https://cdn.discordapp.com'

export function userAvatar({id, discriminator, avatar}, {size = 512}) {
    if (avatar) {
        return `${DISCORD_CDN}/avatars/${id}/${avatar}.webp?size=${size}`
    } else {
        return `${DISCORD_CDN}/embed/avatars/${parseInt(discriminator) % 5}.png?size=${size}`
    }
}

export function guildIcon({id, icon}, {size = 512}) {
    if (!icon) return null

    return `${DISCORD_CDN}/icons/${id}/${icon}.webp?size=${size}`
}

export function hasBitFlag(value, bit) {
    if (!value) return false

    const shifted = 1 << bit;
    return (value & shifted) === shifted
}
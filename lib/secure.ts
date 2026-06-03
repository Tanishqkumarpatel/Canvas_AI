import crypto from 'crypto'

const KEY = Buffer.from(process.env.CANVAS_ENCRPTION_KEY!, 'hex')

if (!KEY || KEY.length !== 32) throw new Error('Invalid encription key')

export function encryptToken(token: string): string {
    const iv = crypto.randomBytes(12)
    const cipher = crypto.createCipheriv('aes-256-gcm', KEY, iv)

    const encrypted = Buffer.concat([
        cipher.update(token, 'utf-8'),
        cipher.final()
    ])

    const tag = cipher.getAuthTag()

    return [iv, tag, encrypted].map(b=> b.toString('hex')).join(':')
}

export function decryptToken(cipherToken: string): string {
    const[ivHex, tagHex, encHex] = cipherToken.split(':')
    const iv = Buffer.from(ivHex, 'hex')
    const tag = Buffer.from(tagHex, 'hex')
    const encrypted = Buffer.from(encHex, 'hex')

    const decipher = crypto.createDecipheriv('aes-256-gcm', KEY, iv)
    decipher.setAuthTag(tag)

    return Buffer.concat([
        decipher.update(encrypted),
        decipher.final()
    ]).toString('utf-8')

}
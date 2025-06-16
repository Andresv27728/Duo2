import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true

  let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let chat = global.db.data.chats[m.chat]
  let defaultImage = 'https://qu.ax/VdyQE.jpg'

  if (chat.welcome) {
    let img
    try {
      let pp = await conn.profilePictureUrl(who, 'image')
      img = await (await fetch(pp)).buffer()
    } catch {
      img = await (await fetch(defaultImage)).buffer()
    }

    // BOTÓNES PERSONALIZADOS
    const buttons = [
      { buttonId: '#menu', buttonText: { displayText: '📜 Ver Menú' }, type: 1 },
      { buttonId: '#owner', buttonText: { displayText: '👑 owner' }, type: 1 },
      { buttonId: '#estado', buttonText: { displayText: '⚙ Estado Bot' }, type: 1 }
    ]

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      let bienvenida = `┏━〔 *Bienvenido/a a Duolingo-AI* 〕━┓
┃ Usuario: ${taguser}
┃ Grupo: *${groupMetadata.subject}*
┃
┃ ✨ ¡Pásala genial con todos!
┃ 📌 Usa los botones para explorar
┗━━━━━━━━━━━━━━━━━━┛`

      await conn.sendMessage(m.chat, {
        image: img,
        caption: bienvenida,
        mentions: [who],
        buttons: buttons,
        footer: 'Bienvenido a Duolingo-AI'
      })
    } else if (
      m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE ||
      m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE
    ) {
      let bye = `┏━〔 *Hasta pronto de Duolingo-AI* 〕━┓
┃ Usuario: ${taguser}
┃ Grupo: *${groupMetadata.subject}*
┃
┃ 😢 ¡Te extrañaremos!
┃ 🌐 Vuelve cuando gustes
┗━━━━━━━━━━━━━━━━━━┛`

      await conn.sendMessage(m.chat, {
        image: img,
        caption: bye,
        mentions: [who],
        buttons: buttons,
        footer: 'Gracias por usar Duolingo-AI'
      })
    }
  }

  return true
}
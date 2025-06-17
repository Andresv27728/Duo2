
import fetch from 'node-fetch'

let handler = async (m, { text, args, usedPrefix, command }) => {
  if (!text) return m.reply(`✳️ Escribe un mensaje para Duolingo.\n\nEjemplo:\n${usedPrefix + command} ¿Cómo se dice casa en francés?`)

  try {
    let res = await fetch('https://character.ai/chat/fXVBkp3LIr-QIl3VeMfMIZN2aNaPH6MyDQ6DCRShj2E', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    })

    if (!res.ok) throw new Error('❌ Error al contactar con la API')

    let json = await res.json()
    let reply = json.reply || json.response || json.message || '❓ Duolingo no entendió tu pregunta.'

    await m.reply('🦉 Duolingo dice:\n\n' + reply)
  } catch (e) {
    console.error(e)
    await m.reply('⚠️ Hubo un error al conectar con Duolingo.')
  }
}

handler.help = ['duolinguo']
handler.tags = ['ai']
handler.command = /^duolinguo$/i

export default handler

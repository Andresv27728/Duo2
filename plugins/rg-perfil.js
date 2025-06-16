import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  let who = m.mentionedJid?.[0] || m.fromMe ? conn.user.jid : m.sender;
  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => imagen1);
  let userId = who;

  let user = global.db.data.users[userId] || {};
  let name = conn.getName(userId);
  let cumpleanos = user.birthday || 'No especificado';
  let genero = user.gender || 'No especificado';
  let pareja = user.partner || 'Nadie';
  let description = user.description || 'Sin Descripción';
  let exp = user.exp || 0;
  let nivel = user.level || 0;
  let role = user.role || 'Sin Rango';
  let coins = user.coins || 0;
  let bankCoins = user.bank || 0;
  let premium = user.premium ? '✅' : '❌';
  let edad = user.age || 'Desconocida';
  let moneda = '💰';
  let usedPrefix = '!';

  let texto = `*— 〢 P E R F I L  D E  U S U A R I O*\n\n`;
  texto += `⇏ *Nombre:* ${name}\n`;
  texto += `⇏ *Edad:* ${edad}\n`;
  texto += `⇏ *Cumpleaños:* ${cumpleanos}\n`;
  texto += `⇏ *Género:* ${genero}\n`;
  texto += `⇏ *Casado con:* ${pareja}\n`;
  texto += `⇔ *Experiencia:* ${exp.toLocaleString()}\n`;
  texto += `⇔ *Nivel:* ${nivel}\n`;
  texto += `⇏ *Rango:* ${role}\n`;
  texto += `⇏ *Coins Cartera:* ${coins.toLocaleString()} ${moneda}\n`;
  texto += `➔ *Coins Banco:* ${bankCoins.toLocaleString()} ${moneda}\n`;
  texto += `➔ *Premium:* ${premium}\n`;

  await conn.sendMessage(m.chat, {
    image: { url: pp },
    caption: texto.trim(),
    footer: 'Elige una acción:',
    buttons: [
      { buttonId: '.inventario', buttonText: { displayText: '🎒 Inventario' }, type: 1 },
      { buttonId: '.menu', buttonText: { displayText: '📜 menu' }, type: 1 },
      { buttonId: '.owner', buttonText: { displayText: '👑 owner' }, type: 1 }
    ],
    headerType: 4,
    mentions: [who]
  }, { quoted: m });
}

handler.help = ['profile'];
handler.tags = ['rpg'];
handler.command = ['profile', 'perfil'];
handler.register = true;
handler.group = true;

export default handler;
const handler = async (m, { conn }) => {
  if (!global.db.data.users[m.sender]) {
    throw `${emoji4} Usuario no registrado. Usa .register`;
  }

  const lastCofreTime = global.db.data.users[m.sender].lastcofre;
  const timeToNextCofre = lastCofreTime + 86400000;

  if (Date.now() < timeToNextCofre) {
    const tiempoRestante = timeToNextCofre - Date.now();
    const mensajeEspera = `${emoji3} Ya reclamaste tu cofre\n⏰ Regresa en: *${msToTime(tiempoRestante)}* para volver a reclamar.`;
    await conn.sendMessage(m.chat, { text: mensajeEspera }, { quoted: m });
    return;
  }

  const img = 'https://qu.ax/xvBNL.jpg';
  const coin = Math.floor(Math.random() * 100);
  const token = Math.floor(Math.random() * 10);
  const diamante = Math.floor(Math.random() * 40);
  const exp = Math.floor(Math.random() * 5000);

  global.db.data.users[m.sender].coin += coin;
  global.db.data.users[m.sender].diamonds += diamante;
  global.db.data.users[m.sender].joincount += token;
  global.db.data.users[m.sender].exp += exp;
  global.db.data.users[m.sender].lastcofre = Date.now();

  const texto = `
╭━〔 Cσϝɾҽ Aʅҽαƚσɾισ 〕⬣
┃📦 *¡Has reclamado tu cofre!*
┃🎉 ¡Felicidades!
╰━━━━━━━━━━━━⬣

╭━〔 Nυҽʋσʂ Rҽƈυɾʂσʂ 〕⬣
┃💸 *${coin}* Monedas
┃⚜️ *${token}* Tokens
┃💎 *${diamante}* Diamantes
┃✨ *${exp}* Exp
╰━━━━━━━━━━━━⬣`;

  await conn.sendMessage(m.chat, {
    image: { url: img },
    caption: texto,
    footer: 'Elige una opción:',
    buttons: [
      { buttonId: '.inventario', buttonText: { displayText: '🎒 Inventario' }, type: 1 },
      { buttonId: '.perfil', buttonText: { displayText: '👤 Perfil' }, type: 1 },
      { buttonId: '.menu', buttonText: { displayText: '📜 menu' }, type: 1 }
    ],
    headerType: 4
  }, { quoted: m });
};

handler.help = ['cofre'];
handler.tags = ['rpg'];
handler.command = ['cofre'];
handler.level = 5;
handler.group = true;
handler.register = true;

export default handler;

function msToTime(duration) {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  return `${hours} horas ${minutes} minutos`;
}
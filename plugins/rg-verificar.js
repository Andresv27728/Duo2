let handler = async (m, { conn, args }) => {
  let texto = args.join(" ");
  if (!texto.includes(".")) return m.reply(`✳️ Usa el formato: *.reg nombre.edad*\n📌 Ejemplo: *.reg Nagi.17*`);

  let [nombre, edad] = texto.split(".");
  if (!nombre || !edad) return m.reply("❌ Debes escribir tu nombre y edad separados por un punto.\nEjemplo: *.reg fantom.18*");
  if (isNaN(edad)) return m.reply("❌ La edad debe ser un número.");
  if (global.db.data.users[m.sender]?.registered) return m.reply("✅ Ya estás registrado.");

  global.db.data.users[m.sender] = {
    registered: true,
    name: nombre,
    age: parseInt(edad),
    exp: 0,
    level: 0,
    role: 'Usuario',
    coins: 0,
    bank: 0,
    premium: false,
    partner: '',
    birthday: '',
    gender: '',
    description: '',
    lastcofre: 0,
    joincount: 0,
    diamonds: 0
  };

  // Aquí se usa tu imagen directamente
  let caption = `✅ *Registro exitoso*\nBienvenido/a *${nombre}* de *${edad} años* a *duolingo-ai*`;
  let img = "https://qu.ax/gAExo.jpg";

  await conn.sendFile(m.chat, img, 'registro.jpg', caption, m);
};

handler.command = /^reg$/i;
handler.register = false;
handler.help = ['reg nombre.edad'];
handler.tags = ['rpg'];

export default handler;
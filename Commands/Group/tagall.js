require("../../config.js");
require("../../Core.js");

module.exports = {
  name: "tagall",
  alias: ["tag", "all"],
  desc: "Markiere alle Gruppenmitglieder",
  category: "Group",
  usage: "tagall",
  react: "🍁",
  start: async (
    Miku,
    m,
    { text, prefix, isBotAdmin, isAdmin, participants, args }
  ) => {
    if (!isAdmin)
      return Miku.sendMessage(m.from, { text: mess.useradmin }, { quoted: m });

    let message = args ? args.join(' ') :  m.quoted ? m.quoted.msg : 'Kein Nachricht';

    let mess = `               *『 Achtung Hier 』*
    
*Tagged by:* @${m.sender.split("@")[0]}
    
*Message:* ${message}\n\n`;

    for (let mem of participants) {
      mess += `♢ @${mem.id.split("@")[0]}\n`;
    }
    mess += `\n\n                    *Danke*\n`;

    await Miku.sendMessage(m.from, { text: mess,mentions: participants.map(a => a.id) }, { quoted: m });
  },
};

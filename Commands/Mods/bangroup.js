const mongoose = require("mongoose");
require("../../config.js");
require("../../Core.js");
const { mk, mku } = require("../../Database/dataschema.js");



module.exports = {
    name: "bangroup",
    alias: ["bangc"],
    desc: "Eine Gruppe sperren",
    category: "core",
    usage: "bangroup",
    react: "🎀",
    start: async (Miku, m, { text, prefix, isBotAdmin, isAdmin, mentionByTag, pushName, isCreator , groupName,modStatus}) => {
    
    if (modStatus == "false" && !isCreator) return Miku.sendMessage(m.from, { text: 'Tut mir leid, nur meine *Devs* und *Mods* können diesen Befehl verwenden !' }, { quoted: m });

    let checkdata = await mk.findOne({ id: m.from })
    try {
        if (!checkdata) {
            await new mk({ id: m.from, bangroup: "true" }).save()
            return m.reply(`*${groupName}* ist jetzt für die Verwendung *${global.botName}* *verboten*`)
        } else {
            if (checkdata.bangroup == "true") return m.reply(`*${groupName}* ist *bereits verboten* *${global.botName}* zu verwenden`)
            await mk.updateOne({ id: m.from }, { bangroup: "true" })
            return m.reply(`*This Group Is Banned From Using Bot.*`)
        }
    } catch (err) {
        console.log(err);
        return Miku.sendMessage(m.from, { text: `Beim Sperren des Benutzers ist ein interner Fehler aufgetreten.` }, { quoted: m });
    }
}
}

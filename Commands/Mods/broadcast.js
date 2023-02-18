const mongoose = require("mongoose");
require("../../config.js");
require("../../Core.js");
const { mk, mku } = require("../../Database/dataschema.js");



module.exports = {
    name: "broadcast",
    alias: ["bc","bcmessage"],
    desc: "Senden Sie eine Nachricht an alle Gruppen, in denen dieser Bot vorhanden ist",
    category: "Mods",
    usage: "bc <message>",
    react: "🎀",
    start: async (Miku, m, { text, prefix, isBotAdmin, participants, pushName, isCreator , args,modStatus}) => {
    
    if (modStatus == "false" && !isCreator) return Miku.sendMessage(m.from, { text: 'Tut mir leid, nur meine *Devs* und *Mods* können diesen Befehl verwenden !' }, { quoted: m });

    if(!text && !m.quoted) return Miku.sendMessage(m.from, { text: `Bitte geben Sie eine Nachricht zur Übertragung ein !\n\nBeispiel: ${prefix}bc Hallo Leute!` }, { quoted: m });

    const broadcastText = m.quoted ? m.quoted.msg : args ? args.join(" ") : "" ;

    let FetchGC = await Miku.groupFetchAllParticipating()
    let group = Object.entries(FetchGC).slice(0).map(entry => entry[1])
    let anu = group.map(v => v.id)
    m.reply(`*Broadcast-Nachricht an ${anu.length} gruppen...*`)

    for (let i of anu) {
        let txt = `*「  🧣 ${botName} Broadcast 🧣  」*\n\n*🧩 Nachricht:* ${broadcastText}\n\n\n*🔰 Grüße ~ ${pushName}*`
        setTimeout(function(){
            Miku.sendMessage(i, {video:botVideo, caption: txt, mentions:participants.map(a => a.id)});
        }, 1500);
    }

    m.reply(`*Broadcast-Nachricht an ${anu.length} Gruppen Gesendet !*`)
}
}

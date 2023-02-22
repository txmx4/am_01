module.exports = {
    name: "support",
    alias: ["supportgc"],
    desc: "Sends support group link.",
    cool:3,
    react: "🍁",
    category: "Core",
    start: async(Miku, m,{pushName}) => {
        m.reply(`Check your DM *${pushName}* Senpai !\n\nI have sent you support group link personally.`)
        let botpic = botImage1
        let txt = `      🧣 *Support Group* 🧣\n\n*${botName}* ist ein open-source project, und wir helfen dir gerne.\n\n*Link:* https://chat.whatsapp.com/DOnXPARAhdg3qptwUlPuye \n\n*Note:* Bitte spamme nicht in der Gruppe, und benachrichtige *Admins nicht direkt * Ohne Berechtigung. Frage nach Hilfe in der *Gruppe* .\n\n*Thanks for using Atlas.*`
        await Miku.sendMessage(m.sender,{image:{url:botpic}, caption:txt},{quoted:m})
    }

}

const { mku } = require("../../Database/dataschema.js");

module.exports = {
    name: "block",
    alias: ["blockuser"],
    desc: "Um einen Benutzer vom Konto des Bots zu sperren",
    category: "Mods",
    usage: "block @user",
    react: "🎀",
    start: async (
      Miku,
      m,
      { args, text,prefix, isCreator, pushName,modStatus }
    ) => {
      
      if (modStatus=="false"&&!isCreator)  return Miku.sendMessage(m.from, { text: 'Entschuldigung, nur mein *Owner* und *Mods* können diesen Befehl verwenden !' }, { quoted: m });

      if (!text && !m.quoted) {
        return Miku.sendMessage( 
          m.from, 
          { text: `Bitte markieren Sie einen Benutzer zum *Blockieren*!` }, 
          { quoted: m } 
        )}
        else if(m.quoted){
          var mentionedUser = m.quoted.sender;
        }
        else{
          var mentionedUser = mentionByTag[0];
        }

        await Miku.updateBlockStatus(mentionedUser, 'block').then(async (res) => {
            Miku.sendMessage(m.from, { text: `Erfolgreich *Blockiert* @${mentionedUser.split("@")[0]} Senpai !`, mentions: [mentionedUser] }, { quoted: m }).catch((e)=>{
                Miku.sendMessage(m.from, { text: `Fehler beim Blockieren @${mentionedUser.split("@")[0]} Senpai ! Vielleicht ist er schon gesperrt !` , mentions: [mentionedUser]}, { quoted: m })
            }
            )
            }).catch((e)=>{
                Miku.sendMessage(m.from, { text: `Failed to block @${mentionedUser.split("@")[0]} Senpai ! Vielleicht ist er schon gesperrt !` , mentions: [mentionedUser]}, { quoted: m })
            }
            )
    },
    };

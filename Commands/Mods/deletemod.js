const { mku } = require("../../Database/dataschema.js");

module.exports = {
  name: "delmod",
  alias: ["removemod", "unmod", "deleteMod"],
  desc: "Um einen Benutzer aus Mod zu entfernen",
  category: "Mods",
  usage: "delmod @user",
  react: "🎀",
  start: async (
    Miku,
    m,
    { text, prefix, mentionByTag, pushName, isCreator, owner,modStatus }
  ) => {

      if (modStatus=="false"&&!isCreator)  return Miku.sendMessage(m.from, { text: 'Entschuldigung, nur mein *Owner* und *Mods* können diesen Befehl verwenden !' }, { quoted: m });
    //var TaggedUser = mentionByTag[0];

    if (!text && !m.quoted) {
      return Miku.sendMessage(
        m.from,
        { text: `Bitte markiere einen *Mod*, um ihn aus *Moderation* zu entfernen !` },
        { quoted: m }
      );
    } else if (m.quoted) {
      var mentionedUser = m.quoted.sender;
    } else {
      var mentionedUser = mentionByTag[0];
    }
    //var mentionedUser = mentionByTag;
    let userId = (await mentionedUser) || m.msg.contextInfo.participant;
    try {
      var ownerlist = global.owner;
      mku
        .findOne({ id: userId })
        .then(async (user) => {
          if (!user) {
            await mku.create({id:userId, addedMods: false});
            return m.reply("Benutzer ist kein *Mod* !");
            /*Miku.sendMessage( 
              m.from, 
              { text: `@${mentionedUser.split("@")[0]} has been removed from *Mods* Successfully !`, mentions: [mentionedUser] }, 
              { quoted: m } 
            );*/
          }
          else if (user.addedMods=="false" && !ownerlist.includes(`${mentionedUser.split("@")[0]}`)) {
            return Miku.sendMessage(
              m.from,
              {
                text: `@${mentionedUser.split("@")[0]} ist kein *Mod* !`,
                mentions: [mentionedUser],
              },
              { quoted: m }
            );
          }
          else if (ownerlist.includes(`${mentionedUser.split("@")[0]}`)) {
            return Miku.sendMessage(
              m.from,
              {
                text: `@${mentionedUser.split("@")[0]
                  } ist ein *Eigentümer* und kann nicht aus dem Mod entfernt werden !`,
                mentions: [mentionedUser],
              },
              { quoted: m }
            );
          } else {
            await mku.findOneAndUpdate({ id: userId }, { addedMods: false }, { new: true }).then((user) => {

              Miku.sendMessage(
                m.from,
                {
                  text: `@${mentionedUser.split("@")[0]
                    } wurde erfolgreich aus *Mods* entfernt !`,
                  mentions: [mentionedUser],
                },
                { quoted: m }
              );
            })
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  },
};

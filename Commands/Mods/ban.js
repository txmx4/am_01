const mongoose = require("mongoose");
require("../../config.js");
require("../../Core.js");
const { mku } = require("../../Database/dataschema.js");



module.exports = { 

    name: "ban", 
    alias: ["banuser"], 
    desc: "Sperre ein Mitglied", 
    category: "core", 
    usage: "ban @user", 
    react: "🎀", 
    start: async ( 
      Miku, 
      m, 
      { text, prefix, isBotAdmin, isAdmin, mentionByTag, metadata, pushName, isCreator,args,modStatus} 
    ) => { 
      
      
      if (modStatus=="false"&&!isCreator)  return Miku.sendMessage(m.from, { text: 'Tut mir leid, nur meine *Devs* und *Mods* können diesen Befehl verwenden !' }, { quoted: m });
        
      //var TaggedUser = mentionByTag[0];

      if (!text && !m.quoted) {
        return Miku.sendMessage( 
          m.from, 
          { text: `Bitte markieren Sie einen Benutzer mit *Ban*!` }, 
          { quoted: m } 
        )}
       
        if(m.quoted){
          var mentionedUser = m.quoted.sender;
        }
        else{
          var mentionedUser = mentionByTag[0];
        }
      //var mentionedUser = mentionByTag; 
     let GroupName = metadata.subject
let banreason = args.join(" ")

if (m.quoted && !args.join(" ")) {
  banreason = "Kein Grund angegeben";
}

if (m.quoted && args.join(" ")) {
  banreason = text;
}

if(banreason.includes("@")){
  banreason = args.join(" ")
}


if(banreason == undefined){
  banreason = "Kein Grund angegeben";
}
//if (!banreason) return Miku.sendMessage(m.from, { text: `Please provide the reason for ban.\n\n${prefix}ban spamming` }, { quoted: m });
      var ownerlist = global.owner;

      let userId = (await mentionedUser) || m.msg.contextInfo.participant; 
      try { 
         mku.findOne({id:userId}).then(async (user) => {
            if (!user) {
              if (modStatus == "true" || ownerlist.includes(`${mentionedUser.split("@")[0]}`)) return Miku.sendMessage(m.from, { text: `@${mentionedUser.split("@")[0]} ist ein *Mod* und kann nicht gebannt werden !` , mentions: [mentionedUser]  }, { quoted: m });
              await mku.create({id:userId, ban: true, reason: banreason, gcname: GroupName });
              return Miku.sendMessage( 
                m.from, 
                { text: `@${mentionedUser.split("@")[0]} has been *Banned* Successfully by *${pushName}*\n\n *Reason*: ${banreason}`, mentions: [mentionedUser] }, 
                { quoted: m } 
              );
            }else{
              if (modStatus == "true" || ownerlist.includes(`${mentionedUser.split("@")[0]}`)) return Miku.sendMessage(m.from, { text: `@${mentionedUser.split("@")[0]} ist ein *Mod* und kann nicht gebannt werden !` , mentions: [mentionedUser]  }, { quoted: m });
                if (user.ban == "true") return Miku.sendMessage(m.from, { text: `@${mentionedUser.split("@")[0]} ist bereits *Gesperrt* !` , mentions: [mentionedUser]  }, { quoted: m });
                await mku.findOneAndUpdate({ id: userId }, { $set: { ban: true, reason: banreason, gcname: GroupName } }, { new: true });
                return Miku.sendMessage( 
                  m.from, 
                  { text: `@${mentionedUser.split("@")[0]} wurde erfolgreich *gesperrt* von *${pushName}*\n\n *Grund*: ${banreason}` , mentions: [mentionedUser]}, 
                  { quoted: m } 
                );
            }
         }).catch(error => {
           console.log(error)
           return Miku.sendMessage(m.from, { text: `Beim Sperren des Benutzers ist ein interner Fehler aufgetreten.` }, { quoted: m });
         });
      } catch (err) { 
        console.log(err);
        return Miku.sendMessage(m.from, { text: `Beim Sperren des Benutzers ist ein interner Fehler aufgetreten.` }, { quoted: m });
      } 
    }, 
  };

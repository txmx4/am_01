const { mku } = require("../../Database/dataschema.js");

module.exports = { 

    name: "addmod", 
    alias: ["makemod"], 
    desc: "Um einen Benutzer-Mod zu geben", 
    category: "Mods", 
    usage: "addmod @user", 
    react: "🎀", 
    start: async ( 
      Miku, 
      m, 
      { text, prefix, mentionByTag, pushName, isCreator,owner,modStatus} 
    ) => { 


      if (modStatus=="false"&&!isCreator)  return Miku.sendMessage(m.from, { text: 'Entschuldigung, nur mein *Owner* und *Mods* können diesen Befehl verwenden!' }, { quoted: m });
      //var TaggedUser = mentionByTag[0];

      if (!text && !m.quoted) {
        return Miku.sendMessage( 
          m.from, 
          { text: `Bitte markiere einen Benutzer, um *Mod* zu geben!` }, 
          { quoted: m } 
        )}
        else if(m.quoted){
          var mentionedUser = m.quoted.sender;
        }
        else{
          var mentionedUser = mentionByTag[0];
        }
      //var mentionedUser = mentionByTag; 
      let userId = (await mentionedUser) || m.msg.contextInfo.participant; 
      try { 
        var ownerlist = global.owner;
         mku.findOne({id:userId}).then(async (user) => {
          //if(!user.addedMods) await mku.create({id:userId, addedMods: false});
          if (!user) {
            await mku.create({id:userId, addedMods: true});
            return Miku.sendMessage( 
              m.from, 
              { text: `@${mentionedUser.split("@")[0]} wurde erfolgreich zu *Mods* hinzugefügt !`, mentions: [mentionedUser] }, 
              { quoted: m } 
            );
          }
          else if (user.addedMods === null || ownerlist.includes(`${mentionedUser.split("@")[0]}`)) {
              await mku.findOneAndUpdate({ id: userId }, { addedMods: true }, { new: true });
              return Miku.sendMessage( 
                m.from, 
                { text: `@${mentionedUser.split("@")[0]} wurde erfolgreich zu *Mods* hinzugefügt !` , mentions: [mentionedUser]}, 
                { quoted: m } 
              );
          }
          else if (user.addedMods === true) {
              return Miku.sendMessage(m.from, { text: `@${mentionedUser.split("@")[0]} ist bereits ein *Mod* !` , mentions: [mentionedUser]  }, { quoted: m });
          }
          else {
            if (user.addedMods == "true" || ownerlist.includes(`${mentionedUser.split("@")[0]}`)) return Miku.sendMessage(m.from, { text: `@${mentionedUser.split("@")[0]} is already a *Mod* !` , mentions: [mentionedUser]  }, { quoted: m });

            if (!user && !ownerlist.includes(`${mentionedUser.split("@")[0]}`)) {
              await mku.create({id:userId, addedMods: true});
              return Miku.sendMessage( 
                m.from, 
                { text: `@${mentionedUser.split("@")[0]} wurde erfolgreich zu *Mods* hinzugefügt !`, mentions: [mentionedUser] }, 
                { quoted: m } 
              );
            }else{
                await mku.findOneAndUpdate({ id: userId }, { addedMods: true }, { new: true });
                return Miku.sendMessage( 
                  m.from, 
                  { text: `@${mentionedUser.split("@")[0]} wurde erfolgreich zu *Mods* hinzugefügt !` , mentions: [mentionedUser]}, 
                  { quoted: m } 
                );
            }
          }
          
         }).catch(error => {
           console.log(error)
           return Miku.sendMessage(m.from, { text: `Beim Hinzufügen des Benutzers ist ein interner Fehler aufgetreten.` }, { quoted: m });
         });
      } catch (err) { 
        console.log(err);
        return Miku.sendMessage(m.from, { text: `Beim Hinzufügen des Benutzers ist ein interner Fehler aufgetreten.` }, { quoted: m });
      } 
    }, 
  };

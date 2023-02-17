module.exports = {
  name: "promote",
  alias: ["prom"],
  desc: "Fördern Sie ein Mitglied",
  category: "Group",
  usage: "promote @user",
  react: "🍁",
  start: async (
    Miku,
    m,
    { text, prefix, isBotAdmin, isAdmin, mentionByTag, pushName,groupAdmin }
  ) => {
    if (!isAdmin) {
      return Miku.sendMessage(
        m.from,
        { text: `${mess.useradmin}` },
        { quoted: m }
      );
    }
  //
    if (!text && !m.quoted) {
      return Miku.sendMessage(
        m.from,
        { text: `Bitte markieren Sie einen Benutzer zum *Promote*!` },
        { quoted: m }
      );
    } else if (m.quoted) {
      var mentionedUser = m.quoted.sender;
    } else {
      var mentionedUser = mentionByTag[0];
    }

    let userId = (await mentionedUser) || m.msg.contextInfo.participant;
    if(groupAdmin.includes(userId)){
      return Miku.sendMessage(
        m.from,
        { text: `@${
          mentionedUser.split("@")[0]
        } Senpai ist bereits *Admin* !`,mentions: [mentionedUser], },
        { quoted: m }
      );
    }

    try {
      await Miku.groupParticipantsUpdate(m.from, [userId], "promote").then(
        (res) =>
          Miku.sendMessage(
            m.from,
            {
              text: `Congratulations @${
                mentionedUser.split("@")[0]
              } Senpai  🥳, du wurdest erfolgreich *befördert* !`,
              mentions: [mentionedUser],
            },
            { quoted: m }
          )
      );
    } catch (error) {
       Miku.sendMessage(
        m.from,
        { text: `${mess.botadmin}` },
        { quoted: m }
      ); 
    }
    
  },
};

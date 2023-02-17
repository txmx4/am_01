require("../../config.js");
require("../../Core.js");

module.exports = {
  name: "grouplink",
  alias: ["gclink"],
  desc: "Um den Gruppenlink zu erhalten.",
  category: "Group",
  usage: "gclink",
  react: "🍁",
  start: async (
    Miku,
    m,
    { prefix, isBotAdmin, isAdmin, metadata,mime }
  ) => {
    if (!isAdmin)
      return Miku.sendMessage(m.from, { text: mess.useradmin }, { quoted: m });

    var link = await Miku.groupInviteCode(m.from);
    var linkcode = `https://chat.whatsapp.com/${link}`;

    try {
      ppgc = await Miku.profilePictureUrl(m.from, "image");
    } catch {
      ppgc = botImage1;
    }

    try {
      await Miku.sendMessage(
        m.from,
        {
          image: { url: ppgc, mimetype: "image/jpeg" },
          caption: `\n_🎀 Gruppen Name:_ *${metadata.subject}*\n\n_🔷 Gruppen Link:_\n${linkcode}\n`,
        },
        { quoted: m }
      );
    } catch (err) {
      Miku.sendMessage(m.from, { text: `${mess.botadmin}` }, { quoted: m });
    }
  },
};

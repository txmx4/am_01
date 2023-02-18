const axios = require("axios");

module.exports = {
  name: "foxgirl",
  alias: ["foxwaifu","awoo"],
  desc: "Um ein zufälliges Fox-Girl-Bild zu erhalten",
  category: "Weeb",
  usage: `foxgirl`,
  react: "🍁",
  start: async (Miku, m, { prefix }) => {
    var foxgirl = await axios.get(`https://nekos.life/api/v2/img/fox_girl`)
    var fgbutton = [
      {
        buttonId: `${prefix}awoo`,
        buttonText: { displayText: `Weiter...` },
        type: 1,
      },
    ];
    let bmffg = {
      image: { url: foxgirl.data.url},
      caption: `Awooo...\n`,
      footer: `*${botName}*`,
      buttons: fgbutton,
      headerType: 4,
    };
    await Miku.sendMessage(m.from, bmffg, { quoted: m }).catch((err) => {
      return "Fehler!";
    });
  },
};

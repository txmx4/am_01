module.exports = {
  name: "charlist",
  alias: ["characterlist", "botcharacterlist"],
  desc: "Um den Charakter zu wechseln",
  category: "Mods",
  usage: "setchar 0/1/2/3/4/5/6/7",
  react: "🎀",
  start: async (Miku, m, { text, prefix ,modStatus}) => {
    let txt = `       『  *Liste der Bot-Charaktere*  』\n\n\n_0 - Atlas MD_\n\n_1 - Power MD_\n\n_2 - Makima MD_\n\n_3 - Denji MD_\n\n_4 - Zero Two_\n\n_5 - Chika MD_\n\n_6 - Miku MD_\n\n_7 - Marin Kitagawa_\n\n\nBeispiel: *${prefix}setchar 0*\n`;

    let botLogos = [
      "https://wallpapercave.com/wp/wp5924545.jpg",
      "https://wallpapercave.com/wp/wp11253614.jpg",
      "https://images5.alphacoders.com/126/1264439.jpg",
      "https://i0.wp.com/metagalaxia.com.br/wp-content/uploads/2022/11/Chainsaw-Man-Denji-e-Power.webp?resize=1068%2C601&ssl=1",
      "https://images3.alphacoders.com/949/949253.jpg",
      "https://images4.alphacoders.com/100/1002134.png",
      "https://wallpapercave.com/wp/wp10524580.jpg",
      "https://images2.alphacoders.com/125/1257915.jpg",
    ];

    let randomimage = botLogos[Math.floor(Math.random() * botLogos.length)];
   
    let sections = [] 
    let chars = [`Atlas MD`, `Power MD`, `Makima MD`, `Denji MD`, `Zero Two`, `Chika MD`, `Miku MD`, `Marin Kitagawa`]
    let buttonDesc =[`Stellen Sie den Bot-Charakter auf  Atlas MD`, `Stellen Sie den Bot-Charakter auf Power MD`, `Stellen Sie den Bot-Charakter auf Makima MD`, `Stellen Sie den Bot-Charakter auf Denji MD`, `Stellen Sie den Bot-Charakter auf Zero Two`, `Stellen Sie den Bot-Charakter auf Chika MD`, `Stellen Sie den Bot-Charakter auf Miku MD`, `Stellen Sie den Bot-Charakter auf Marin Kitagawa`]
    let buttonTexts = ['-setchar 0', '-setchar 1', '-setchar 2', '-setchar 3', '-setchar 4', '-setchar 5', '-setchar 6', '-setchar 7']
    
    for (let i = 0; i < chars.length; i++) {
        const list = {title: `${prefix}setchar ${i}`,
        rows: [
        
                {
                 title: `${chars[i]}`, 
                 rowId: `${buttonTexts[i]}`,
                 description: `${buttonDesc[i]}`
                }
                ]
             }
                sections.push(list)
            }


    let buttonMessage = {
      //image: { url: randomimage },
      text: txt,
      footer: `*${botName}*`,
      buttonText: "Wähle einen Charakter",
      sections,
    };

    Miku.sendMessage(m.from, buttonMessage, { quoted: m });
  },
};

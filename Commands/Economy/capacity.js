const mongoose = require("mongoose");
require("../../config.js");
require("../../Core.js");
const { mku, mk } = require("../../Database/dataschema.js");
const fs = require("fs");



 module.exports = { 

    name: "capacity",  
    desc: "Aktualisierungskapazität.", 
    alias: ["capacity"],
    category: "Economy",  
    react: "📊", 
    start: async ( 
        Miku, 
        m, 
        { text, prefix, isBotAdmin, isAdmin, mentionByTag, pushName, isCreator,eco,ty} 
    ) => {
        if (!text) {
            return Miku.sendMessage(m.from, { text: `『  *Bank 💴 Kapazität*  』\n\n1 | *1000 sp* = 100 💎\n\n2 | *100000 sp* = 1000 💎\n\n3 | *10000000 sp* = 10000000 💎\n\nBeispiel: *${prefix}capacity 1* OR *${prefix}bankupgrade 1000*` }, { quoted: m });
        }
        const pushname = m.pushName //|| 'NO name'
        const cara = "cara"
        let user = m.sender
        let value = text.trim();
        let k = parseInt(value)
        const balance  = await eco.balance(user, cara)
        switch (value) {
            case '1000':
            case '1':
             if (k > balance.wallet ) return m.reply('*Du musst bezahlen 100 💎 Bankkapazität zu erhöhen ~ 1000 sp*');
              const deduct1 = await eco.deduct(user, cara, 100);
              const add1 = eco.giveCapacity(user, cara, 1000); 
                return await Miku.sendMessage(m.from, { text: `*1000 💎 Speicher wurde hinzugefügt ${pushname} bank*` }, { quoted: m });
            break
           case '10000':
            case '2':
            if (k > balance.wallet ) return m.reply(`*Du musst bezahlen 💎 Bankkapazität zu erhöhen ~ 10000 sp*`);
              const deduct2 = await eco.deduct(user, cara, 1000);
              const add2 = eco.giveCapacity(user, cara, 10000); 
                  await Miku.sendMessage(m.from, { text: `*10000 💎 Speicher wurde hinzugefügt ${pushname} bank*` }, { quoted: m });
            break
           case '100000':
            case '3':
            if (k > balance.wallet ) return m.reply(`*Du musst bezahlen 10000 💎 Bankkapazität zu erhöhen ~ 100000 sp*`)
              const deduct3 = await eco.deduct(user, cara, 10000);
              const add3 = eco.giveCapacity(user, cara, 100000); 
                  await Miku.sendMessage(m.from, { text: `*100000 💎 Speicher wurde hinzugefügt ${pushname} bank*` }, { quoted: m });
             break
            }
              }
            }

          

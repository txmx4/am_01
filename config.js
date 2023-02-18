/* ---------------------------------------------------------------------------------/
/                                                                                   /
/             d8888 888    888                        888b     d888 8888888b.       /
/            d88888 888    888                        8888b   d8888 888  "Y88b      /
/           d88P888 888    888                        88888b.d88888 888    888      /
/          d88P 888 888888 888  8888b.  .d8888b       888Y88888P888 888    888      /
/         d88P  888 888    888     "88b 88K           888 Y888P 888 888    888      /
/        d88P   888 888    888 .d888888 "Y8888b.      888  Y8P  888 888    888      /
/       d8888888888 Y88b.  888 888  888      X88      888   "   888 888  .d88P      /
/      d88P     888  "Y888 888 "Y888888  88888P'      888       888 8888888P"       /
/                                                                                   / 
/-----------------------------------------------------------------------------------/
/ Author and Main Developer: FantoX                                                 /
/ Github: https://github.com/FantoX001/Atlas-MD                                     /
/ Powered By: Team ATLAS                                                            /
/-----------------------------------------------------------------------------------/
/             Meet Team ATLAS who holds all rights to this repository:              /
/                                                                                   /
/ 1. Pratyush - https://github.com/pratyush4932                                     /
/ 2. Ahmii - https://github.com/Ahmii-kun                                          /               
/ 3. Kai - https://github.com/Kai0071                                               /                    
/ 4. Devime - https://github.com/Devime69                                           /
/ 5. Jay JayOps - https://github.com/jayjay-ops                                     /
/                                                                                   /
/ ----------------------------------------------------------------------------------/
/                                                                                   /
/      With all of our hard work and defication you can enjoy this awesome bot!     /  
/                                                                                   / 
/----------------------------------------------------------------------------------*/

const fs = require("fs");
const { mkchar } = require("./Database/dataschema.js");
require("./BotCharacters.js");

require("dotenv").config();
let gg = process.env.MODS;
if (!gg) {
  gg = "4915212908434";   // You can Change this number //
}

// -------------------------------------------------------------- //


global.owner = gg.split(",");
global.mongodb = process.env.MONGODB || "NONE";
global.sessionId = process.env.SESSION_ID || "ok";
global.prefa = process.env.PREFIX || "-";
global.tenorApiKey =
  process.env.TENOR_API_KEY || "AIzaSyCyouca1_KKy4W_MG1xsPzuku5oa8W358c";
global.packname = process.env.PACKNAME || `✨️MAGIC✨️`;
global.author = process.env.AUTHOR || "Für:✨️MAGIC✨️";
global.port = process.env.PORT || "8000";



// ---------------------Do Not Modify this part------------------- //

global.mess = {
  jobdone: "Job erledigt...",
  useradmin: "Entschuldigung, nur *Gruppenadministratoren* können diesen Befehl verwenden *Baka*!",
  botadmin:
    "Tut mir leid, ich kann diesen Befehl nicht ausführen, ohne ein *Admin* dieser Gruppe zu sein.",
  botowner: "Nur mein *Eigentümer* kann diesen Befehl verwenden, Baka!",
  grouponly: "Dieser Befehl gilt nur für *Gruppen*, Baka!",
  privateonly: "Dieser Befehl ist nur für *Private Chat*,gedacht Baka!",
  botonly: "Nur der *Bot selbst* kann diesen Befehl verwenden *Meister*!",
  waiting: "warten Sie eine Minute...",
  nolink: "Bitte gib mir *link*, Baka!",
  error: "Ein Fehler ist aufgetreten!",
  banned: `Sie sind für die Verwendung von Befehlen *gesperrt*!  \n\nGib *${prefa}owner* um einen Antrag auf Entbannung einzureichen !`,
  bangc: "Diese Gruppe ist von der Verwendung von Befehlen *gesperrt*!",
  nonsfw: "Sei kein perverser Baka! Dies ist keine NSFW-aktivierte Gruppe!",
};

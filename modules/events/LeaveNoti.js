module.exports.config = {
	name: "leaveNoti",
	eventType: ["log:unsubscribe"],
	version: "1.0.0",
	credits: "HĐGN",//mod lại by Tòn
	description: "Thông báo bot hoặc người rời khỏi nhóm có random gif/ảnh/video",
	dependencies: {
		"fs-extra": "",
		"path": ""
	}
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

	const path = join(__dirname, "cache", "leaveGif");
	if (existsSync(path)) mkdirSync(path, { recursive: true });	

	const path2 = join(__dirname, "cache", "leaveGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}

module.exports.run = async function({ api, event, Users, Threads }) {
	if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
	const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
	const { join } =  global.nodemodule["path"];
	const { threadID } = event;
  const moment = require("moment-timezone");
  const hours = moment.tz("Asia/Ho_Chi_Minh").format("HH");
  const time = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:s");
	const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
  const iduser = event.logMessageData.leftParticipantFbId;
	const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
	const type = (event.author == event.logMessageData.leftParticipantFbId) ? "𝘁𝘂̛̣ 𝘆́ 𝗿𝗼̛̀𝗶 𝗸𝗵𝗼̉𝗶 𝗻𝗵𝗼́𝗺" : "𝗯𝗶̣ 𝗾𝘂𝗮̉𝗻 𝘁𝗿𝗶̣ 𝘃𝗶𝗲̂𝗻 𝗸𝗶𝗰𝗸 𝗸𝗵𝗼̉𝗶 𝗻𝗵𝗼́𝗺";
	const path = join(__dirname, "cache", "leaveGif");
	const gifPath = join(path, `${threadID}.mp4`);
	var msg, formPush

	if (existsSync(path)) mkdirSync(path, { recursive: true });

	(typeof data.customLeave == "undefined") ? msg ="=== [ 𝗧𝗵𝗮̀𝗻𝗵 𝗩𝗶𝗲̂𝗻 𝗢𝘂𝘁 𝗡𝗵𝗼́𝗺 ] ===\n━━━━━━━━━━━━━━━━━━\n\n→ [💓] 𝗩𝗮̀𝗼 𝗯𝘂𝗼̂̉𝗶 {session}\n→ [🧸] {name} đ𝗮̃ {type}\n→ [🌐] 𝗨𝗿𝗹 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗼𝘂𝘁: https://www.facebook.com/profile.php?id={iduser}\n→ [🥀] 𝗧𝗮̣𝗺 𝗯𝗶𝗲̣̂𝘁: {name}\n→ [🌟] 𝗨𝗿𝗹 𝗠𝗲𝘀𝘀𝗲𝗻𝗴𝗲𝗿 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗼𝘂𝘁: m.me/{iduser}\n━━━━━━━━━━━━━━━━━━\n→ [🌷] 𝗫𝗶𝗻 𝗖𝗵𝗮̀𝗼 𝗩𝗮̀ 𝗞𝗵𝗼̂𝗻𝗴 𝗛𝗲̣𝗻 𝗚𝗮̣̆𝗽 𝗟𝗮̣𝗶 𝗕𝗮̣𝗻...\n→ [💕]  𝗖𝗵𝘂́𝗰 𝗕𝗯𝗶 𝗦𝗼̛́𝗺 𝗧𝗶̀𝗺 Đ𝘂̛𝗼̛̣𝗰 𝗠𝗼̣̂𝘁 𝗚𝗿 𝗣𝗵𝘂̀ 𝗛𝗼̛̣𝗽 𝗛𝗼̛𝗻\n━━━━━━━━━━━━━━━━━\n→ [⏰️] 𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻 𝗼𝘂𝘁 𝗻𝗵𝗼́𝗺: " + time : msg = data.customLeave;
	msg = msg.replace(/\{name}/g, name).replace(/\{type}/g, type)
  .replace(/\{iduser}/g, iduser).replace(/\{session}/g, hours <= 10 ? "𝘀𝗮́𝗻𝗴" : 
    hours > 10 && hours <= 12 ? "𝘁𝗿𝘂̛𝗮" :
    hours > 12 && hours <= 18 ? "𝗰𝗵𝗶𝗲̂̀𝘂" : "𝘁𝗼̂́𝗶");

	const randomPath = readdirSync(join(__dirname, "cache", "leaveGif", "randomgif"));
  
	if (existsSync(gifPath)) formPush = { body: msg, attachment: createReadStream(gifPath) }
	else if (randomPath.length != 0) {
		const pathRandom = join(__dirname, "cache", "leaveGif", "randomgif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
		formPush = { body: msg, attachment: createReadStream(pathRandom) }
	}
	else formPush = { body: msg }
	
	return api.sendMessage(formPush, threadID);
                       }

module.exports.config = {
	name: "joinNoti",
	eventType: ["log:subscribe"],
	version: "1.0.1",
	credits: "HĐGN",//Update by ThanhAli
	description: "Thông báo Bot hoặc người dùng vào nhóm có random gif/ảnh/video",
	dependencies: {
		"fs-extra": "",
		"path": "",
		"pidusage": ""
	}
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

	const path = join(__dirname, "cache", "joinGif");
	if (existsSync(path)) mkdirSync(path, { recursive: true });	

	const path2 = join(__dirname, "cache", "joinGif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}


module.exports.run = async function({ api, event, Users }) {
	const { join } = global.nodemodule["path"];
	const { threadID } = event;
	if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
		api.changeNickname(`『 ${global.config.PREFIX} 』• ${(!global.config.BOTNAME) ? "𝐁𝐎𝐓 𝐃𝐚𝐰𝐧 𝐋𝐨𝐯𝐞𝐫 🕊" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
		const fs = require("fs");
		return api.sendMessage("", event.threadID, () => api.sendMessage({body:`► 𝗞𝗘̂́𝗧 𝗡𝗢̂́𝗜 𝗧𝗛𝗔̀𝗡𝗛 𝗖𝗢̂𝗡𝗚 ◄\n━━━━━━━━━━━━━━━━━━\n→ [🐧] 𝗛𝗶 𝗠𝗼̣𝗶 𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗠𝗶̀𝗻𝗵 𝗟𝗮̀ 𝗕𝗼𝘁 𝗖𝘂̉𝗮 Luzan đẹp trai\n→ [🎀] 𝗩𝘂𝗶 𝗟𝗼̀𝗻𝗴 𝗞𝗵𝗼̂𝗻𝗴 𝗦𝗽𝗮𝗺 , 𝗖𝗵𝘂̛̉𝗶 𝗕𝗼𝘁\n→ [🎊] 𝗦𝘂̛̉ 𝗗𝘂̣𝗻𝗴 .𝗵𝗲𝗹𝗽 , .𝗺𝗲𝗻𝘂 Đ𝗲̂̉ 𝗫𝗲𝗺 𝗖𝗵𝗶 𝗧𝗶𝗲̂́𝘁 𝗟𝗲̣̂𝗻𝗵 𝗖𝗼́ 𝗧𝗿𝗼𝗻𝗴 𝗕𝗼𝘁\n→ [🌸] 𝙑𝙪𝙞 𝙇𝙤̀𝙣𝙜 𝙇𝙞𝙚̂𝙣 𝙃𝙚̣̂ 𝘼𝙙𝙢𝙞𝙣 Đ𝗲̂̉ Đ𝘂̛𝗼̛̣𝗰 𝗔𝗱𝗺𝗶𝗻 𝗗𝘂𝘆𝗲̣̂𝘁\n→ [💓] 𝗖𝗵𝘂́𝗰 𝗖𝗮́𝗰 𝗕𝗮̣𝗻 𝗦𝗮̀𝗶 𝗕𝗼𝘁 𝗩𝘂𝗶 𝗩𝗲̉\n━━━━━━━━━━━━━━━━━━\n→ [🌐] 𝗡𝗲̂́𝘂 𝗠𝘂𝗼̂́𝗻 𝐓𝐡𝐮𝗲̂ 𝗖𝗵𝗼 𝗖𝗮́𝗰 𝗕𝗼𝘅 𝗞𝗵𝗮́𝗰 𝗧𝗵𝗶̀ 𝗟𝗶𝗲̂𝗻 𝗛𝗲̣̂ 𝗖𝗵𝗼 𝗔𝗱𝗺𝗶𝗻 𝗕𝗼𝘁https://www.facebook.com/share/19bdohTpPk/━━━━━━━━━━━━━━━━━━\n→ 𝗧𝗵𝗮𝗻𝗸𝘀 𝗳𝗼𝗿 𝘂𝘀𝗶𝗻𝗴 𝗟𝘂𝘇𝗮𝗻 𝗯𝗼𝘁`, attachment: fs.createReadStream(__dirname + "/cache/joinMp4/hello.mp4")} ,threadID));
	}
	else {
		try {
			const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
			let { threadName, participantIDs } = await api.getThreadInfo(threadID);
      const moment = require("moment-timezone");
      const hours = moment.tz("Asia/Ho_Chi_Minh").format("HH");
      const time = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
			const threadData = global.data.threadData.get(parseInt(threadID)) || {};
			const path = join(__dirname, "cache", "joinGif");
			const pathGif = join(path, `${threadID}.gif`);

			var mentions = [], nameArray = [], memLength = [], iduser = [], i = 0;
			
			for (id in event.logMessageData.addedParticipants) {
		const userName = event.logMessageData.addedParticipants[id].fullName;    iduser.push(event.logMessageData.addedParticipants[id].userFbId.toString());
				nameArray.push(userName);
				mentions.push({ tag: userName, id: event.senderID });
				memLength.push(participantIDs.length - i++);
        console.log(userName)
			}
			memLength.sort((a, b) => a - b);		
		(typeof threadData.customJoin == "undefined") ? msg = "=== [ 𝗧𝗵𝗲̂𝗺 𝗧𝘃𝗺 𝗧𝗵𝗮̀𝗻𝗵 𝗖𝗼̂𝗻𝗴 ] ===\n━━━━━━━━━━━━━━━━━━━━━\n→ [💓] 𝗖𝗵𝗮̀𝗼 𝗺𝘂̛̀𝗻𝗴 {name} 𝘁𝗼̛́𝗶 𝘃𝗼̛́𝗶 𝗻𝗵𝗼́𝗺 {threadName}\n→ [🌐] 𝗨𝗿𝗹 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝘃𝗮̀𝗼: https://www.facebook.com/profile.php?id={iduser}\n→ [🌟] 𝗨𝗿𝗹 𝗠𝗲𝘀𝘀𝗲𝗻𝗴𝗲𝗿 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝘃𝗮̀𝗼: https://www.facebook.com/profile.php?id={iduser}\n→ [🧸] {type} 𝗹𝗮̀ 𝘁𝗵𝗮̀𝗻𝗵 𝘃𝗶𝗲̂𝗻 𝘁𝗵𝘂̛́ {soThanhVien} 𝗰𝘂̉𝗮 𝗻𝗵𝗼́𝗺\n→ [🥀] Đ𝘂̛𝗼̛̣𝗰 𝘁𝗵𝗲̂𝗺 𝘃𝗮̀𝗼 𝗻𝗵𝗼́𝗺 𝗯𝗼̛̉𝗶: {author}\n→ [🚬] 𝗨𝗿𝗹 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝘁𝗵𝗲̂𝗺: https://www.facebook.com/profile.php?id={id}\n→ [👑] 𝗨𝗿𝗹 𝗠𝗲𝘀𝘀𝗲𝗻𝗴𝗲𝗿 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝘁𝗵𝗲̂𝗺: m.me/{id}\n━━━━━━━━━━━━━━━━━━━━━\n→ [🌷] 𝗡𝗵𝗼̛́ 𝘁𝘂̛𝗼̛𝗻𝗴 𝘁𝗮́𝗰 đ𝗮̂̀𝘆 đ𝘂̉ 𝗻𝗵𝗮́ 𝗯𝗯𝗶 𝘁𝗵𝘂̛́ {soThanhVien} 𝗰𝘂̉𝗮 𝗯𝗼𝘁\n→ [❄️] 𝗖𝗵𝘂́𝗰 𝗯𝗯𝗶 𝟭 𝗻𝗴𝗮̀𝘆 𝘁𝗵𝗮̣̂𝘁 𝘃𝘂𝗶 𝘃𝗲̉ , 𝗻𝗵𝗼̛́ 𝗸𝗶𝗲̂́𝗺 𝗻𝗶 đ𝗶 𝘀𝗮̆́𝗽 𝘁𝗲̂́𝘁 𝗿𝗼̂̀𝗶 đ𝗼́\n→ [⏰️] 𝗧𝗵𝗼̛̀𝗶 𝗚𝗶𝗮𝗻 𝗩𝗮̀𝗼 𝗡𝗵𝗼́𝗺: [ {time} ]": msg = threadData.customJoin;
      var getData = await Users.getData(event.author)
var nameAuthor = typeof getData.name == "undefined" ? "Người dùng tự vào" : getData.name
			msg = msg
      .replace(/\{iduser}/g, iduser.join(', '))
			.replace(/\{name}/g, nameArray.join(', '))
			.replace(/\{type}/g, (memLength.length > 1) ?  '𝗖𝗮́𝗰 𝗯𝗮̣𝗻 𝗹𝗮̀' : '𝗕𝗮̣𝗻 𝗹𝗮̀')
			.replace(/\{soThanhVien}/g, memLength.join(', '))
			.replace(/\{threadName}/g, threadName)
      .replace(/\{author}/g, nameAuthor)
      .replace(/\{time}/g, time)
      .replace(/\{id}/g,event.author);

			if (existsSync(path)) mkdirSync(path, { recursive: true });

			const randomPath = readdirSync(join(__dirname, "cache", "joinGif", "randomgif"));

			if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
			else if (randomPath.length != 0) {
				const pathRandom = join(__dirname, "cache", "joinGif", "randomgif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
				formPush = { body: msg, attachment: createReadStream(pathRandom), mentions }
			}
			else formPush = { body: msg, mentions }

			return api.sendMessage(formPush, threadID);
		} catch (e) { return console.log(e) };
	}
                                                    }

module.exports.config = {
	name: "menu",
	version: "1.1.1",
	hasPermssion: 0,
	credits: "DC-Nam mod by Vtuan & DongDev fix",
	description: "Xem danh sĂ¡ch nhĂ³m lá»‡nh, thĂ´ng tin lá»‡nh",
	commandCategory: "NhĂ³m",
	usages: "[...name commands|all]",
	cooldowns: 5,
	usePrefix: false,
	images: [],
	envConfig: {
		autoUnsend: {
			status: true,
			timeOut: 60,
		},
	},
};

const { autoUnsend = this.config.envConfig.autoUnsend } =
	global.config == undefined
		? {}
		: global.config.menu == undefined
			? {}
			: global.config.menu;
const { compareTwoStrings, findBestMatch } = require("string-similarity");
const { readFileSync, writeFileSync, existsSync } = require("fs-extra");

module.exports.run = async function ({ api, event, args }) {
	const moment = require("moment-timezone");
	const { sendMessage: send, unsendMessage: un } = api;
	const { threadID: tid, messageID: mid, senderID: sid } = event;
	const cmds = global.client.commands;

	const time = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || DD/MM/YYYY");

	if (args.length >= 1) {
		if (typeof cmds.get(args.join(" ")) == "object") {
			const body = infoCmds(cmds.get(args.join(" ")).config);
			return send(body, tid, mid);
		} else {
			if (args[0] == "all") {
				const data = cmds.values();
				var txt = "[ đ™ˆđ™đ™£đ™ª đ˜½đ™¤đ™©đŸ’¢]\nâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€\n",
					count = 0;
				for (const cmd of data)
					txt += `|â€º ${++count}. ${cmd.config.name} | ${cmd.config.description}\n`;
				txt += `â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€\n|â€º â³ Tá»± Ä‘á»™ng gá»¡ tin nháº¯n sau: ${autoUnsend.timeOut}s`;
				return send(
					{
						body: txt,
						attachment:
							global.ytb_rst2.length > 0
								? global.ytb_rst2.splice(0, 1)
								: undefined,
					},
					tid,
					(a, b) =>
						autoUnsend.status
							? setTimeout(
									(v1) => un(v1),
									1000 * autoUnsend.timeOut,
									b.messageID,
								)
							: "",
				);
			} else {
				const cmdsValue = cmds.values();
				const arrayCmds = [];
				for (const cmd of cmdsValue) arrayCmds.push(cmd.config.name);
				const similarly = findBestMatch(args.join(" "), arrayCmds);
				if (similarly.bestMatch.rating >= 0.3)
					return send(
						` "${args.join(" ")}" lĂ  lá»‡nh gáº§n giá»‘ng lĂ  "${similarly.bestMatch.target}" ?`,
						tid,
						mid,
					);
			}
		}
	} else {
		const data = commandsGroup();
		var txt = "[ đ™ˆđ™đ™£đ™ª đ˜½đ™¤đ™©đŸ’¢]\nâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€\n",
			count = 0;
		for (const { commandCategory, commandsName } of data)
			txt += `|â€º ${++count}. ${commandCategory} || cĂ³ ${commandsName.length} lá»‡nh\n`;
		txt += `â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€\n|â€º đŸ“ Tá»•ng cĂ³: ${global.client.commands.size} lá»‡nh\n|â€º â° Time: ${time}\n|â€º đŸ” Reply tá»« 1 Ä‘áº¿n ${data.length} Ä‘á»ƒ chá»n\n|â€º â³ Tá»± Ä‘á»™ng gá»¡ tin nháº¯n sau: ${autoUnsend.timeOut}s`;
		return send(
			{ body: txt },
			tid,
			(a, b) => {
				global.client.handleReply.push({
					name: this.config.name,
					messageID: b.messageID,
					author: sid,
					case: "infoGr",
					data,
				});
				if (autoUnsend.status)
					setTimeout((v1) => un(v1), 5000 * autoUnsend.timeOut, b.messageID);
			},
			mid,
		);
	}
};

module.exports.handleReply = async function ({ handleReply: $, api, event }) {
	const { sendMessage: send, unsendMessage: un } = api;
	const { threadID: tid, messageID: mid, senderID: sid, args } = event;

	if (sid != $.author) {
		const msg = `â›” CĂºt ra chá»— khĂ¡c`;
		return send(msg, tid, mid);
	}

	switch ($.case) {
		case "infoGr": {
			var data = $.data[+args[0] - 1];
			if (data == undefined) {
				const txt = `â "${args[0]}" khĂ´ng náº±m trong sá»‘ thá»© tá»± menu`;
				const msg = txt;
				return send(msg, tid, mid);
			}

			un($.messageID);
			var txt = `=== [ ${data.commandCategory} ] ===\nâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€\n`,
				count = 0;
			for (const name of data.commandsName) {
				const cmdInfo = global.client.commands.get(name).config;
				txt += `|â€º ${++count}. ${name} | ${cmdInfo.description}\n`;
			}
			txt += `â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€\n|â€º đŸ” Reply tá»« 1 Ä‘áº¿n ${data.commandsName.length} Ä‘á»ƒ chá»n\n|â€º â³ Tá»± Ä‘á»™ng gá»¡ tin nháº¯n sau: ${autoUnsend.timeOut}s\n|â€º đŸ“ DĂ¹ng ${prefix(tid)}help + tĂªn lá»‡nh Ä‘á»ƒ xem chi tiáº¿t cĂ¡ch sá»­ dá»¥ng lá»‡nh`;
			return send({ body: txt }, tid, (a, b) => {
				global.client.handleReply.push({
					name: this.config.name,
					messageID: b.messageID,
					author: sid,
					case: "infoCmds",
					data: data.commandsName,
				});
				if (autoUnsend.status)
					setTimeout((v1) => un(v1), 5000 * autoUnsend.timeOut, b.messageID);
			});
		}
		case "infoCmds": {
			var data = global.client.commands.get($.data[+args[0] - 1]);
			if (typeof data != "object") {
				const txt = `â ï¸ "${args[0]}" khĂ´ng náº±m trong sá»‘ thá»© tá»± menu`;
				const msg = txt;
				return send(msg, tid, mid);
			}

			const { config = {} } = data || {};
			un($.messageID);
			const msg = infoCmds(config);
			return send(msg, tid, mid);
		}
		default:
	}
};

function commandsGroup() {
	const array = [],
		cmds = global.client.commands.values();
	for (const cmd of cmds) {
		const { name, commandCategory } = cmd.config;
		const find = array.find((i) => i.commandCategory == commandCategory);
		!find
			? array.push({ commandCategory, commandsName: [name] })
			: find.commandsName.push(name);
	}
	array.sort(sortCompare("commandsName"));
	return array;
}

function infoCmds(a) {
	return `[ INFO - COMMANDS ]\nâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€\n|â€º đŸ“” TĂªn lá»‡nh: ${a.name}\n|â€º đŸŒ´ PhiĂªn báº£n : ${a.version}\n|â€º đŸ” Quyá»n háº¡n : ${premssionTxt(a.hasPermssion)}\n|â€º đŸ‘¤ TĂ¡c giáº£ : ${a.credits}\n|â€º đŸŒ¾ MĂ´ táº£ : ${a.description}\n|â€º đŸ“ Thuá»™c nhĂ³m : ${a.commandCategory}\n|â€º đŸ“ CĂ¡ch dĂ¹ng : ${a.usages}\n|â€º â³ Thá»i gian chá» : ${a.cooldowns} giĂ¢y\n`;
}

function premssionTxt(a) {
	return a == 0
		? "ThĂ nh ViĂªn"
		: a == 1
			? "Quáº£n Trá»‹ ViĂªn NhĂ³m"
			: a == 2
				? "ADMINBOT"
				: "NgÆ°á»i Äiá»u HĂ nh Bot";
}

function prefix(a) {
	const tidData = global.data.threadData.get(a) || {};
	return tidData.PREFIX || global.config.PREFIX;
}
function sortCompare(k) {
	return function (a, b) {
		return (
			(a[k].length > b[k].length ? 1 : a[k].length < b[k].length ? -1 : 0) * -1
		);
	};
}

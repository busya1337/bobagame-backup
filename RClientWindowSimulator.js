function SetCookie(key, value) {
	document.cookie=`${key}=${JSON.stringify(value)}`;
	console.log(`Saved cookie: ${key}`);
}

function GetCookie(key) {
	console.log(`Get cookie: ${key}`)
	let cookies = document.cookie.split(';');
	for (const cookie of cookies) {
		kv=cookie.split('=');
		if (kv[0]===key)
		return JSON.parse(kv[1]);
	}
	return null
}

function SendEvent(messageType, data) {
	window.postMessage({
		messageType: messageType,
		data: data
	});
}


window.addEventListener(
	'message',
	(evt) => {
		if (evt.data.type === "RClientWindowMessenger")
			switch (evt.data.messageType)
			{
				case 'rcp-fe-lol-home-hub-settings-observe':
					SendEvent('rcp-fe-lol-home-hub-settings-observe-response', GetCookie(evt.data.data.hubId));
					break;
				case 'rcp-fe-lol-home-hub-settings-set':
					SetCookie(evt.data.data.hubId, evt.data.data.hubData);
					SendEvent('rcp-fe-lol-home-hub-settings-set-response', {success: 1});
					break;
				case 'rcp-fe-lol-home-observe-missions':
					var simplifiedRewardData = RareSigilMissions.map(v=> {
						return {
							internalName: v,
							status: "COMPLETED"
						};
					});
					SendEvent('rcp-fe-lol-home-missions-changed', simplifiedRewardData);
					break;
				case 'rcp-fe-lol-home-selectable-rewards-grants-observe':
					SendEvent('rcp-fe-lol-home-selectable-rewards-grants-changed', []);
					break;
				default:
					console.warn(`Unhandled RClientWindowMessenger event recevied ${evt.data.messageType}`);
					console.warn(evt.data.data);
			}
	},
);


RareSigilMissions = [
	"DemonsHand_MissionPointsA_1",
	"DemonsHand_MissionPointsA_2",
	"DemonsHand_MissionPointsA_3",
	"DemonsHand_MissionPointsA_4",
	"DemonsHand_MissionPointsB_1",
	"DemonsHand_MissionPointsB_2",
	"DemonsHand_MissionPointsB_3",
	"DemonsHand_MissionPointsB_4",
	"DemonsHand_MissionPointsC_1",
	"DemonsHand_MissionPointsC_2",
	"DemonsHand_MissionPointsC_3",
	"DemonsHand_MissionPointsC_4",
	"DemonsHand_MissionPointsD_1",
	"DemonsHand_MissionPointsD_2",
	"DemonsHand_MissionPointsD_3",
	"DemonsHand_MissionPointsD_4",
	"DemonsHand_MissionPointsE_1",
	"DemonsHand_MissionPointsE_2",
	"DemonsHand_MissionPointsE_3",
	"DemonsHand_MissionPointsE_4",
	"DemonsHand_MissionPointsF_1",
	"DemonsHand_MissionPointsF_2",
	"DemonsHand_MissionPointsF_3",
	"DemonsHand_MissionPointsF_4"
];
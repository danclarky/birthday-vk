var axios = require('axios');
var moment = require('moment');
var fs = require('fs');
const { Pool, Client } = require('pg');


var token="token";
var id = "id";
let id1 = "-id";
var offset=0;
var ids;

CheckToken(token,id);

var count = 1000;
var prarr=[];	

let attachments=["photo-132763831_456241255","photo-132763831_456241295","photo-132763831_456241296","photo-132763831_456241297","photo-132763831_456241298","photo-132763831_456241299","photo-132763831_456241300","photo-132763831_456241301","photo-132763831_456241302"];

let indexattr = randomInteger(0,8);



getBDUsers().then((users) => {
	if (users.length != 0)
	{
	
	
	send("У кого то есть ДР");

	let msg='Поздравляем наших подписчиков с Днем Рождения: \n';
	msg+="@id"+users[0].id+" ("+users[0].last_name+" "+users[0].first_name+")";
	if (users.length === 1)
	{
		
	}
	else
	{
		for (let i =1 ;i<users.length;i++)
		{
			msg+=", @id"+users[i].id+" ("+users[i].last_name+" "+users[i].first_name+")";
		}
	}
	console.log(msg);
	msg+="\n Желаем Вам счастья!!! 🌸🌸🌸"
	msg=encodeURI(msg);
	console.log(msg);
	   const url = `https://api.vk.com/api.php?oauth=1&method=wall.post&owner_id=${id1}&message=${msg}&attachments=${attachments[indexattr]}&from_group=true&v=5.67&access_token=${token}`;
        try {
            const resp =  axios.get(
                url,
                { headers: { 'Content-type': 'text/html; charset=windows-1251' } }
            );
            console.log('Resp ok', resp.body);
        } catch (e) {
            console.log('Resp err', e);
        }
		console.log(url);
	}
	else
	{
		send("Ни у кого нет ДР");
	}
	}).catch();
    




async function CheckToken(token,id) {
	
	const url = `https://api.vk.com/api.php?oauth=1&method=groups.getMembers&group_id=${id}&v=5.92&access_token=${token}`;
    const response = await getJSONAsync(url);
	
	
	if(response.data.error === undefined)
	{
		console.log("Все в норм");
	}
	else
	{
		console.log(response.data.error.error_msg);
		send("Косяк с отправкой в группу: "+response.data.error.error_msg);
	}
}
	
    async function getJSONAsync(url){
		let json = await axios.get(url);
		return json;
    }	
		
	
	function send(value){
		const client = new Client({
			user: 'postgres',
			host: 'ip',
			database: 'Base',
			password: 'password',
			port: port,
		})	
		client.connect();	
	
		client.query("INSERT INTO ПришедшиеЗаявкиДляЗапроса(ФИО) VALUES('"+value+"')", (err, res) => {
		if (err) {
			console.log(err.stack)
			} else {
			client.end();
		}
		})
        
	}
	
function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

	
async function getBDUsers(maxMembers = 2000, offset = 0) {
    const url = `https://api.vk.com/api.php?oauth=1&method=groups.getMembers&group_id=${id}&offset=${offset}&count=${1000}&fields=bdate&v=5.92&access_token=${token}`;
    const response = await getJSONAsync(url);
    let respData = (((response.data || {}).response || {}).items || [])
      .filter((item) => {
        return isTodayBirthday(item.bdate);
      })
      .map((item) => {
        return { id: item.id, first_name: item.first_name, last_name: item.last_name, bdate: item.bdate };
      });

    await sleep(1000);

    if (offset < maxMembers) {
      const nextUsers = await getBDUsers(maxMembers, offset + 1000);
      respData = respData.concat(nextUsers)
    }
    return respData;
}

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
 
	
	
	
	
	function isTodayBirthday(bDate) {
	const splitData = (bDate || '').split('.');
	let date = null;
	switch(splitData.length) {
    case 2: 
      date = moment(bDate, 'DD.MM')
      break;
    case 3: 
      date = moment(bDate, 'DD.MM.YYYY')
      break;
	}

	
	
	if (!date) {
		return false
	}
		return date.isSame(Date.now(), 'month') && date.isSame(Date.now(), 'day')

	}
	
	function mom(bDate){
		bDate=bDate+'.2018'
		return date;
	}
	
	function sleepFor(sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}
		
		
		

	

	
module.exports = {
    name: 'getrank',
    description: 'finds the rank of a person for you.',
    execute(message, args) {
        if (args.length < 1) {
            throw 'Please provide an username.';
        }
        message.client.lolApi.get('euw1', 'summoner.getBySummonerName', args.join(" ")).then(data =>  {
                message.client.lolApi.get('euw1', 'league.getAllLeaguePositionsForSummoner', data.id).then(data => {
                    console.log(data);
                    for(var i = 0; i < data.length; i++){
                        var rank = data[i].queueType+" "+data[i].tier + " "+data[i].rank;
                        if(rank.includes("BRONZE"))
                                message.channel.send(rank + " :joy: :wheelchair:");
                            else
                                message.channel.send(rank);
                    }
                })
        }).catch( function(error){
            message.channel.send("No user with the name "+args.join(" ")+" found.");
        });


    },
}
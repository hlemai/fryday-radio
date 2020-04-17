const redis=require("redis");
const md5 = require('md5');
const music = require("../music");
var config=require("../config/config");

const NEWREQUESTLIST="NEWREQUESTLIST";

const client = redis.createClient(config.REDISPORT, config.REDISHOST);

module.exports.getIndexPage = (req, res) => {
    res.json({ status: 200, message: 'Simple CRUD RESTFUL API using Node JS, Express JS, and Redis.' });
};

  
  /*
  Function to Create Song Request
  */
module.exports.addRequest = (req, res) => {
    // Get the User Details
  const newSongRequest = req.body;
  // Check if user exists
  newSongRequest.id=md5(newSongRequest.username+newSongRequest.url);
  client.exists(newSongRequest.id, (err, reply) => {
    if (reply === 1) {
      return res.json({ status: 400, message: 'request allready pushed', newSongRequest });
    }
    // try to add music
    music.getAndPushYoutubeSong(newSongRequest.url,data => {
      if(data.id ==="ERROR")
        return res.json({ status: 400, message: 'Bad url', newSongRequest });
    
      // Add New SongREquest
      var addtionaldata=require("../"+config.MUSICPATH+data.id+".info");
      data.title=addtionaldata.title;
      client.multi()
        .hmset(newSongRequest.id, [
            "id",newSongRequest.id,
            "username", newSongRequest.username,
            "url", newSongRequest.url,
            "idsong",data.id,
            "number",data.number,
            "title",data.title
        ])
        .rpush(NEWREQUESTLIST,newSongRequest.id)
        .exec( (error, result) => {
            if (error) {
                return res.json({ status: 400, message: 'Something went wrong', error });
            }
        });
    });
  });
};

module.exports.getListRequestIds = function(req,res) {
    var lstRequest= [];
    client.lrange(NEWREQUESTLIST,0,-1,(error,result) => {
        if(error) {
              return res.json(lstRequest);
        }
        return res.json(result);
      } );
  };

  module.exports.getRequest = function(req,res) {
    client.hgetall(req.params.id,(error,result) => {
        if(error) {
              return res.json({ status: 400, message: 'Something went wrong', error });
        }
        return res.json(result);
      } );
  };

  module.exports.getNowPlaying = function(req,res) {
    var message=""
    music.getOnAirNumber(data=>{
      message = data;
      music.remaining(remaindata=> {
        message=message+" -> remaining : "+remaindata+" seconds";
        return res.json(message);
      });
    });
  };
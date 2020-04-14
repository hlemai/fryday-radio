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
module.exports.validateInput = (req, res, next) => {
    req.checkBody('name', 'Name must be provided').notEmpty();
    req.checkBody('email', 'That Email is not valid').isEmail();
    req.sanitizeBody('email').normalizeEmail({
      remove_dots: false,
      remove_extension: false,
      gmail_remove_subaddress: false,
    });
    req.checkBody('age', 'Age must be Provided!').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
      res.json({ status: 400, errors, message: errors[0].msg });
      return;
    }
    next();
  };
  */
  
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
      music.getAndPushYoutubeSong(newSongRequest.url,id => {
        if(id ==="ERROR")
          return res.json({ status: 400, message: 'Bad url', newSongRequest });
      
        // Add New SongREquest
        client.hmset(
          newSongRequest.id, [
              "id",newSongRequest.id,
              "username", newSongRequest.username,
              "url", newSongRequest.url,
              "idsong",id], (error, result) => {
              if (error) {
                  return res.json({ status: 400, message: 'Something went wrong', error });
              }
              client.rpush(NEWREQUESTLIST,newSongRequest.id,(error,result) => {
                  if (error) {
                      return res.json({ status: 400, message: 'Something went wrong2', error });
                  }
                  return res.json({result, status: 200, message: 'List updated', newSongRequest});
              });
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
        console.log(result);
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
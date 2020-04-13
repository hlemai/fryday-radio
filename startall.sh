./startradio.sh &
redis-server &
./cleanmusic.sh
redis-cli FLUSHALL
node start.js
./startradio.sh &
redis-server &
./cleanmusics.sh
redis-cli FLUSHALL
node start.js
PID=$(ps -ef | grep node\ application.js | grep -v grep | awk '{ print $2 }')
if [ -z "$PID" ]
then
    echo application is already stopped
else
    echo kill $PID
    kill -9 $PID
fi
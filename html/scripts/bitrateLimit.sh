bitrateLIMIT=4000 # Actual limit 3500 KB/s (500 KB/s for spikes)
whitelist=("123" "911")

app="$1"
name="$2"

xml=$(curl -k --silent http://127.0.0.1/stats)
bitrate=$(echo $xml | xmlstarlet sel -t -v 'rtmp/server/application[name="'"$app"'"]/live/stream[name="'"$name"'"]/bw_video')
bitrate=$(( bitrate / 1000 ))

for i in "${whitelist[@]}"
do
	if [ $name -eq $i ]
	then
		bolDosentContain=false
		break
	else
		bolDosentContain=true
	fi
done

if [ $bitrate -gt $bitrateLIMIT ] && $bolDosentContain
then
	echo "Dropped!! Stream: $name | Bitrate: $bitrate KB/s"
	curl -k --silent http://127.0.0.1/control/drop/publisher?app=$app&name=$name
fi

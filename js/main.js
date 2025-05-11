const fetchId = "998724908030898196"; // Your Discord User ID
const apiUrl = `https://api.lanyard.rest/v1/users/${fetchId}`;

let updateInterval;




const statusText = {
    online: 'Online',
    offline: 'Offline',
    idle: 'Idle',
    dnd: 'Do Not Disturb'
};

const statusColors = {
    online: '#57F287',
    offline: '#808080',
    idle: '#F0B232',
    dnd: '#ED4245'
};

function fetchAndUpdateStatus() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const discordData = data.data.discord_user;
                const discordUsername = discordData.username;
                const discordAvatar = discordData.avatar;
                const status = data.data.discord_status;
                const discordActivityText = statusText[status];
                const discordActivityColor = statusColors[status] || '#dc2525';
                const discordUsernameStatus = '#000';

                // Set username, status, and avatar
                document.getElementById('discordUsernameStatus').innerHTML = `<b>${discordUsername}</b>`;
                document.getElementById('discordUsernameStatus').style.color = discordUsernameStatus;
                document.getElementById('discordStatusIndicator').style.backgroundColor = discordActivityColor;
                document.getElementById('discordStatusIndicator').setAttribute('data-status-text', discordActivityText);
                document.getElementById('discordAvatar').src = `https://cdn.discordapp.com/avatars/${fetchId}/${discordAvatar}.png`;


                const discordActivities = data.data.activities;

                // Handle Custom Status (always shown)
                const customStatusActivity = discordActivities.find(activity => activity.type === 4);
                if (customStatusActivity) {
                    const customEmoji = customStatusActivity.emoji;
                    const customEmojiHtml = customEmoji ?
                        `<img src="https://cdn.discordapp.com/emojis/${customEmoji.id}.png" alt="${customEmoji.name}" style="width: 25px; height: 25px; margin-right: 5px;">` : '';
                    const customText = customStatusActivity.state || 'No Current Status';
                    document.getElementById('customStatus').innerHTML = `${customEmojiHtml} ${customText}`;
                } else {
                    document.getElementById('customStatus').innerHTML = 'No Current Status';
                }

                // Handle Other Activities (only show when active)
                const nonSpotifyActivity = discordActivities.find(activity =>
                    activity.type !== 4 && activity.name !== 'Spotify' &&
                    (activity.details || activity.state || activity.assets?.large_image)
                );

                if (nonSpotifyActivity) {
                    const activityName = nonSpotifyActivity.name;
                    const activityState = nonSpotifyActivity.state;
                    const activityDetails = nonSpotifyActivity.details;
                    const activityAssets = nonSpotifyActivity.assets;

                    let largeImageSrc = '';
                    if (activityAssets?.large_image) {
                        if (activityAssets.large_image.startsWith('mp:external')) {
                            largeImageSrc = `https://media.discordapp.net/${activityAssets.large_image.replace("mp:", "")}`;
                        } else {
                            largeImageSrc = `https://cdn.discordapp.com/app-assets/${nonSpotifyActivity.application_id}/${activityAssets.large_image}.png`;
                        }
                        document.getElementById('largeImage').src = largeImageSrc;
                        document.getElementById('largeImage').style.display = 'block';
                    } else {
                        document.getElementById('largeImage').style.display = 'none';
                    }

                    document.getElementById('activityName').innerText = activityName || '';
                    document.getElementById('activityState').innerText = activityState || '';
                    document.getElementById('activityDetails').innerText = activityDetails || '';
                    document.getElementById('activityInfo').style.display = 'block';
                } else {
                    document.getElementById('activityInfo').style.display = 'none';
                }

                // Handle Spotify (only show when active)
                if (data.data?.listening_to_spotify) {
                    const spotifyData = data.data.spotify;
                    const songName = spotifyData.song;
                    const songArtist = spotifyData.artist;
                    const songAlbum = spotifyData.album;
                    const songCover = spotifyData.album_art_url;
                    const startTimestamp = spotifyData.timestamps.start;
                    const endTimestamp = spotifyData.timestamps.end;
                    const totalDuration = endTimestamp - startTimestamp;
                    const currentTimestamp = new Date().getTime();
                    const elapsedDuration = currentTimestamp - startTimestamp;
                    const progress = (elapsedDuration / totalDuration) * 100;
                    const totalMinutes = Math.floor(totalDuration / 60000);
                    const totalSeconds = Math.floor((totalDuration % 60000) / 1000);
                    const totalTime = `${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
                    const elapsedMinutes = Math.floor(elapsedDuration / 60000);
                    const elapsedSeconds = Math.floor((elapsedDuration % 60000) / 1000);
                    const remainingTime = `${elapsedMinutes}:${elapsedSeconds.toString().padStart(2, '0')}`;

                    document.getElementById('spotifyBox').style.display = 'block';
                    document.getElementById("listeningText").innerHTML = `<b style="color: rgb(32, 32, 32); font-weight: bold; font-size: 15px">Listening on Spotify</b>`;
                    document.getElementById("songName").innerHTML = `${songName} <br> By: <b>${songArtist}</b> <br></b>`;
                    document.getElementById("songCover").src = songCover;
                    document.getElementById('progressBar').style.width = progress + '%';
                    document.getElementById('remainingTime').innerText = totalTime;
                    document.getElementById('totalTime').innerText = remainingTime;

                    if (updateInterval) clearInterval(updateInterval);

                    // Update Spotify tooltip with album name
                    document.querySelector('.songCover').setAttribute('data-spotify-text', songAlbum);

                    updateInterval = setInterval(() => {
                        const currentTimestamp = new Date().getTime();
                        const elapsedDuration = currentTimestamp - startTimestamp;
                        const progress = (elapsedDuration / totalDuration) * 100;
                        const elapsedMinutes = Math.floor(elapsedDuration / 60000);
                        const elapsedSeconds = Math.floor((elapsedDuration % 60000) / 1000);
                        const remainingTime = `${elapsedMinutes}:${elapsedSeconds.toString().padStart(2, '0')}`;

                        document.getElementById('progressBar').style.width = progress + '%';
                        document.getElementById('totalTime').innerText = remainingTime;

                        if (currentTimestamp >= endTimestamp) {
                            clearInterval(updateInterval);
                            fetchAndUpdateStatus();
                        }
                    }, 1000);
                } else {
                    document.getElementById('spotifyBox').style.display = 'none';
                    if (updateInterval) clearInterval(updateInterval);
                }

                setTimeout(fetchAndUpdateStatus, 10000);
            } else {
                console.error('API Error:', data.error);
            }
        })
        .catch(error => {
            console.error('Error Fetching API Data:', error.message);
            setTimeout(fetchAndUpdateStatus, 10000);
        });
}

// Initialize
fetchAndUpdateStatus();
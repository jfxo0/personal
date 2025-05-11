function convertDiscordMarkdown(text) {
    // Code Blocks
    text = text.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    // Inline Code
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    // Bold text
    text = text.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
    text = text.replace(/__([^_]+)__/g, '<b>$1</b>');
    // Italic Text
    text = text.replace(/\*([^*]+)\*/g, '<i>$1</i>');
    text = text.replace(/_([^_]+)_/g, '<i>$1</i>');
    // Strikethrough Text
    text = text.replace(/~~([^~]+)~~/g, '<s>$1</s>');
    // Markdown Links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

    // URL to link
    const urlPattern = /(\b(https?:\/\/|www\.)[-A-Z0-9+&@#\/%?=~_|!():,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

    text = text.replace(urlPattern, function(url) {
        const link = url.startsWith('www.') ? `http://${url}` : url;
        return `<a href="${link}" target="_blank">${url}</a>`;
    });

    return text;
}

fetch('https://dcdn.dstn.to/profile/998724908030898196')
    .then(response => response.json())
    .then(data => {
        const bioContainer = document.getElementById('bio-content');
        const bioText = data.user_profile.bio || data.user.bio;

        const formattedBio = convertDiscordMarkdown(bioText).replace(/\n/g, '<br>');

        const bioItem = document.createElement('p');
        bioItem.style.fontSize = '15px';
        bioItem.style.textAlign = 'left';
        bioItem.innerHTML = formattedBio;
        bioContainer.appendChild(bioItem);
    })
    .catch(error => console.error('Error fetching bio:', error));
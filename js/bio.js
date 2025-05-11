function convertDiscordMarkdown(text) {
    if (!text) return ''; // Handle empty bio case

    // Process emojis first (before other markdown)
    text = text.replace(/<a?:\w+:(\d+)>/g, (match, emojiId) => {
        const isAnimated = match.startsWith('<a:');
        const extension = isAnimated ? 'gif' : 'webp';
        return `<img src="https://cdn.discordapp.com/emojis/${emojiId}.${extension}" class="discord-emoji" alt="emoji">`;
    });

    // Code Blocks
    text = text.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    // Inline Code
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    // Bold text
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/__([^_]+)__/g, '<strong>$1</strong>');
    // Italic Text
    text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    text = text.replace(/_([^_]+)_/g, '<em>$1</em>');
    // Strikethrough Text
    text = text.replace(/~~([^~]+)~~/g, '<s>$1</s>');
    // Markdown Links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // URL to link (only for non-markdown URLs)
    const urlPattern = /(\b(https?:\/\/|www\.)[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])(?![^<]*>)/gi;
    text = text.replace(urlPattern, (url) => {
        const link = url.startsWith('www.') ? `http://${url}` : url;
        return `<a href="${link}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });

    return text;
}


// Add this CSS to your stylesheet or in a <style> tag
/*
.discord-emoji {
    height: 1em;
    width: 1em;
    vertical-align: middle;
    margin: 0 .05em 0 .1em;
}
*/

fetch('https://dcdn.dstn.to/profile/998724908030898196')
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        const bioContainer = document.getElementById('bio-content');
        // Clear previous content
        bioContainer.innerHTML = '';

        const bioText = data.user_profile?.bio || data.user?.bio || '';
        const formattedBio = convertDiscordMarkdown(bioText).replace(/\n/g, '<br>');

        const bioItem = document.createElement('p');
        bioItem.style.fontSize = '15px';
        bioItem.style.textAlign = 'left';
        bioItem.style.color = 'rgb(32, 32, 32)';
        bioItem.innerHTML = formattedBio;
        bioContainer.appendChild(bioItem);
    })
    .catch(error => {
        console.error('Error fetching bio:', error);
        document.getElementById('bio-content').textContent = 'Could not load bio';
    });
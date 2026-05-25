(() => {
    const guestbook = document.getElementById("guestbook");

    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxY6cHtdxNMjth8_de43hXzIsi7QaElvVfG3oV7rbThj9CUbNCxiMlI8kl2_bYJ1wQUTA/exec";

    if (!guestbook) return;

    guestbook.innerHTML = `
    <div class="guestbook">
      <h2>Guestbook</h2>
      <p class="guestbook-subtitle">leave me a message ♡</p>

      <form id="guestbookForm">
        <input 
          id="guestName" 
          type="text" 
          placeholder="your name" 
          maxlength="30" 
          required
        >

        <textarea 
          id="guestMessage" 
          placeholder="write something..." 
          maxlength="300" 
          required
        ></textarea>

        <button type="submit">sign guestbook</button>
      </form>

      <p id="guestStatus"></p>

      <div id="guestMessages"></div>
    </div>
  `;

    const form = document.getElementById("guestbookForm");
    const guestStatusEl = document.getElementById("guestStatus");
    const messagesBox = document.getElementById("guestMessages");

    function escapeHTML(text) {
        return String(text).replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[char]));
    }

    window.showGuestbookMessages = function(messages) {
        if (!messages || messages.length === 0) {
            messagesBox.innerHTML = `<p>No messages yet ♡</p>`;
            return;
        }

        messagesBox.innerHTML = messages.map(item => `
      <div class="guest-message">
        <strong>${escapeHTML(item.name)}</strong>
        <p>${escapeHTML(item.message)}</p>
      </div>
    `).join("");
    };

    function loadMessages() {
        const script = document.createElement("script");
        script.src = `${SCRIPT_URL}?callback=showGuestbookMessages`;
        document.body.appendChild(script);
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("guestName").value.trim();
        const message = document.getElementById("guestMessage").value.trim();

        if (!name || !message) return;

        guestStatusEl.textContent = "sending...";

        try {
            await fetch(SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                body: JSON.stringify({
                    name: name,
                    message: message
                })
            });

            form.reset();
            guestStatusEl.textContent = "sent! i'll approve it soon ♡";
        } catch (error) {
            guestStatusEl.textContent = "something went wrong :(";
            console.error(error);
        }
    });

    loadMessages();
})();
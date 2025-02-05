chrome.storage.local.get("filterEnabled", (data) => {
    if (data.filterEnabled) {
        const blockedWords = ["violence", "gambling", "adult"];
        blockedWords.forEach(word => {
            if (document.body.innerText.includes(word)) {
                document.body.innerHTML = "<h1>Blocked for Safety</h1><p>This page contains unsafe content.</p>";
            }
        });
    }
});


// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "scanPage") {
        scanPageContent();
        checkPhishing();
        sendResponse({ message: "Scanning complete." });
    }
});

// Function to scan webpage for inappropriate content
function scanPageContent() {
    const BLOCKED_WORDS = ["violence", "gambling", "drugs", "hate speech"];
    let bodyText = document.body.innerText.toLowerCase();
    
    for (let word of BLOCKED_WORDS) {
        if (bodyText.includes(word)) {
            alert("⚠ Warning: This page may contain unsafe content for kids!");
            document.body.innerHTML = "<h2>Content Blocked by SafeBrowse Junior</h2>";
            break;
        }
    }
}

// Function to check for phishing URLs using Google's Safe Browsing API
async function checkPhishing() {
    let apiKey = "YOUR_GOOGLE_SAFE_BROWSING_API_KEY"; // Replace with your actual API key
    let url = window.location.href;

    let request = {
        client: { clientId: "safebrowse-junior", clientVersion: "1.0" },
        threatInfo: {
            threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
            platformTypes: ["ANY_PLATFORM"],
            threatEntryTypes: ["URL"],
            threatEntries: [{ url: url }]
        }
    };

    let response = await fetch(
        `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`,
        {
            method: "POST",
            body: JSON.stringify(request),
            headers: { "Content-Type": "application/json" }
        }
    );
    
    let result = await response.json();
    if (result.matches) {
        alert("⚠ Warning: This site is flagged as unsafe!");
        document.body.innerHTML = "<h2>Blocked: Unsafe Website Detected!</h2>";
    }
}

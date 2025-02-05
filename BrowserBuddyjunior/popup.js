document.addEventListener("DOMContentLoaded", () => {
    const statusText = document.getElementById("status");
    const toggleButton = document.getElementById("toggleFilter");

    chrome.storage.local.get("filterEnabled", (data) => {
        toggleButton.textContent = data.filterEnabled ? "Disable AI Filtering" : "Enable AI Filtering";
        statusText.textContent = data.filterEnabled ? "Enabled" : "Disabled";
    });

    toggleButton.addEventListener("click", () => {
        chrome.storage.local.get("filterEnabled", (data) => {
            const newStatus = !data.filterEnabled;
            chrome.storage.local.set({ "filterEnabled": newStatus }, () => {
                toggleButton.textContent = newStatus ? "Disable AI Filtering" : "Enable AI Filtering";
                statusText.textContent = newStatus ? "Enabled" : "Disabled";
            });
        });
    });
});

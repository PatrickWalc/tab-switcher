chrome.commands.onCommand.addListener(async function (command) {
    let tabs = await getTabs();
    let currentTab = await getCurrentTab();
    if(tabs.length > 1){
        if(command === "move_right"){
            chrome.tabs.update(currentTab.index === tabs.length - 1 ? tabs[0].id : tabs[currentTab.index + 1].id, {selected: true});
        }
        if(command === "move_left"){
            chrome.tabs.update(currentTab.index === 0 ? tabs[tabs.length - 1].id : tabs[currentTab.index - 1].id, {selected: true});
        }
        if (command === "first_tab"){
            chrome.tabs.update(tabs[0].id, {selected: true});
        }
        if (command === "last_tab"){
            chrome.tabs.update(tabs[tabs.length - 1].id, {selected: true});
        }
    }
});


async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function getTabs() {
    let tabs = await chrome.tabs.query({currentWindow: true})
    return tabs;
}
// Add toggle listeners for all buttons
(function add_listeners() {
    let buttons = document.getElementsByClassName("disabled");
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons.item(i);
        button.addEventListener("click", function () {
            if (button.classList.contains("disabled")) {
                button.classList.remove("disabled");
                button.classList.add("enabled");
            } else if (button.classList.contains("enabled")) {
                button.classList.remove("enabled");
                button.classList.add("disabled");
            }
        });
    }
})();

function set_button_activation_state(button, state) {
    if (state) {
        button.classList.remove("disabled");
        button.classList.add("enabled");
    } else {
        button.classList.remove("enabled");
        button.classList.add("disabled");
    }
}

document.getElementById("help").addEventListener("click", function () {
    window.open("https://kaminingyou.github.io/moderation/");
});

function run_on_focused_tab(callback){
    chrome.tabs.query({active: true, currentWindow: true}, callback);
}

let entry_denial_button = document.getElementById("entry_denial");
// Initialise the state of the button according to storage data.
chrome.storage.sync.get(["meet_deny_entry"], function (result) {
    set_button_activation_state(entry_denial_button, result.meet_deny_entry);
});

// Toggle the state and update the injected code.
entry_denial_button.addEventListener("click", function () {
    run_on_focused_tab( function (tabs) {
        // Update the storage setting.
        chrome.storage.sync.get(["meet_deny_entry"], function (result) {
            chrome.storage.sync.set({meet_deny_entry: !result.meet_deny_entry});
            chrome.tabs.sendMessage(tabs[0].id, "meet_update_config");
        });
    })
});

let auto_unmute_button = document.getElementById("auto_unmute");
// Initialise the state of the button according to storage data.
chrome.storage.sync.get(["meet_auto_unmute"], function (result) {
    set_button_activation_state(auto_unmute_button, result.meet_auto_unmute);
});

auto_unmute_button.addEventListener("click", function () {
    run_on_focused_tab( function (tabs) {
        // Update the storage setting.
        chrome.storage.sync.get(["meet_auto_unmute"], function (result) {
            chrome.storage.sync.set({meet_auto_unmute: !result.meet_auto_unmute});
            chrome.tabs.sendMessage(tabs[0].id, "meet_update_config");
        });
    })
});

let purge_button = document.getElementById("purge");
purge_button.addEventListener("click", function () {
    run_on_focused_tab( function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, "meet_purge");
    })
});

let mute_all_button = document.getElementById("mute_all");
mute_all_button.addEventListener("click", function () {
    run_on_focused_tab( function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, "meet_mute_all");
    })
});

let name_input = document.getElementById("name");
let add_to_blacklist_button = document.getElementById("add_to_blacklist");
add_to_blacklist_button.addEventListener("click", function () {
    run_on_focused_tab( async function (tabs) {
        // Update the storage setting.
        chrome.storage.sync.get(["meet_blacklist_info"], function (result) {
            let info = result.meet_blacklist_info;
            if (!info.list.includes(name_input.value)) {
                info.list.push(name_input.value);
            }
            chrome.storage.sync.set({meet_blacklist_info: info});

            chrome.tabs.sendMessage(tabs[0].id, "meet_update_config");
            name_input.value = "";
        });
    })
});

let remove_from_blacklist_button = document.getElementById("remove_from_blacklist");
remove_from_blacklist_button.addEventListener("click", function () {
    run_on_focused_tab(async function (tabs) {
        chrome.storage.sync.get(["meet_blacklist_info"], function (result) {
            let info = result.meet_blacklist_info;

            let index = info.list.indexOf(name_input.value);
            if (index !== -1) {
                info.list.splice(index, 1);
            }

            chrome.storage.sync.set({meet_blacklist_info: info});

            chrome.tabs.sendMessage(tabs[0].id, "meet_update_config");
            name_input.value = "";
        });
    })
});

let toggle_blacklist_button = document.getElementById("enable_blacklist");
// Initialise the state of the button according to storage data.
chrome.storage.sync.get(["meet_blacklist_info"], function (result) {
    set_button_activation_state(toggle_blacklist_button, result.meet_blacklist_info.enabled);
});
toggle_blacklist_button.addEventListener("click", function () {
    run_on_focused_tab(function (tabs) {
        chrome.storage.sync.get(["meet_blacklist_info"], function (result) {
            let info = result.meet_blacklist_info;
            info.enabled = !info.enabled;
            chrome.storage.sync.set({meet_blacklist_info: info});

            chrome.tabs.sendMessage(tabs[0].id, "meet_update_config");
        });
    });
});

let clear_blacklist_button = document.getElementById("clear_blacklist");
clear_blacklist_button.addEventListener("click", function () {
    run_on_focused_tab(function (tabs) {
        chrome.storage.sync.get(["meet_blacklist_info"], function (result) {
            let info = result.meet_blacklist_info;
            info.list.length = 0;
            chrome.storage.sync.set({meet_blacklist_info: info});
        });

        chrome.tabs.sendMessage(tabs[0].id, "meet_update_config");
    })
});

let remove_blacklisted_button = document.getElementById("remove_blacklisted");
remove_blacklisted_button.addEventListener("click", function () {
    run_on_focused_tab(function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, "meet_remove_blacklisted");
    })
});
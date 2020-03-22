const check_loop_delay = 30;
const remove_blacklist_loop_delay = 3000;

let meetingCheck = window.setInterval(async function () {
    if (document.getElementsByClassName("CkXZgc").length > 0) {
        await init();
        window.clearInterval(meetingCheck);
    }
}, check_loop_delay);


let config = {};

let participants = null;
let participant_name_elements = null;
async function init() {
    await update_config();

    participants = document.getElementsByClassName("YvoLGe");
    participant_name_elements = document.getElementsByClassName("cS7aqe NkoVdd");
    if (participants.length === 0) {
        await open_people_panel();
    }

    chrome.runtime.onMessage.addListener(async function (message) {
        if (message === "meet_update_config") {
            await update_config();
        }
        if (message === "meet_purge") {
            await purge();
        }
        if (message === "meet_remove_blacklisted") {
            await remove_blacklisted();
        }
        if (message === "meet_mute_all") {
            await mute_all_participants();
        }
    });

    let blacklist_interval_id = -1;
    // Start main loop.
    window.setInterval(function () {
        if (config.meet_deny_entry) {
            let deny_button = document.getElementsByClassName("CwaK9").item(2);
            if (deny_button) {
                deny_button.click();
            }
        }
        if (config.meet_auto_unmute) {
            let potential_unmute_button = document.getElementsByClassName(
                "U26fgb JRY2Pb mUbCce kpROve uJNmj FTMc0c N2RpBe jY9Dbb").item(0);
            if (potential_unmute_button &&
                potential_unmute_button.getAttribute("aria-label").includes("microphone")) {
                potential_unmute_button.click();
            }
        }
        if (config.meet_blacklist_info.enabled) {
            if (blacklist_interval_id === -1){
                blacklist_interval_id = window.setInterval(async function f() {
                    await remove_blacklisted();
                }, remove_blacklist_loop_delay);
            }
        } else {
            window.clearInterval(blacklist_interval_id);
            blacklist_interval_id = -1;
        }
    }, 15);
}

async function update_config() {
    return new Promise(function (resolve) {
        chrome.storage.sync.get(["meet_deny_entry", "meet_auto_unmute", "meet_blacklist_info"],
        function (result) {
            config = result;
            resolve();
        });
    });
}
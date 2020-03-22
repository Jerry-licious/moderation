let people_button = null;
async function open_people_panel() {
    return new Promise(function (resolve) {
        if (!people_button) {
            people_button =
                document.getElementsByClassName("uArJ5e UQuaGc kCyAyd kW31ib foXzLb")[0];
        }
        if (participants.length === 0) {
            people_button.click();
            let id = setInterval(function () {
                if (participants.length > 0) {
                    clearInterval(id);
                    resolve();
                }
            })
        } else {
            resolve();
        }
    });
}

async function focus_participant(index) {
    return new Promise(
        async function (resolve) {
            await open_people_panel();
            if (index > 0 && index < participants.length) {
                let id = setInterval(function () {
                    if (participants[index]) {
                        participants[index].children[1].children[3].firstElementChild.click();
                        clearInterval(id);
                        resolve();
                    }
                }, check_loop_delay);
            } else {
                resolve();
            }
        }
    );
}

function click_confirm_button(resolve){
    let encountered = false;
    let id = setInterval(function () {
        let confirm_button = document.getElementsByClassName("U26fgb O0WRkf oG5Srb HQ8yf C0oVfc kHssdc HvOprf")[0];
        if (confirm_button) {
            confirm_button.click();
            encountered = true;
        }
        if (!confirm_button && encountered) {
            clearInterval(id);
            resolve();
        }
    }, check_loop_delay);
}

async function remove_focused_participant() {
    return new Promise(function (resolve) {
        let id = setInterval(function () {
            let mute_button = document.getElementsByClassName("uArJ5e Y5FYJe cjq2Db HZJnJ nteJvf vNRUd")[0];
            if (mute_button) {
                mute_button.click();
                if (document.getElementsByClassName("U26fgb O0WRkf oG5Srb HQ8yf C0oVfc kHssdc HvOprf")[0]) {
                    clearInterval(id);
                    click_confirm_button(resolve);
                }
            }
        }, check_loop_delay);
    });
}

async function remove_participant(index) {
    await focus_participant(index);
    await remove_focused_participant();
}

async function purge() {
    await open_people_panel();

    let participants_total_count = participants.length;
    for (let i = 1; i < participants_total_count; i++) {
        await remove_participant(1);
        await (new Promise(function (resolve) {
            let id = setInterval(function () {
                if (participants.length === participants_total_count - i) {
                    clearInterval(id);
                    resolve();
                }
            }, check_loop_delay);
        }));
    }
}

let participant_name_list = [];
async function update_name_list() {
    await open_people_panel();
    // Clear the list
    participant_name_list.length = 0;

    for (let i = 0; i < participant_name_elements.length; i++) {
        participant_name_list.push(participant_name_elements[i].innerText);
    }
}

function find_participant_by_name(name) {
    let result = participant_name_list.lastIndexOf(name);
    if (result === -1) {
        return null;
    }
    return result;
}

async function remove_participant_by_name(name) {
    let i = find_participant_by_name(name);
    if (i) {
        await remove_participant(i);
        return true;
    } else {
        return false;
    }
}

async function remove_blacklisted() {
    await update_name_list();

    let blacklist = config.meet_blacklist_info.list;
    let participants_total_count = participants.length;
    let removed_count = 0;
    for (let i = 0; i < blacklist.length; i++) {
        if (await remove_participant_by_name(blacklist[i])) {
            removed_count++;
            await (new Promise(function (resolve) {
                let id = setInterval(function () {
                    if (participants.length === participants_total_count - removed_count) {
                        clearInterval(id);
                        resolve();
                    }
                }, check_loop_delay);
            }));
        }
    }
}
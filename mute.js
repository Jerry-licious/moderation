async function mute_focused_participant() {
    return new Promise(function (resolve) {
        // Element exists when the user is not muted.
        if(document.getElementsByClassName("IYwVEf HotEze Jvi93 uB7U9e")[0]) {
            let id = setInterval(function () {
                let mute_button = document.getElementsByClassName("uArJ5e Y5FYJe cjq2Db HZJnJ RfqEId vNRUd")[0];
                if (mute_button) {
                    mute_button.click();
                    // Spam mute button until confirm button is detected.
                    if (document.getElementsByClassName("U26fgb O0WRkf oG5Srb HQ8yf C0oVfc kHssdc HvOprf")[0]) {
                        clearInterval(id);
                        click_confirm_button(resolve);
                    }
                }
            });
        } else {
            resolve();
        }
    });
}

async function mute_participant(index) {
    await focus_participant(index);
    await mute_focused_participant();
}

async function mute_all_participants() {
    await open_people_panel();

    for (let i = 1; i < participants.length; i++) {
        await mute_participant(i);
        await (new Promise(function (resolve) {
            setInterval(resolve, 300);
        }));
    }
}
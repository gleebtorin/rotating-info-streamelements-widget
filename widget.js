let latest_follow;
let latest_cheer;
let latest_sub;

let elements = $(".elements")
let elementCount = elements.length;
let elementIndex = 0;

// INIT
$(elements).hide();

window.addEventListener('onWidgetLoad', function (obj) {
    let data=obj["detail"]["session"]["data"];
    let recents=obj["detail"]["recents"];
    let currency=obj["detail"]["currency"];
    let channelName=obj["detail"]["channel"]["username"];
    let apiToken=obj["detail"]["channel"]["apiToken"];
    let fieldData=obj["detail"]["fieldData"];

    latest_follow = data["follower-latest"];
    latest_cheer = data["cheer-latest"];
    latest_sub = data["subscriber-latest"];
    updateDisplay();
    showElement(elementIndex);
});

window.addEventListener('onEventReceived', function (obj) {
    let eventType = obj.detail.listener;
    let data = obj.detail.event;

    switch(eventType){
        case "follower-latest":
            latest_follow = data;
            break;
        case "cheer-latest":
            latest_cheer = data;
            break;
        case "subscriber-latest":
            latest_sub = data;
            break;
    }

    updateDisplay();
});

function updateDisplay() {
    // Update display contents
    $('#latestFollow').text("Follow: " + latest_follow["name"]);
    $('#latestCheer').text("Cheer: " + latest_cheer["name"] + " with " + latest_cheer["amount"] + " bits");
    $('#latestSub').text("Sub: " + latest_sub["name"] + " for " + latest_sub["amount"] + " months");
}

function showElement(i) {
    $(elements[i])
        .fadeIn(500)
        .delay(5000)
        .fadeOut(500)
        .queue(function () {
            elementIndex = (elementIndex + 1) % elementCount; // Loop back to 0 if we try to exceed count of elements
            showElement(elementIndex);
            $(this).dequeue();
        });
}
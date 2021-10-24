const link_name = window.location.pathname

function updateChart(data){
    const diff = ((new Date())-startTime)/1000;

    if (!(DEVICE_IDS.has(data.device_id))) {

        DEVICE_IDS.add(data.device_id)

        var underst = {
            data: [[diff,parseInt(data.understanding)]],
            label: data.device_id + " u",
            borderColor: "rgba(255, 0, 0, 0.1)"
        };
        var speed = {
            data: [[diff,parseInt(data.speed)]],
            label: data.device_id + " s",
            borderColor: "rgba(0, 255, 0, 0.1)"
        };
        var engage = {
            data: [[diff,parseInt(data.engagement)]],
            label: data.device_id + " e",
            borderColor: "rgba(0, 0, 255, 0.1)"
        };

        chart.data.datasets.push(underst);
        chart.data.datasets.push(engage);
        chart.data.datasets.push(speed);

    } else {

        const ui = chart.data.datasets.map(e => e.label).indexOf(data.device_id+" u")
        const ei = chart.data.datasets.map(e => e.label).indexOf(data.device_id+" e")
        const si = chart.data.datasets.map(e => e.label).indexOf(data.device_id+" s")
        chart.data.datasets[ui].data.push([diff, data.understanding])
        chart.data.datasets[ei].data.push([diff, data.engagement])
        chart.data.datasets[si].data.push([diff, data.speed])
    }
    sum_understanding = 0
    sum_engagement = 0
    sum_speed = 0

    chart.data.datasets.slice(3).forEach(element => {
        if (element.label.slice(-1)[0] == "u") {
            sum_understanding += parseInt(element.data.slice(-1)[0][1])
            console.log(element.data.slice(-1)[0])
        }
        else if (element.label.slice(-1)[0] == "e") {
            sum_engagement += parseInt(element.data.slice(-1)[0][1])
        }
        else {
            sum_speed += parseInt(element.data.slice(-1)[0][1])
        }
    });
    console.log(sum_understanding.typeof)
    console.log(DEVICE_IDS.size)
    chart.data.datasets[0].data.push([diff, sum_understanding/Math.max(1, DEVICE_IDS.size)])
    chart.data.datasets[1].data.push([diff, sum_engagement/Math.max(1, DEVICE_IDS.size)])
    chart.data.datasets[2].data.push([diff, sum_speed/Math.max(1, DEVICE_IDS.size)])

    output1.innerHTML = sum_understanding/Math.max(1, DEVICE_IDS.size)
    output2.innerHTML = sum_engagement/Math.max(1, DEVICE_IDS.size)
    output3.innerHTML = sum_speed/Math.max(1, DEVICE_IDS.size)
    
}

var output1 = document.getElementById("uval");
var output2 = document.getElementById("sval");
var output3 = document.getElementById("eval");

understanding_emojis= [
    "💎",
    "🧠",
    "✅",
    "😎",
    "😐",
    "😕",
    "😒",
    "❓",
    "😡"
    ]
    engagement_emojis= [
        "💎",
        "🧠",
        "✅",
        "😎",
        "😐",
        "😕",
        "😒",
        "❓",
        "😡"
    ] 
    speed_emojis= [
        "💎",
        "🧠",
        "✅",
        "😎",
        "😐",
        "😕",
        "😒",
        "❓",
        "😡"
    ]     

//refreshing stuff
var socket = io();
socket.on(link_name, (newInfo)=>{

    if (!(newInfo.notification=="")) {
        alert(newInfo.notification);
    }


    updateChart(newInfo)
    chart.update()    

        // Update the current slider value (each time you drag the slider handle)

    output1.innerHTML = understanding_emojis[Math.round(8-(newInfo.understanding*8/100))];
    output2.innerHTML = engagement_emojis[Math.round(8-(newInfo.engagement*8/100))];
    output3.innerHTML = speed_emojis[Math.round(8-(newInfo.speed*8/100))];


    //console.log(chart.data)
})

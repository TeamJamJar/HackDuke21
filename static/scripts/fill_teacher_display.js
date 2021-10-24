const link_name = window.location.pathname

function updateChart(data){

    if (!(DEVICE_IDS.has(data.device_id))) {

        DEVICE_IDS.add(data.device_id)

        var underst = {
            x: ((new Date())-startTime)/1000,
            y: data.understanding,
            label: data.device_id + " u"
        };
        var speed = {
            x: ((new Date())-startTime)/1000,
            y: data.speed,
            label: data.device_id + " s"
        };
        var engage = {
            x: ((new Date())-startTime)/1000,
            y: data.engagement,
            label: data.device_id + " e"
        };

        chart.data.datasets.push(underst);
        chart.data.datasets.push(engage);
        chart.data.datasets.push(speed);

    } else {

        const ui = chart.data.datasets.map(e => e.label).indexOf(data.device_id+" u")
        const ei = chart.data.datasets.map(e => e.label).indexOf(data.device_id+" e")
        const si = chart.data.datasets.map(e => e.label).indexOf(data.device_id+" s")

        chart.data.datasets[ui].data.push([((new Date())-startTime)/1000, data.understanding])
        chart.data.datasets[ei].data.push([((new Date())-startTime)/1000, data.engagement])
        chart.data.datasets[si].data.push([((new Date())-startTime)/1000, data.speed])
    }

    chart.update();
    //console.log(chart.data.datasets)
}
//refreshing stuff
var socket = io();
socket.on(link_name, (newInfo)=>{
    console.log("updating")
    updateChart(newInfo)
})
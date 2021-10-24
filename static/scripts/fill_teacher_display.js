const link_name = window.location.pathname

function updateChart(data){
    console.log(DEVICE_IDS);
    const diff = ((new Date())-startTime)/1000;

    if (!(DEVICE_IDS.has(data.device_id))) {

        DEVICE_IDS.add(data.device_id)

        var underst = {
            x: diff,
            y: data.understanding,
            label: data.device_id + " u",
            borderColor: "rgba(255, 0, 0, 0.1)"
        };
        var speed = {
            x: diff,
            y: data.speed,
            label: data.device_id + " s",
            borderColor: "rgba(0, 255, 0, 0.1)"
        };
        var engage = {
            x: diff,
            y: data.engagement,
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
    console.log(chart.data.datasets)
    
}
//refreshing stuff
var socket = io();
socket.on(link_name, (newInfo)=>{
    console.log("new")
    updateChart(newInfo)
    chart.update()
})

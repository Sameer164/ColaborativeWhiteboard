let canvas = document.getElementById('canvas');
canvas.width = 0.9 * window.innerWidth
canvas.height = 0.9 * window.innerHeight

var io = io.connect("http://127.0.0.1:5000")
let context = canvas.getContext("2d");

let x;
let y;
let mouseDown = false;

window.onmousedown = (e) => {
    context.moveTo(x, y);
    io.emit("NotDraw", {x, y})
    mouseDown = true;
}

io.on("stop", ({ x, y }) => {
    context.moveTo(x, y);

})

window.onmouseup = (e) => {
    mouseDown = false;
}

io.on("ondraw", ({ x, y }) => {
    console.log("Reeceived and drawing");
    context.lineTo(x, y);
    context.stroke();
});

window.onmousemove = (e) => {
    x = e.clientX;
    y = e.clientY;
    console.log(x, y);

    if (mouseDown){
        io.emit("draw", { x, y })
        context.lineTo(x, y);
        context.stroke();
    }



}
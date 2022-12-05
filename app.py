from flask import Flask, render_template
from flask_socketio import SocketIO, emit
app = Flask(__name__)
socketio = SocketIO(app)


@app.route('/')
def index():
    return render_template('index.html')


@socketio.on('connect')
def test_connect():
    print("User has connected")

@socketio.on("draw")
def handle_pos(data):
    print("Received x y")
    emit("ondraw", {"x": data["x"], "y": data["y"]}, broadcast = True, include_self=False)

@socketio.on("NotDraw")
def handle_stop(data):
    print("Received x y")
    emit("stop", {"x": data["x"], "y": data["y"]}, broadcast = True, include_self=False)

if __name__ == '__main__':
    socketio.run(app)
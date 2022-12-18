let id = location.hash;
id = id.split('#')[1];
console.log(id);

const peer = new Peer(id, {
  host: '/',
  port: '3001',
});

const videoElement = document.getElementById('vid');
///////////Text//////////////////

// const conn = peer.connect('2');

// conn.on('open', function () {
//   conn.send(`hi from peer1`);
// });

// peer.on('connection', function (conn) {
//   conn.on('data', function (data) {
//     console.log(data);
//   });

// });

////////////////Video////////////

//Call

// console.log(peer._id);
var getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;
getUserMedia(
  { video: true, audio: true },
  function (stream) {
    var call = peer.call('2', stream);
    call.on('stream', function (remoteStream) {
      // Show stream in some video/canvas element.
    });
  },
  function (err) {
    console.log('Failed to get local stream', err);
  }
);

//Answer

// var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
peer.on('call', function (call) {
  getUserMedia(
    { video: true, audio: true },
    function (stream) {
      call.answer(stream); // Answer the call with an A/V stream.
      call.on('stream', function (remoteStream) {
        // Show stream in some video/canvas element.
        videoElement.srcObject = remoteStream;
        videoElement.play();
      });
    },
    function (err) {
      console.log('Failed to get local stream', err);
    }
  );
});

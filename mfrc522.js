module.exports = function (RED) {

    var spawn = require('child_process').spawn;

    var mfrc522Command = __dirname + '/mfrc522';

    process.env.PYTHONBUFFERED = 1;

    function mfrc522Node(config) {
        RED.nodes.createNode(this, config);

        this.blockedFor = config.blockedFor;

        var node = this;

        node.child = spawn(mfrc522Command, [node.blockedFor]);

        node.child.stdout.on('data', function (data) {
            // example data = "123456 text"
            var data = data.toString().split(' ');
            var msg = {
                uuid: data[0],
                text: data[1]
            };
            node.send(
                {
                    payload: msg
                }
            );

        });

        node.child.stderr.on('data', function (data) {
            node.error(data.toString());
        });

        node.child.on('close', function (code) {
            node.error('MFRC522 process exited with code ' + code);
        });

        node.on('close', function () {
            node.child.kill('SIGKILL');
        });
    }

    RED.nodes.registerType('mfrc522-reader', mfrc522Node);

}

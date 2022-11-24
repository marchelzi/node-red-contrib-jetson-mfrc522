module.exports = function (RED) {

    const spawn = require('child_process').spawn;

    const python3 = 'python3';
    const mfrc522Script = __dirname + '/mfrc522.py';

    process.env.PYTHONBUFFERED = 1;

    function mfrc522Node(config) {
        RED.nodes.createNode(this, config);

        this.blockedFor = config.blockedFor;

        const node = this;

        node.child = spawn(python3, [mfrc522Script, node.blockedFor]);


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

        node.child.on('close', function (code, signal) {
            node.error('MFRC522 process exited with code ' + code + ' and signal ' + signal);
        });

        node.on('close', function () {
            node.child.kill('SIGKILL');
        });


    }

    RED.nodes.registerType('mfrc522-reader', mfrc522Node);

}

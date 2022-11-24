module.export = function (RED) {

    var execSync = require('child_process').execSync;
    var exec = require('child_process').exec;
    var spawn = require('child_process').spawn;

    var mfrc522Command = __dirname + '/mfrc522';

    process.env.PYTHONBUFFERED = 1;

    function MFRC522Node(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        var child = spawn(mfrc522Command);

        child.stdout.on('data', function (data) {
            // example data = "{uuid: 12345678, text: MIFARE_1K}"
            var data = JSON.parse(data);
            node.send(data);

        });

        child.stderr.on('data', function (data) {
            node.error(data.toString());
        });

        child.on('close', function (code) {
            node.error('MFRC522 process exited with code ' + code);
        });

        node.on('close', function () {
            child.kill();
        });
    }

    RED.nodes.registerType('mfrc522-reader', MFRC522Node);

}

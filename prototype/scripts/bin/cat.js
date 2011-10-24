window.system = window.system || {};
system.bin = system.bin || {};

system.bin.cat = {
    help: function() {
        return "Echo file contents to stdout\n\n  Usage: cat [filepath]";
    },

    exec: function(args) {
        var stdin  = (this.fd && this.fd.length > 0) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

        try {
            var path = (args instanceof Array) ? args.shift() : args;
            path = (path.match(/^\//)) ? path : system.env.cwd + '/' + path;

            var buf = system.fs.readFile(path);

            if (buf) {
                if (stdout) stdout.write(buf);

            } else {
                if (stdout) stdout.write('file "' +  path + '" not found');
            }

        } catch(e) {
            console.log('command exception:');
            console.dir(e);
        }
    }
};

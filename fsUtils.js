const fs = require('fs');

const READ_FILE_FUNCTION = Object.freeze({
	data: readFile,
	lines: readLinesFromFile,
});


function readFile(filename, callback) {
	fs.readFile(filename, 'utf8', (err, data) => {
		if (err) throw err;

		callback(data);
	});
}


function readLinesFromFile(filename, callback) {
	readFile(filename, data => callback(data.split('\r\n')));
}

class File {
	constructor(filename, encoding='utf8') {
		this.filename = filename;
		this.encoding = encoding;
		this.contents = undefined;
	}
	
	data() {
		try {
			this.contents = fs.readFileSync(this.filename, this.encoding);
		} catch (err) {
			throw new Error(err);
		}
			
		return this.contents;
	}
	
	lines() {
		if (this.contents === undefined)
			this.data();
			
		return this.contents.split('\r\n');
	}
}

module.exports = File;

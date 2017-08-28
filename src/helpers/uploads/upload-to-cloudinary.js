const cl_client = require('cloudinary').v2;
const _ = require('lodash');

const config = require('smart-config').get('cloudinary');

module.exports = async ({ input }) => {
	return uploadMany(cl_client(), input, config.bucketName);
};

function upload() {
	return new Promise((resolve, reject) => {

	});
}


function uploadMany(client, files, bucket) {
	if (!_.isArray(files)) {
		files = [files];
	}
	return upload(client, files, bucket);
}

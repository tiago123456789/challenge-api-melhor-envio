import * as fs from "fs";
import * as AWS from "aws-sdk";

class S3Storage {

    constructor() {
        this._s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });
    }

    store(filepath, filename) {
        const readStream = fs.createReadStream(filepath);
        const params = {
            ACL: 'public-read',
            Bucket: process.env.AWS_BUCKET,
            Key: filename,
            Body: readStream,
        };

        return new Promise((resolve, reject) => {
            this._s3.putObject(params, function (err, data) {
                readStream.destroy();
                if (err) {
                    return reject(err);
                }

                return resolve({ ...data, urlPublic: `${process.env.BUCKET_URL_PUBLIC}${filename}` });
            });
        });
    }
}

export default S3Storage;



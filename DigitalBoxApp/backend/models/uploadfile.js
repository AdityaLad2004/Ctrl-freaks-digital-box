const express = require('express');
const multer = require('multer');
const aws = require('aws-sdk');
const router = express.Router();

// Configure AWS
aws.config.update({
  accessKeyId: 'AKIATCKAT4L24XSW6A6S',
  secretAccessKey: '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',
  region: 'ap-south-1'
});
const s3 = new aws.S3();

// Configure multer to use memory storage
const upload = multer();

// Define file upload route
router.post('/', upload.single('file'), (req, res) => {
  const file = req.file; // Access the uploaded file

  // Upload file to S3
  const params = {
    Bucket: 'document-basket',
    Key: `docs/${Date.now()}.pdf`, // Generate a unique key with timestamp
    Body: file.buffer // Use file.buffer to access file contents when using memory storage
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error('Error uploading file:', err);
      res.status(500).send('Error uploading file to S3');
    } else {
      console.log('File uploaded successfully:', data.Location);
      res.status(200).send('File uploaded successfully');
    }
  });
});

module.exports = router;

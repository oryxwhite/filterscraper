const fs = require('fs');
const path = require('path');
const axios = require('axios').default;

const downloadFile = async (fileUrl, downloadFolder) => {
    // Get the file name
    const fileName = path.basename(fileUrl);
  
    // The path of the downloaded file on our machine
    const localFilePath = path.resolve(__dirname, downloadFolder, fileName);
    try {
      const response = await axios({
        method: 'GET',
        url: fileUrl,
        responseType: 'stream',
      });
  
      const w = response.data.pipe(fs.createWriteStream(localFilePath));
      w.on('finish', () => {
        console.log('Successfully downloaded file!');
      });
    } catch (err) { 
      throw new Error(err);
    }
  }; 

  downloadFile('https://filtermag.org/wp-content/uploads/2021/03/2480691989_54cce77efc_b-e1614811744220-376x250.jpg', 'images')
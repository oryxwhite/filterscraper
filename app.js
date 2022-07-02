const axios = require("axios")
const cheerio = require('cheerio')
const pretty = require('pretty')
const fs = require('fs')
const path = require('path');



const url1 = 'https://filtermag.org/author/sessi/'

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

async function getPostTitles(url) {
    const allPosts = []
    const images = []
    let i = 1
    while(i <= 22) {
        let url = `${url1}page/${i}`
        try{
            const { data } = await axios.get(url)
            const $ = cheerio.load(data)
            const listItems = $('#df-content-render')
            const articles = listItems.children()
            
            articles.each((idx, el) => {
                const title = { postTitle: '', lede: '', imageSource: '' }
                title.postTitle = $(el).children('h4').text()
                title.imageSource = $(el).children('.article-img-wrap').children('a').children('img').attr('src')
                title.lede = $(el).children('p').text()
                if (title.postTitle == '') {
                    return
                } else {
                    allPosts.push(title)
                    if (title.imageSource !== undefined) {images.push(title.imageSource)}
                }
            })

        } catch(err) {
            console.log(err)
            }

        i++

        }
        // fs.writeFile('filterPostData.json', JSON.stringify(allPosts, null, 2), (err) => {
        //     if (err) {
        //         console.log(err);
        //         return;
        //     }
        // })
        // console.log(images)
        images.forEach((image) => {
            downloadFile(image, 'images')

        
        })
        // console.log( allPosts )
}


getPostTitles()

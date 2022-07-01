const axios = require("axios")
const cheerio = require('cheerio')
const pretty = require('pretty')
const fs = require('fs')

const url1 = 'https://filtermag.org/author/sessi/'

async function getPostTitles(url) {
    const allPosts = []
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
                allPosts.push(title)
            })

        } catch(err) {
            console.log(err)
            }

        i++
        
        }
        fs.writeFile('filterPostData.json', JSON.stringify(allPosts, null, 2), (err) => {
            if (err) {
                console.log(err);
                return;
            }
})
}


getPostTitles()
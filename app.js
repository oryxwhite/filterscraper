const axios = require("axios")
const cheerio = require('cheerio')
const pretty = require('pretty')
const fs = require('fs')

const url = 'https://filtermag.org/author/sessi/'

async function getPostTitles() {
    try{
        const { data } = await axios.get(url)
        const $ = cheerio.load(data)
        const listItems = $('#df-content-render')
        const articles = listItems.children()
        const titles = []
        listItems.each((idx, el) => {
            const title = { name: '' }
            title.name = $(el).children('h4').text()
            titles.push(title)
        })

        console.log(titles)




    } catch(err) {

    }
}
getPostTitles()
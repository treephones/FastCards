//requirements
const { default: axios } = require("axios");
const cheerio = require('cheerio');

const mURL = 'https://www.cram.com';

async function getHTML(url) {
    const res = await axios.get(url);
    return cheerio.load(res.data);
}

async function getQueryFlashcardsURL(query) {
    const invalids = ['/flashcards/create', '/flashcards/apps'];
    let url = `${mURL}/search?query=${query}`;
    try {
        const $ = await getHTML(url);
        let links = [];
        $('a').each((idx, elem) => {
            let link = $(elem).attr('href');
            if(/^\/flashcards\/.+$/.test(link) && !invalids.includes(link)) {links.push(link);}
        });
        return links;
    }
    catch(e) {
        console.log("Something went wrong when fetching QUERY webpage!");
        throw e;
    }
}

async function getFlashcards(links, max) {
    if(links.length == 0) {
        return {from_url: null, number_of_flashcards: 0, flashcards: []};
    }
    let url = `${mURL}${links[Math.floor(Math.random()*links.length)]}`;
    let flashcards = [];
    try {
        const $ = await getHTML(url);
        let inSet = parseInt($('body > div.body > div.content-type1.study_content > div.main-content > div.flashCardsListing > h3').text().split()[0]);
        for(var i = 0; i < Math.min(inSet, max); ++i) {
            let flashcard = $(`#row${i+1}`).text().trim().split("\n")
                            .filter(elem => /[a-zA-Z]/.test(elem))
                            .map(elem => elem.trim());
            flashcards.push({question: flashcard[0], answer: flashcard[1]});
        }
        return {from_url: url, number_of_flashcards: flashcards.length, flashcards: flashcards};
    }
    catch(e) {
        console.log("Something went wrong when fetching FLASHCARDS webpage!");
        throw e;
    }
}

async function getFlashcardResponse(query, max) {
    let links = await getQueryFlashcardsURL(query);
    let res = await getFlashcards(links, max);
    return res;
}

exports.getFlashcardResponse = getFlashcardResponse;
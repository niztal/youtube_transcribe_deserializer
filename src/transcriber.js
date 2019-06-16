const axios = require('axios');
var parseString = require('xml2js').parseString;

const transcribe = async (videoUrl) => {
    let words = [];
    const response = await axios.get(videoUrl);
    parseString(response.data, (err, result) => {
        const {transcript} = result;
        const {text} = transcript;
        text.forEach(sentence => {
            const {start} = sentence.$;
            sentence._.split(" ").forEach((w) => {
                words.push({
                    start,
                    value: w.toLowerCase()
                });
            });
        });
    });
    return words;
}

module.exports = transcribe;


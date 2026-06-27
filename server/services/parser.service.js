const fs = require("fs");
const pdf = require("pdf-parse");
const mammoth = require("mammoth");

async function extractText(filePath){

    if(filePath.endsWith(".pdf")){
        const data = await pdf(fs.readFileSync(filePath));
        return data.text;
    }

    if(filePath.endsWith(".docx")){
        const data = await mammoth.extractRawText({path:filePath});
        return data.value;
    }

    return "";
}

module.exports={extractText};

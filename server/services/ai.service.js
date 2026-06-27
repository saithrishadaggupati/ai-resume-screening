const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeResume(resumeText,jobDescription){

const model=genAI.getGenerativeModel({
model:"gemini-2.5-flash"
});

const prompt=`
You are an ATS engine.

Return ONLY valid JSON.

{
"name":"",
"email":"",
"phone":"",
"skills":[],
"experience":"",
"education":[],
"summary":"",
"compatibilityScore":0,
"strengths":[],
"weaknesses":[],
"interviewQuestions":[]
}

Job Description:

${jobDescription}

Resume:

${resumeText}
`;

const result=await model.generateContent(prompt);

return result.response.text();

}

module.exports={analyzeResume};

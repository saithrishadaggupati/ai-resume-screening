function normalize(text){
    return (text || "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g,"");
}

function isMatch(jobSkill,resumeSkill){

    const a = normalize(jobSkill);
    const b = normalize(resumeSkill);

    return (
        a === b ||
        a.includes(b) ||
        b.includes(a)
    );

}

function compareSkills(jobSkills,resumeSkills){

    const matched = [];
    const missing = [];

    for(const jobSkill of jobSkills){

        const found = resumeSkills.find(resumeSkill =>
            isMatch(jobSkill,resumeSkill)
        );

        if(found){
            matched.push(jobSkill);
        }else{
            missing.push(jobSkill);
        }

    }

    const percentage = jobSkills.length === 0
        ? 0
        : Math.round((matched.length / jobSkills.length) * 100);

    return {
        matched,
        missing,
        percentage
    };

}

module.exports = {
    compareSkills
};

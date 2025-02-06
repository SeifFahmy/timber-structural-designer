import { TeddsData } from "./useTeddsStore";

const useAnalyseResults = (results: TeddsData[]) => {
    let maxUtil = Number.NEGATIVE_INFINITY;
    let designStatus = "PASS";
    let maxDepth = Number.NEGATIVE_INFINITY;
    let maxSection = "";
    let material = "";

    let barSections: Record<string, number[]> = {};

    results.forEach((member) => {
        if (member.util > maxUtil) {
            maxUtil = member.util;
        }
        if (member.result === "FAIL") {
            designStatus = "FAIL";
        }

        const memberSection = member.section;
        const memberDepth = Number(memberSection.split("x")[1]);
        if (memberDepth > maxDepth) {
            maxDepth = memberDepth;
            maxSection = memberSection;
        }

        if (!barSections[memberSection]) {
            barSections[memberSection] = [member.id];
        } else {
            barSections[memberSection].push(member.id);
        }
    });

    if (results.length > 0) {
        material = results[0].material;
    }

    const overview = [
        { title: "Max utilisation", content: maxUtil },
        { title: "Design status", content: designStatus },
        { title: "Material", content: material },
        { title: "Max section", content: maxSection },
    ];

    return {
        overview: overview,
        barSections: barSections,
    };
};

export default useAnalyseResults;

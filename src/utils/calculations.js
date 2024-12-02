const SCORE_WEIGHTS = {
    buildingYear: {
        'Voor 1945': 5,
        '1945-1975': 10,
        '1976-1990': 15,
        '1991-2000': 20,
        '2001-2010': 25,
        'Na 2010': 30
    },
    buildingType: {
        'Vrijstaand': 5,
        'Twee-onder-een-kap': 10,
        'Rijtjeshuis': 15,
        'Appartement': 20
    },
    glassType: {
        'Enkel glas': 0,
        'Dubbel glas': 10,
        'HR++ glas': 15,
        'Triple glas': 20
    },
    roofInsulation: {
        'Geen': 0,
        'Matig (Rc < 2,5)': 10,
        'Goed (Rc ≥ 2,5)': 20
    },
    wallInsulation: {
        'Geen': 0,
        'Matig (Rc < 2,5)': 10,
        'Goed (Rc ≥ 2,5)': 20
    },
    floorInsulation: {
        'Nee': 0,
        'Ja': 15
    },
    heatingSystem: {
        'Moederhaard / Gaskachel': 0,
        'Elektrisch': 5,
        'CV-ketel': 10,
        'Stadsverwarming': 20,
        'Warmtepomp': 30
    },
    heatingEfficiency: {
        'Oud (HR < 85%)': 5,
        'Modern (HR ≥ 85%)': 10,
        'Hoog (HR ≥ 95%)': 20
    },
    solarPanels: {
        'Nee': 0,
        'Ja, 1-3 panelen': 10,
        'Ja, 4-6 panelen': 20,
        'Ja, 7-10 panelen': 25,
        'Ja, meer dan 10 panelen': 30
    },
    waterHeating: {
        'CV-ketel': 5,
        'Elektrische boiler': 10,
        'Zonneboiler': 20,
        'Warmtepompboiler': 20
    },
    cooling: {
        'Nee': 0,
        'Ja': -5
    },
    heatingAge: {
        '< 5 jaar': 15,
        '5-10 jaar': 10,
        '> 10 jaar': 5
    },
    ventilation: {
        'Natuurlijke ventilatie': 0,
        'Mechanische afvoer': 10,
        'Balansventilatie (WTW)': 20
    },
    smartEnergy: {
        'Nee': 0,
        'Ja': 10
    },
    additionalSystems: {
        'Mechanische ventilatie': 5,
        'Balansventilatie (WTW)': 10,
        'Zonneboiler': 15,
        'Warmteterugwinning (WTW)': 10,
        'Domoticasysteem': 10,
        'Slimme thermostaat': 10,
        'Geen': 0
    }
};

export function calculateLabel(formData) {
    let totalScore = 0;

    // Calculate individual scores
    const calculations = {
        buildingYear: SCORE_WEIGHTS.buildingYear[formData.buildingYear] || 0,
        buildingType: SCORE_WEIGHTS.buildingType[formData.buildingType] || 0,
        glassType: SCORE_WEIGHTS.glassType[formData.glassType] || 0,
        roofInsulation: SCORE_WEIGHTS.roofInsulation[formData.roofInsulation] || 0,
        wallInsulation: SCORE_WEIGHTS.wallInsulation[formData.wallInsulation] || 0,
        floorInsulation: SCORE_WEIGHTS.floorInsulation[formData.floorInsulation] || 0,
        heatingSystem: SCORE_WEIGHTS.heatingSystem[formData.heatingSystem] || 0,
        heatingEfficiency: SCORE_WEIGHTS.heatingEfficiency[formData.heatingEfficiency] || 0,
        solarPanels: SCORE_WEIGHTS.solarPanels[formData.solarPanels] || 0,
        waterHeating: SCORE_WEIGHTS.waterHeating[formData.waterHeating] || 0,
        cooling: SCORE_WEIGHTS.cooling[formData.cooling] || 0,
        heatingAge: SCORE_WEIGHTS.heatingAge[formData.heatingAge] || 0,
        ventilation: SCORE_WEIGHTS.ventilation[formData.ventilation] || 0,
        smartEnergy: SCORE_WEIGHTS.smartEnergy[formData.smartEnergy] || 0
    };

    // Add up all individual scores
    Object.values(calculations).forEach(score => {
        totalScore += score;
    });

    // Add scores for additional systems
    if (Array.isArray(formData.additionalSystems)) {
        formData.additionalSystems.forEach(system => {
            totalScore += SCORE_WEIGHTS.additionalSystems[system] || 0;
        });
    }

    // Determine label based on total score
    let label;
    if (totalScore >= 240) label = 'A++';
    else if (totalScore >= 200) label = 'A+';
    else if (totalScore >= 160) label = 'A';
    else if (totalScore >= 120) label = 'B';
    else if (totalScore >= 80) label = 'C';
    else if (totalScore >= 40) label = 'D';
    else if (totalScore >= 20) label = 'E';
    else if (totalScore >= 10) label = 'F';
    else label = 'G';

    return {
        label,
        score: totalScore,
        calculations
    };
} 
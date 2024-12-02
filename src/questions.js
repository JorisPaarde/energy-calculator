// questions.js
export const QUESTIONS = [
    {
        id: 1,
        question: "Wat is het bouwjaar van de woning?",
        type: "dropdown",
        options: [
            "Voor 1945",
            "1945-1975",
            "1976-1990",
            "1991-2000",
            "2001-2010",
            "Na 2010"
        ]
    },
    {
        id: 2,
        question: "Wat is het type woning?",
        type: "dropdown",
        options: [
            "Vrijstaand",
            "Twee-onder-een-kap",
            "Rijtjeshuis",
            "Appartement"
        ]
    },
    {
        id: 3,
        question: "Hoeveel m² bedraagt de woonoppervlakte?",
        type: "number",
        placeholder: "Vul het aantal m² in"
    },
    {
        id: 4,
        question: "Wat voor type beglazing heeft de woning?",
        type: "dropdown",
        options: [
            "Enkel glas",
            "Dubbel glas",
            "HR++ glas",
            "Triple glas"
        ]
    },
    {
        id: 5,
        question: "Wat is het type dakisolatie?",
        type: "dropdown",
        options: [
            "Geen",
            "Matig (Rc < 2,5)",
            "Goed (Rc ≥ 2,5)"
        ]
    },
    {
        id: 6,
        question: "Wat is het type gevelisolatie?",
        type: "dropdown",
        options: [
            "Geen",
            "Matig (Rc < 2,5)",
            "Goed (Rc ≥ 2,5)"
        ]
    },
    {
        id: 7,
        question: "Is er vloerisolatie aanwezig?",
        type: "radio",
        options: ["Ja", "Nee"]
    },
    {
        id: 8,
        question: "Wat voor soort verwarmingssysteem wordt gebruikt?",
        type: "dropdown",
        options: [
            "CV-ketel",
            "Warmtepomp",
            "Stadsverwarming",
            "Elektrisch",
            "Moederhaard / Gaskachel"
        ]
    },
    {
        id: 9,
        question: "Wat is het rendement van de verwarmingsinstallatie?",
        type: "dropdown",
        options: [
            "Oud (HR < 85%)",
            "Modern (HR ≥ 85%)",
            "Hoog (HR ≥ 95%)"
        ]
    },
    {
        id: 10,
        question: "Welke aanvullende energiesystemen zijn aanwezig?",
        type: "multiselect",
        options: [
            "Mechanische ventilatie",
            "Balansventilatie (WTW)",
            "Zonneboiler",
            "Warmteterugwinning (WTW)",
            "Domoticasysteem",
            "Slimme thermostaat",
            "Geen"
        ]
    },
    {
        id: 11,
        question: "Zijn er zonnepanelen aanwezig?",
        type: "dropdown",
        options: [
            "Nee",
            "Ja, 1-3 panelen",
            "Ja, 4-6 panelen",
            "Ja, 7-10 panelen",
            "Ja, meer dan 10 panelen",
        ]
    },
    {
        id: 12,
        question: "Hoe wordt warm tapwater opgewekt?",
        type: "dropdown",
        options: [
            "CV-ketel",
            "Elektrische boiler",
            "Zonneboiler",
            "Warmtepompboiler"
        ]
    },
    {
        id: 12,
        question: "Is er een koelinstallatie aanwezig?",
        type: "radio",
        options: ["Ja", "Nee"]
    },
    {
        id: 13,
        question: "Hoe oud is de huidige verwarmingsinstallatie?",
        type: "dropdown",
        options: [
            "< 5 jaar",
            "5-10 jaar",
            "> 10 jaar"
        ]
    },
    {
        id: 14,
        question: "Wat is het type ventilatiesysteem?",
        type: "dropdown",
        options: [
            "Natuurlijke ventilatie",
            "Mechanische afvoer",
            "Balansventilatie (WTW)"
        ]
    },
    {
        id: 15,
        question: "Wordt er gebruikgemaakt van slimme energiemanagementsystemen?",
        type: "radio",
        options: ["Ja", "Nee"]
    }
];
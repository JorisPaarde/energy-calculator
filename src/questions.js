// questions.js
export const QUESTIONS = [
    {
        id: 1,
        label: "Wat is het bouwjaar van de woning?",
        type: "dropdown",
        options: [
            { label: "Voor 1945", value: "voor_1945" },
            { label: "1945-1975", value: "1945_1975" },
            { label: "1976-1990", value: "1976_1990" },
            { label: "1991-2000", value: "1991_2000" },
            { label: "2001-2010", value: "2001_2010" },
            { label: "Na 2010", value: "na_2010" }
        ]
    },
    {
        id: 2,
        label: "Wat is het type woning?",
        type: "dropdown",
        options: [
            { label: "Vrijstaand", value: "vrijstaand" },
            { label: "Twee-onder-een-kap", value: "twee_onder_een_kap" },
            { label: "Rijtjeshuis", value: "rijtjeshuis" },
            { label: "Appartement", value: "appartement" }
        ]
    },
    {
        id: 3,
        label: "Hoeveel m² bedraagt de woonoppervlakte?",
        type: "number",
        placeholder: "Vul het aantal m² in"
    },
    {
        id: 4,
        label: "Wat voor type beglazing heeft de woning?",
        type: "dropdown",
        options: [
            { label: "Enkel glas", value: "enkel_glas" },
            { label: "Dubbel glas", value: "dubbel_glas" },
            { label: "HR++ glas", value: "hr_plus_plus" },
            { label: "Triple glas", value: "triple_glas" }
        ]
    },
    {
        id: 5,
        label: "Wat is het type dakisolatie?",
        type: "dropdown",
        options: [
            { label: "Geen", value: "geen" },
            { label: "Matig (Rc < 2,5)", value: "matig" },
            { label: "Goed (Rc ≥ 2,5)", value: "goed" }
        ]
    },
    {
        id: 6,
        label: "Wat is het type gevelisolatie?",
        type: "dropdown",
        options: [
            { label: "Geen", value: "geen" },
            { label: "Matig (Rc < 2,5)", value: "matig" },
            { label: "Goed (Rc ≥ 2,5)", value: "goed" }
        ]
    },
    {
        id: 7,
        label: "Is er vloerisolatie aanwezig?",
        type: "radio",
        options: [
            { label: "Ja", value: "ja" },
            { label: "Nee", value: "nee" }
        ]
    },
    {
        id: 8,
        label: "Wat voor soort verwarmingssysteem wordt gebruikt?",
        type: "dropdown",
        options: [
            { label: "CV-ketel", value: "cv_ketel" },
            { label: "Warmtepomp", value: "warmtepomp" },
            { label: "Stadsverwarming", value: "stadsverwarming" },
            { label: "Elektrisch", value: "elektrisch" },
            { label: "Moederhaard / Gaskachel", value: "moederhaard" }
        ]
    },
    {
        id: 9,
        label: "Wat is het rendement van de verwarmingsinstallatie?",
        type: "dropdown",
        options: [
            { label: "Oud (HR < 85%)", value: "oud" },
            { label: "Modern (HR ≥ 85%)", value: "modern" },
            { label: "Hoog (HR ≥ 95%)", value: "hoog" }
        ]
    },
    {
        id: 10,
        label: "Welke aanvullende energiesystemen zijn aanwezig?",
        type: "multiselect",
        options: [
            { label: "Mechanische ventilatie", value: "mechanische_ventilatie" },
            { label: "Balansventilatie (WTW)", value: "balansventilatie" },
            { label: "Zonneboiler", value: "zonneboiler" },
            { label: "Warmteterugwinning (WTW)", value: "warmteterugwinning" },
            { label: "Domoticasysteem", value: "domotica" },
            { label: "Slimme thermostaat", value: "slimme_thermostaat" },
            { label: "Geen", value: "geen" }
        ]
    },
    {
        id: 11,
        label: "Zijn er zonnepanelen aanwezig?",
        type: "dropdown",
        options: [
            { label: "Nee", value: "nee" },
            { label: "Ja, 1-3 panelen", value: "1_3" },
            { label: "Ja, 4-6 panelen", value: "4_6" },
            { label: "Ja, 7-10 panelen", value: "7_10" },
            { label: "Ja, meer dan 10 panelen", value: "10_plus" }
        ]
    },
    {
        id: 12,
        label: "Hoe wordt warm tapwater opgewekt?",
        type: "dropdown",
        options: [
            { label: "CV-ketel", value: "cv_ketel" },
            { label: "Elektrische boiler", value: "elektrische_boiler" },
            { label: "Zonneboiler", value: "zonneboiler" },
            { label: "Warmtepompboiler", value: "warmtepompboiler" }
        ]
    },
    {
        id: 13,
        label: "Is er een koelinstallatie aanwezig?",
        type: "radio",
        options: [
            { label: "Ja", value: "ja" },
            { label: "Nee", value: "nee" }
        ]
    },
    {
        id: 14,
        label: "Hoe oud is de huidige verwarmingsinstallatie?",
        type: "dropdown",
        options: [
            { label: "< 5 jaar", value: "minder_dan_5" },
            { label: "5-10 jaar", value: "5_10" },
            { label: "> 10 jaar", value: "meer_dan_10" }
        ]
    },
    {
        id: 15,
        label: "Wat is het type ventilatiesysteem?",
        type: "dropdown",
        options: [
            { label: "Natuurlijke ventilatie", value: "natuurlijk" },
            { label: "Mechanische afvoer", value: "mechanisch" },
            { label: "Balansventilatie (WTW)", value: "balans" }
        ]
    },
    {
        id: 16,
        label: "Wordt er gebruikgemaakt van slimme energiemanagementsystemen?",
        type: "radio",
        options: [
            { label: "Ja", value: "ja" },
            { label: "Nee", value: "nee" }
        ]
    }
];
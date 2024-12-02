export const QUESTIONS = [
    {
        id: 1,
        label: "Wat is het bouwjaar van de woning?",
        type: "dropdown",
        options: [
            { value: "Voor 1945", label: "Voor 1945" },
            { value: "1945-1975", label: "1945-1975" },
            { value: "1976-1990", label: "1976-1990" },
            { value: "1991-2000", label: "1991-2000" },
            { value: "2001-2010", label: "2001-2010" },
            { value: "Na 2010", label: "Na 2010" }
        ]
    },
    {
        id: 2,
        label: "Wat is het type woning?",
        type: "dropdown",
        options: [
            { value: "Vrijstaand", label: "Vrijstaand" },
            { value: "Twee-onder-een-kap", label: "Twee-onder-een-kap" },
            { value: "Rijtjeshuis", label: "Rijtjeshuis" },
            { value: "Appartement", label: "Appartement" }
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
            { value: "Enkel glas", label: "Enkel glas" },
            { value: "Dubbel glas", label: "Dubbel glas" },
            { value: "HR++ glas", label: "HR++ glas" },
            { value: "Triple glas", label: "Triple glas" }
        ]
    },
    {
        id: 5,
        label: "Wat is het type dakisolatie?",
        type: "dropdown",
        options: [
            { value: "Geen", label: "Geen" },
            { value: "Matig (Rc < 2,5)", label: "Matig (Rc < 2,5)" },
            { value: "Goed (Rc ≥ 2,5)", label: "Goed (Rc ≥ 2,5)" }
        ]
    },
    {
        id: 6,
        label: "Wat is het type gevelisolatie?",
        type: "dropdown",
        options: [
            { value: "Geen", label: "Geen" },
            { value: "Matig (Rc < 2,5)", label: "Matig (Rc < 2,5)" },
            { value: "Goed (Rc ≥ 2,5)", label: "Goed (Rc ≥ 2,5)" }
        ]
    },
    {
        id: 7,
        label: "Is er vloerisolatie aanwezig?",
        type: "radio",
        options: [
            { value: "Ja", label: "Ja" },
            { value: "Nee", label: "Nee" }
        ]
    },
    {
        id: 8,
        label: "Wat voor soort verwarmingssysteem wordt gebruikt?",
        type: "dropdown",
        options: [
            { value: "CV-ketel", label: "CV-ketel" },
            { value: "Warmtepomp", label: "Warmtepomp" },
            { value: "Stadsverwarming", label: "Stadsverwarming" },
            { value: "Elektrisch", label: "Elektrisch" },
            { value: "Moederhaard / Gaskachel", label: "Moederhaard / Gaskachel" }
        ]
    },
    {
        id: 9,
        label: "Wat is het rendement van de verwarmingsinstallatie?",
        type: "dropdown",
        options: [
            { value: "Oud (HR < 85%)", label: "Oud (HR < 85%)" },
            { value: "Modern (HR ≥ 85%)", label: "Modern (HR ≥ 85%)" },
            { value: "Hoog (HR ≥ 95%)", label: "Hoog (HR ≥ 95%)" }
        ]
    },
    {
        id: 10,
        label: "Welke aanvullende energiesystemen zijn aanwezig?",
        type: "multiselect",
        options: [
            { value: "Mechanische ventilatie", label: "Mechanische ventilatie" },
            { value: "Balansventilatie (WTW)", label: "Balansventilatie (WTW)" },
            { value: "Zonneboiler", label: "Zonneboiler" },
            { value: "Warmteterugwinning (WTW)", label: "Warmteterugwinning (WTW)" },
            { value: "Domoticasysteem", label: "Domoticasysteem" },
            { value: "Slimme thermostaat", label: "Slimme thermostaat" },
            { value: "Geen", label: "Geen" }
        ]
    },
    {
        id: 11,
        label: "Zijn er zonnepanelen aanwezig?",
        type: "dropdown",
        options: [
            { value: "Nee", label: "Nee" },
            { value: "Ja, 1-3 panelen", label: "Ja, 1-3 panelen" },
            { value: "Ja, 4-6 panelen", label: "Ja, 4-6 panelen" },
            { value: "Ja, 7-10 panelen", label: "Ja, 7-10 panelen" },
            { value: "Ja, meer dan 10 panelen", label: "Ja, meer dan 10 panelen" }
        ]
    },
    {
        id: 12,
        label: "Hoe wordt warm tapwater opgewekt?",
        type: "dropdown",
        options: [
            { value: "CV-ketel", label: "CV-ketel" },
            { value: "Elektrische boiler", label: "Elektrische boiler" },
            { value: "Zonneboiler", label: "Zonneboiler" },
            { value: "Warmtepompboiler", label: "Warmtepompboiler" }
        ]
    },
    {
        id: 13,
        label: "Is er een koelinstallatie aanwezig?",
        type: "radio",
        options: [
            { value: "Ja", label: "Ja" },
            { value: "Nee", label: "Nee" }
        ]
    },
    {
        id: 14,
        label: "Hoe oud is de huidige verwarmingsinstallatie?",
        type: "dropdown",
        options: [
            { value: "< 5 jaar", label: "< 5 jaar" },
            { value: "5-10 jaar", label: "5-10 jaar" },
            { value: "> 10 jaar", label: "> 10 jaar" }
        ]
    },
    {
        id: 15,
        label: "Wat is het type ventilatiesysteem?",
        type: "dropdown",
        options: [
            { value: "Natuurlijke ventilatie", label: "Natuurlijke ventilatie" },
            { value: "Mechanische afvoer", label: "Mechanische afvoer" },
            { value: "Balansventilatie (WTW)", label: "Balansventilatie (WTW)" }
        ]
    },
    {
        id: 16,
        label: "Wordt er gebruikgemaakt van slimme energiemanagementsystemen?",
        type: "radio",
        options: [
            { value: "Ja", label: "Ja" },
            { value: "Nee", label: "Nee" }
        ]
    }
]; 
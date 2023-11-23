export default [
    {
        id: 'machine-chest-press',
        germanName: 'Brustpresse',
        englishName: 'Chest Press',
        images: [
            {
                url: "https://modusx.de/wp-content/uploads/brustpresse-mittlere-brust.jpg",
                link: "https://modusx.de/fitness-uebungen/brustpresse/brustpresse-mit-fokus-auf-die-mittlere-brust/"
            },
            {
                url: "https://modusx.de/wp-content/uploads/brustpresse-mit-gewichtsscheiben.gif",
                link: "https://modusx.de/fitness-uebungen/brustpresse/brustpresse-mit-fokus-auf-die-mittlere-brust/"
            }
        ],
    },
    {
        id: 'machine-shoulder-press',
        germanName: 'Schulterdrücken',
        englishName: 'Shoulder Press',
        images: [
            {
                url: "https://modusx.de/wp-content/uploads/schulterdruecken-an-der-maschine.jpg",
                link: "https://modusx.de/fitness-uebungen/schulterdruecken-an-maschine/"
            },
            {
                url: "https://modusx.de/wp-content/uploads/schulterdruecken-maschine.gif",
                link: "https://modusx.de/fitness-uebungen/schulterdruecken-an-maschine/"
            }
        ],
    },
    {
        id: 'machine-seated-row',
        germanName: 'Rudern',
        englishName: 'Seated Row',
        images: [
            {
                url: "https://modusx.de/wp-content/uploads/kabelrudern-mit-breitem-griff.jpg",
                link: "https://modusx.de/fitness-uebungen/rudern-am-kabelzug-sitzend/kabelrudern-mit-breitem-griff/"
            },
            {
                url: "https://modusx.de/wp-content/uploads/kabelrudern-mit-breitem-griff-hufgriff.gif",
                link: "https://modusx.de/fitness-uebungen/rudern-am-kabelzug-sitzend/kabelrudern-mit-breitem-griff/"
            }
        ],
    },
    {
        id: 'machine-pull-down',
        germanName: 'Latzug',
        englishName: 'Pull Down',
        images: [
            {
                url: "https://modusx.de/wp-content/uploads/klassische-latziehen-zur-brust-1080x608.jpg",
                link: "https://modusx.de/fitness-uebungen/latziehen-zur-brust/klassische-latziehen-zur-brust/"
            },
            {
                url: "https://modusx.de/wp-content/uploads/klassische-latziehen-zur-brust.gif",
                link: "https://modusx.de/fitness-uebungen/latziehen-zur-brust/klassische-latziehen-zur-brust/"
            }
        ],
    },
    {
        id: 'machine-leg-press',
        germanName: 'Beinpresse',
        englishName: 'Leg Press',
        images: [
            {
                url: "https://modusx.de/wp-content/uploads/beinpresse-mit-beiden-beinen.jpg",
                link: "https://modusx.de/fitness-uebungen/beinpresse-klassisch/beinpresse-mit-beiden-beinen/"
            },
            {
                url: "https://modusx.de/wp-content/uploads/beinpresse-mit-beiden-beinen-eng.gif",
                link: "https://modusx.de/fitness-uebungen/beinpresse-klassisch/beinpresse-mit-beiden-beinen/"
            }
        ],
    },
];

export type Exercise = {
    id: string;
    germanName: string;
    englishName: string;
    images: {
        url: string;
        link: string;
        placeholderUrl?: string;
    }[]
}
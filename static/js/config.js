portfolioTemplate = {
    info: {
        fullName: "Maxime Gerardin",
        personalDescription: "3D and Environment freelance artist based in south of France, creating immersive visuals for personal projects and brands.",
        logo: "./static/assets/logo.jpg",
        logoCircle: true,
        logoAlt: "Logo icon"
    },
    socials: [
        {
            text: "ArtStation",
            icon: "./static/assets/icons/artstation.svg",
            url: "https://www.artstation.com/maximegerardin"
        },
        {
            text: "Instagram",
            icon: "./static/assets/icons/instagram.svg",
            url: "https://www.instagram.com/maxime.gerardin"
        },
        {
            text: "LinkedIn",
            icon: "./static/assets/icons/linkedin.svg",
            url: "https://www.linkedin.com/in/maximusgerardin/"
        },
        {
            text: "Patreon",
            icon: "./static/assets/icons/patreon.svg",
            url: "https://www.patreon.com/maximegerardin"
        },
        {
            text: "Youtube",
            icon: "./static/assets/icons/youtube.svg",
            url: "https://www.youtube.com/@maximusgerardin"
        }
    ],
    projects: [
        {
            name: "Valorant",
            videoThumbnail: "./static/assets/thumbnails/valorant.mp4",
            types: ["3D", "Animation"],
            year: "2024",
            description: "blabla",
            client: "Riot Games",
            additionalMedias: [],
            additionalLinks: [],
        },
        {
            name: "Island",
            videoThumbnail: "./static/assets/thumbnails/island.mp4",
            types: ["3D", "Animation"],
            year: "2024",
            description: "blabla",
            client: "",
            additionalMedias: [],
            additionalLinks: [],
        },
        {
            name: "Secret Lab",
            videoThumbnail: "./static/assets/thumbnails/secret-lab.mp4",
            types: ["3D", "Animation"],
            year: "2024",
            description: "blabla",
            client: "Riot Games",
            additionalMedias: [],
            additionalLinks: [
                {
                    url: "https://www.secret-labs.com",
                    text: "Secret Labs",
                },
                {
                    url: "https://www.secret-labs.com",
                    text: "ArtStation",
                },
            ],
        },
        {
            name: "Horse",
            videoThumbnail: "./static/assets/thumbnails/horse.mp4",
            types: ["3D", "Animation"],
            year: "2024",
            description: "blabla",
            client: "Riot Games",
            additionalMedias: [],
            additionalLinks: [],
        }
    ],
    footer: {
        contact: [
            {
                icon: "./static/assets/icons/location.svg",
                url: "",
                text: "South of France"
            },
            {
                icon: "./static/assets/icons/mail.svg",
                url: "mailto:maximegerardincontact@gmail.com",
                text: "maximegerardincontact@gmail.com"
            }
        ]
    }
}

styleConfig = {
    portfolioFont: { name: 'Outfit', weights: '100..900', useWeight: '400' }, // Google fonts
    fullNameFont: { name: 'Outfit', weights: '100..900', useWeight: '900'} // Google fonts
}
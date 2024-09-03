const softwareDevelopmentBubbles = [
    {
        name: "Back-End",
        icon: "fa-server",
        color: "#2ecc71",
        size: 130,
        text: "I integrated my Discord Bot with a Firebase for real-time data storage.\n\nMy experience includes working with Firebase and SQLite databases, ensuring efficient data management and retrieval. I'm proficient in Python frameworks and have deployed applications using Git Bash and Oracle VM.",
        stylingRules: [
            { phrase: 'Discord Bot', class: 'featured', modal: 'discordBot' }
        ]
    },
    {
        name: "Front-End",
        icon: "fa-desktop",
        color: "#3498db",
        size: 120,
        text: "I've built this Interactive Portfolio using vanilla JavaScript, HTML, and CSS.\n\nMy experience extends to WordPress and WooCommerce, having set up a virtual business for my consultancy. I'm also proficient in using Flask for web development, bridging front-end and back-end technologies.",
        stylingRules: [
            { phrase: 'Interactive Portfolio', class: 'featured', modal: 'cv' }
        ]
    },
    {
        name: "Automation",
        icon: "fa-robot",
        color: "#e74c3c",
        size: 110,
        text: "I've created multiple task automations in a game (RuneScape), which evolved into a comprehensive project with modular design and reusable components.\n\nBeyond gaming, I've automated web scraping tasks and developed scripts to streamline project setup processes. These projects showcase my ability to create efficient, reusable solutions for repetitive tasks.",
        stylingRules: [
            { phrase: 'task automations', class: 'featured', modal: 'runescapeBots' },
            { phrase: 'web scraping', class: 'project', modal: 'runescapeScraper' }
        ]
    },
    {
        name: "AI & ML",
        icon: "fa-brain",
        color: "#9b59b6",
        size: 125,
        text: "I've developed a sophisticated prompting strategy that has significantly increased my development productivity. Currently, I'm exploring RAG and vector databases to create custom AI tools. \n\nI'm working on an Educational Game for teaching Machine Learning. \n\nI also created a script that uses computer vision to detect trees in a videogame.",
        stylingRules: [
            { phrase: 'Educational Game', class: 'project', modal: 'mlRpg' },
            { phrase: 'computer vision', class: 'project', modal: 'treeDetection' },
            { phrase: 'prompting strategy', class: 'featured', modal: 'prompting' }
        ]
    },
    {
        name: "Web Scraping",
        icon: "fa-spider",
        color: "#f39c12",
        size: 115,
        text: "I've developed scripts using BeautifulSoup and Selenium to extract and analyze data from various websites.\n\nOne project involved scraping pages from a game's wiki page and organizing their information into markdown format for AI training purposes. \n\nI'm planning to expand my portfolio by creating a script to gather information on educational scholarships.",
        stylingRules: [
            { phrase: 'RuneScape', class: 'project', modal: 'runescapeScraper' }
        ]
    },
    {
        name: "APIs",
        icon: "fa-plug",
        color: "#1abc9c",
        size: 105,
        text: "I've created scripts that leverage the RuneScape API to fetch real-time data on item prices and trade volumes.\n\nThis project involves working with external data sources, processing JSON responses, and using the gathered information for data-driven decision making. While my current API experience is game-focused, I'm eager to expand my skills to other domains.",
        stylingRules: [
            { phrase: 'RuneScape API', class: 'project', modal: 'runescapeApi' }
        ]
    },
    {
        name: "Applications",
        icon: "fa-laptop-code",
        color: "#34495e",
        size: 118,
        text: "I developed a complex Discord Bot that facilitates server creation and instant integration with a database. \n\nI've developed a Screenshot Application for capturing game elements with specific measurements, essential for template matching in automations or AI training. \n\nCurrently, I'm working on a Procedural Story Generation algorithm. This project aims to connect with the OpenAI API to generate stories based on various linguistic and narratological rules",
        stylingRules: [
            { phrase: 'Screenshot Application', class: 'project', modal: 'screenshots' },
            { phrase: 'Procedural Story Generation', class: 'project', modal: 'aiStorytelling' },
            { phrase: 'Discord Bot', class: 'featured', modal: 'discordBot' }
        ]
    }
];

const portfolioData = {
    "defaultText": "Welcome to my interactive Developer Portfolio! \n\nClick on the colorful bubbles. \n\nThen click on the highlighted words to read more about a specific project.\n\nThe golden words are my featured projects. \n\nIf my work interests you, feel free to contact me at info@krishanheredia.com",
    "defaultStylingRules": [
        { phrase: 'golden', class: 'featured' },
        { phrase: 'highlighted', class: 'project' }
    ],
    "fields": softwareDevelopmentBubbles
};
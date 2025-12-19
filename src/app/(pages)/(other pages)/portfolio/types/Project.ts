export interface Project {
    title: string;
    link: string; // URL
    siteLink: string; // URL
    githubLink: string; // URL
    backgroundColor: string; // HEX color
    img: string; // URL
    name: string;
    isEnabled: boolean;
    dateSpan: string; // E.g.: May 23 - Current;
    body: string; // Markdown-styled string
}
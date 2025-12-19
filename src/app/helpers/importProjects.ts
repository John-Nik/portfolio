import path from 'path';
import { promises as fs } from 'fs';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { Project } from '../(pages)/(other pages)/portfolio/types/Project';

export async function importProjects() {
    const directory = path.join(process.cwd(), 'src', 'app', 'content');

    const files = await fs.readdir(directory, { withFileTypes: true });

    const jsonFiles = files.filter(file => file.isFile() && file.name.endsWith('.json'));

    const projects = await Promise.all(jsonFiles.map(async file => {
        const full = path.join(directory, file.name);
        const raw = await fs.readFile(full, 'utf8');
        const parsed: Project = JSON.parse(raw);
        const htmlBody = DOMPurify.sanitize(await marked(parsed.body));
        return {
            ...parsed,
            body: htmlBody,
        };
    }));

    return projects;
}
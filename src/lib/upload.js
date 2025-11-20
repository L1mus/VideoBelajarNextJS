import { writeFile } from 'fs/promises';
import path from 'path';

export async function saveFile(file) {
    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.name);
        const filename = 'avatar-' + uniqueSuffix + ext;
        const uploadDir = path.join(process.cwd(), 'public/uploads');
        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);
        return `/uploads/${filename}`;
    } catch (error) {
        console.error("Error saving file:", error);
        throw new Error("Gagal menyimpan file.");
    }
}
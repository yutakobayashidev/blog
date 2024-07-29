import { readFile } from "node:fs/promises";
import { join } from "node:path";

const fetchCover = async (cover: string): Promise<Buffer> => {
	if (cover.startsWith("http")) {
		return Buffer.from(await (await fetch(cover)).arrayBuffer());
	}

	const coverPath = join(process.cwd(), "public", cover);
	return await readFile(coverPath);
};

export const defaultOpenGraph = async (): Promise<Buffer> => {
	return await fetchCover("/assets/open-graph.png");
};

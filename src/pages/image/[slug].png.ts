import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { getOgImage } from "../../components/Ogimage";
import { defaultOpenGraph } from "../../libs/og";

const fallback = async () =>
	new Response(await defaultOpenGraph(), {
		headers: { "Content-Type": "image/png" },
	});

export async function getStaticPaths() {
	const posts = await getCollection("blog");
	return posts
		.filter((post) => post.data.heroImage !== undefined)
		.map((post) => ({ params: [post.slug] }));
}

export const GET: APIRoute = async ({ params }) => {
	const slug = params.slug;

	if (!slug) {
		return await fallback();
	}

	const posts = await getCollection("blog");

	const post = posts.find((post) => post.slug === slug);

	if (!post) {
		return await fallback();
	}

	const body = await getOgImage(post.data.title);

	return new Response(body, {
		headers: {
			"content-type": "image/png",
		},
	});
};

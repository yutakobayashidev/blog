import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import { getFont } from "../libs/og-fonts";

const siteUrl = "https://studio.yutakobayashi.dev";

export async function getOgImage(text: string) {
	const inter = await getFont({
		family: "Inter",
		weights: [800] as const,
	});

	const notoSans = await getFont({
		family: "Noto Sans JP",
		weights: [800] as const,
	});

	const svg = await satori(
		<div
			style={{
				display: "flex",
				paddingLeft: 70,
				paddingRight: 70,
				paddingTop: 40,
				paddingBottom: 40,
				height: "100%",
				backgroundImage: `url(${siteUrl}/assets/open-graph.jpg)`,
			}}
		>
			<div
				style={{
					height: "100%",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					color: "#fff",
					paddingTop: 48,
					paddingBottom: 48,
					maxWidth: 1000,
					fontWeight: "800",
					borderRadius: 12,
				}}
			>
				<h1 style={{ fontSize: 84 }}>{text}</h1>
			</div>
		</div>,
		{
			width: 1200,
			height: 630,
			fonts: [
				{ name: "Inter", data: inter[800], weight: 800 },
				{ name: "Noto Sans JP", data: notoSans[800], weight: 400 },
			],
		},
	);

	const resvg = new Resvg(svg);

	return await resvg.render().asPng();
}

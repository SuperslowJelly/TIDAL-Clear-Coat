import { Tracer, type LunaUnload } from "@luna/core";
import { StyleTag } from "@luna/lib";
import manifestJson from "../package.json";

const { trace } = Tracer("[NoPlaylistBackgroundImage]");
export { trace };

// Import CSS file.
import noPlaylistBackgroundCss from "file://no-playlist-background-image.css?minify";

// Plugin metadata.
export const manifest = {
	name: manifestJson.name,
	author: manifestJson.author,
	description: manifestJson.description,
};

// Allow TidaLuna to clean up this style when the plugin unloads.
export const unloads = new Set<LunaUnload>();

// Inject the CSS via StyleTag, but defer injection until after TIDAL has finished loading its own CSS.
export let style: StyleTag | null = null;

function injectCss() {
	if (style) return;

	// Creating the StyleTag later ensures it is appended after TIDAL's startup styles,
	// preventing it from being overridden.
	style = new StyleTag("NoPlaylistBackgroundImage", unloads, noPlaylistBackgroundCss);
}

if (document.readyState === "complete") {
	injectCss();
} else {
	window.addEventListener("load", injectCss, { once: true });
}

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

// Inject the CSS via StyleTag.
export const style = new StyleTag("NoPlaylistBackgroundImage", unloads, noPlaylistBackgroundCss);

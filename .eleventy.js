const { EleventyI18nPlugin } = require("@11ty/eleventy");
const env = process.env.NODE_ENV

module.exports = function(eleventyConfig) {
	let envPathPrefix = "";
	switch (env) {
		case "prod":
			envPathPrefix = "";
			console.log("Production build");
			break;
		case "preprod":
			envPathPrefix = "/website-2024/";
			console.log("Pre-production build");
			break;
		default:
			envPathPrefix = "";
			console.log("Development build");
			break;
	}

	eleventyConfig.addPassthroughCopy("src/images");
	eleventyConfig.addPassthroughCopy("src/css");
	eleventyConfig.addPassthroughCopy("src/js");

	eleventyConfig.addDataExtension("csv", (contents) => {
		const records = parse(contents, {
			columns: true,
			skip_empty_lines: true
		});
		return records;
	});

	eleventyConfig.addPlugin(EleventyI18nPlugin, {
		defaultLanguage: "en",
		filters: {
			url: "locale_url",
			links: "locale_links"
		},
		errorMode: "strict"
	});

	return {
		pathPrefix: envPathPrefix,
		dir: {
			input: "src",
			output: "docs"
		}
	};
};

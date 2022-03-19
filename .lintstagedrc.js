const path = require("path");

/**
 * Build custom ESLint command to allow dynamic `--file` flag  values to be properly processed.
 * @see https://nextjs.org/docs/basic-features/eslint#lint-staged
 */
const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
};

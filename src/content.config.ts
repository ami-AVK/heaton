import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { parse as parseToml } from "toml";
import { parse as parseCsv } from "csv-parse/sync";
import type { Loader, LoaderContext } from 'astro/loaders';

// const csv = defineCollection({
//     // loader: glob("src/data/**/**/*.csv"),
//     loader: myLoader(),
//     // loader: file("src/data/heater/Compact/Тип 11.csv", { parser: (text) => parseCsv(text, { columns: true, skipEmptyLines: true })})
//   });


//   export function myLoader(): Loader {

//     return {
//       name: "my-loader",
//       // Called when updating the collection.
//       load: async (context: LoaderContext): Promise<void> => {
//         // Load data and update the store
//         const response = await glob({ pattern: "**\/**\/*.csv", base: "./src/data/"});
//         console.log(response);
//       }
//     };
//   }

// export const collections = {
//         csv: csv,
//       };
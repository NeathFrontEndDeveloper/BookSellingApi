// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";
// import chalk from "chalk"; // for colored logs
// import { bookModel } from "./src/models/bookModel.js";
// import { userModel } from "./src/models/userModel.js";
// import { IBook } from "./src/types/bookType.js";
// import { IUser } from "./src/types/userType.js";
//
// // Load environment variables
// dotenv.config();
//
// // File path helpers
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
//
// // Mongo URI
// const MONGO_URI = process.env.MONGO_URI;
// if (!MONGO_URI) {
//     console.error(chalk.red("❌ Missing MONGO_URI in .env file"));
//     process.exit(1);
// }
//
// // Local data file paths
// const bookFilePath = path.join(__dirname, "src", "data", "bookLocalData.json");
// const userFilePath = path.join(__dirname, "src", "data", "userLocalData.json");
//
// // Utility to safely read JSON
// const readJSON = <T>(filePath: string): T[] => {
//     try {
//         const data = fs.readFileSync(filePath, "utf-8");
//         const parsed = JSON.parse(data);
//         if (!Array.isArray(parsed)) throw new Error(`${filePath} does not contain an array`);
//         return parsed;
//     } catch (err: any) {
//         console.error(chalk.red(`⚠️ Error reading ${filePath}: ${err.message}`));
//         return [];
//     }
// };
//
// // Load local data
// const books: IBook[] = readJSON<IBook>(bookFilePath);
// const users: IUser[] = readJSON<IUser>(userFilePath);
//
// // Generic seeding function
// const insertData = async <T>(model: mongoose.Model<T>, data: T[], label: string) => {
//     if (data.length === 0) {
//         console.log(chalk.yellow(`⚠️ No ${label} data found — skipping.`));
//         return;
//     }
//
//     try {
//         const inserted = await model.insertMany(data, { ordered: false });
//         console.log(chalk.green(`✅ Inserted ${inserted.length} ${label}`));
//     } catch (error: any) {
//         if (error.writeErrors) {
//             const duplicateCount = error.writeErrors.filter((e: any) => e.code === 11000).length;
//             console.log(
//                 chalk.yellow(
//                     `⚠️ ${duplicateCount} duplicate ${label} skipped. Inserted ${data.length - duplicateCount} new ${label}.`
//                 )
//             );
//         } else {
//             console.error(chalk.red(`❌ Failed to insert ${label}:`), error.message);
//         }
//     }
// };
//
// // Main seed function
// const seedDatabase = async () => {
//     console.log(chalk.cyan("🚀 Starting data seeding..."));
//
//     try {
//         await mongoose.connect(MONGO_URI);
//         console.log(chalk.green("✅ Connected to MongoDB"));
//
//         await insertData(bookModel, books, "books");
//         await insertData(userModel, users, "users");
//
//         console.log(chalk.blue("🌱 Seeding complete — existing data preserved."));
//     } catch (err) {
//         console.error(chalk.red("❌ Seeding process failed:"), err);
//     } finally {
//         await mongoose.disconnect();
//         console.log(chalk.gray("🔌 MongoDB disconnected"));
//         process.exit(0);
//     }
// };
//
// // Run script
// seedDatabase();

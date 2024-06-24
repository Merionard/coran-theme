import { prisma } from "@/prisma/client";
import { hadith, hadithBook, hadithChapter } from "@prisma/client";
import fs from "fs";
import path from "path";
import logger from "@/lib/logger";

type Hadith = {
  id: number;
  idInBook: number;
  chapterId: number;
  bookId: number;
  arabic: string;
  english: {
    narrator: string;
    text: string;
  };
};

type Chapter = {
  id: number;
  bookId: number;
  arabic: string;
  english: string;
};

type Metadata = {
  id: number;
  length: number;
  arabic: {
    title: string;
    author: string;
    introduction: string;
  };
  english: {
    title: string;
    author: string;
    introduction: string;
  };
};
type Book = {
  id: number;
  metadata: Metadata;
  chapters: Chapter[];
  hadiths: Hadith[];
};

export default async function LoadHadith() {
  const filePath = path.resolve("./public/shamail_muhammadiyah.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const book: Book = JSON.parse(jsonData) as Book;

  const hadithBook: hadithBook = {
    id: book.id,
    length: book.metadata.length,
    author: book.metadata.arabic.author,
    title: book.metadata.arabic.title,
    introduction: book.metadata.arabic.introduction,
    authorTraductionEn: book.metadata.english.author,
    titleTraductionEn: book.metadata.english.title,
    introductionTraductionEn: book.metadata.english.introduction,
    authorTraductionFr: null,
    titleTraductionFr: null,
    introductionTraductionFr: null,
  };

  const chapters: hadithChapter[] = book.chapters.map((c) => ({
    id: c.id,
    hadith_book_id: book.id,
    title: c.arabic,
    titleEn: c.english,
    titleFr: null,
  }));

  const hadiths: hadith[] = book.hadiths.map((h) => ({
    content: h.arabic,
    id: h.id,
    hadith_chapter: h.chapterId,
    traductionEn: h.english.text,
    traductionFr: null,
    narratorEn: h.english.narrator,
    narratorFr: null,
  }));

  save(hadithBook, chapters, hadiths)
    .catch((e) => {
      logger.error("Transaction failed:", e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

async function save(
  book: hadithBook,
  chapters: hadithChapter[],
  hadiths: hadith[]
) {
  await prisma.$transaction(
    async (prisma) => {
      // Créer le livre
      const createdBook = await prisma.hadithBook.create({
        data: book,
      });

      // Créer les chapitres et stocker les associations avec les hadiths
      const chapterMap: { [key: number]: number } = {};

      for (const chapter of chapters) {
        const { id, ...chapterData } = chapter;
        const createdChapter = await prisma.hadithChapter.create({
          data: {
            ...chapterData,
          },
        });

        // Associer l'ID du chapitre du JSON avec l'ID généré par Prisma
        chapterMap[chapter.id] = createdChapter.id;
      }

      // Créer les hadiths en utilisant les IDs de chapitre générés par Prisma
      for (const hadith of hadiths) {
        const { id, ...hadithData } = hadith;
        try {
          await prisma.hadith.create({
            data: {
              ...hadithData,
              hadith_chapter: chapterMap[hadith.hadith_chapter],
            },
          });
        } catch (error) {
          logger.error(
            `Error inserting hadith with id ${hadith.id}: ${error}` +
              " " +
              hadith.content +
              " " +
              hadith.traductionEn
          );
        }
      }
    },
    { timeout: 360000 }
  );

  console.log("Data successfully imported!");
}

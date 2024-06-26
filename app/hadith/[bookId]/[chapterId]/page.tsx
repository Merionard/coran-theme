import { HadithItem } from "@/components/clientComponents/hadith/hadithItem";
import { prisma } from "@/prisma/client";

export default async function ChapterPage({
  params,
}: {
  params: { chapterId: string };
}) {
  const hadiths = await prisma.hadith.findMany({
    where: { hadith_chapter: Number(params.chapterId) },
    include: { hadithChapter: { include: { hadithBook: true } } },
  });

  return (
    <div className="space-y-3">
      <h2 className="text-center text-4xl  md:text-6xl ">
        {hadiths[0].hadithChapter.titleEn} - {hadiths[0].hadithChapter.title}
      </h2>
      {hadiths.map((a) => (
        <HadithItem
          hadith={a}
          isFavorite={true}
          key={a.id}
          isLearned={true}
          metadata={{
            bookId: hadiths[0].hadithChapter.hadith_book_id,
            bookName: hadiths[0].hadithChapter.hadithBook.titleTraductionEn,
            chapterId: hadiths[0].hadith_chapter,
            chapterName: hadiths[0].hadithChapter.titleEn,
            chapterNumber: 5,
          }}
        />
      ))}
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/prisma/client";
import Link from "next/link";
export default async function Page() {
  const Themes = await prisma.theme.findMany();

  return (
    <Card>
      <CardContent>
        <ul>
          {Themes.map((t) => (
            <li key={t.id}>
              <Link href={`/themes_coran/${t.id}`}>{t.name}</Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

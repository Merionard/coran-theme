import { Card, CardContent } from "@/components/ui/card";
import { PrismaClient } from "@prisma/client";

export default async function Page() {
  const prisma = new PrismaClient();
  const Themes = await prisma.theme.findMany();

  return (
    <Card>
      <CardContent>
        <ul>
          {Themes.map((t) => (
            <li key={t.id}>{t.name}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

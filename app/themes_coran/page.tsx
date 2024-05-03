import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/prisma/client";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { NewThemeDialogForm } from "./newThemeDialogForm";

export default async function Page() {
  const Themes = await prisma.theme.findMany();
  async function createTheme(formData: FormData) {
    'use server'

    const rawFormData = {
      newTheme: formData.get('newTheme'),
    }


    console.log(rawFormData)
  }


  return (
    <div>
      <NewThemeDialogForm />

      <Card className="mt-5">
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
    </div>
  );
}

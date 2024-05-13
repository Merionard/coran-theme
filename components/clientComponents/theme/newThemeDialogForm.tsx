"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  themeName: z
    .string()
    .min(3, "Minimum 3 caractères")
    .max(70, "Maximum 70 caractères"),
});

type Props = {
  onSubmitForm: (
    themeName: string,
    themeId?: number
  ) => Promise<{
    id: number;
    name: string;
    parentId: number | null;
  } | null>;
  parentId?: number;
};

export function NewThemeDialogForm({ onSubmitForm, parentId }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      themeName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await onSubmitForm(values.themeName, parentId);
      if (result === null) {
        form.setError("themeName", {
          type: "custom",
          message: "Ce thème existe déjà!",
        });
        return;
      }

      toast.success(result.name + " créé avec succès!");
      setOpenModal(false);
      router.refresh();
    } catch (error) {
      setOpenModal(false);
      //@ts-ignore
      toast.error(error.message);
    }
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <Button
        size={"icon"}
        className="rounded-full"
        onClick={() => setOpenModal((prev) => !prev)}
      >
        <Plus />
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouveau thème coranique</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="themeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nouveau Thème</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

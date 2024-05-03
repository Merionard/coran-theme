"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createNewThemeCoran } from "./themeCoranAction"
import { toast } from "sonner"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Close } from "@radix-ui/react-dialog"
import { useRouter } from "next/navigation"





const formSchema = z.object({
    themeName: z.string()
        .min(3, "Minimum 3 caractères")
        .max(70, "Maximum 70 caractères")
})

export function NewThemeDialogForm() {

    const [openModal, setOpenModal] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            themeName: "",
        },
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
        const newTheme = await createNewThemeCoran(values.themeName);
        if (newTheme === null) {
            form.setError("themeName", { type: "custom", message: "Ce thème existe déjà!" })
            return;
        }
        toast(newTheme.name + " créé avec succès!")
        setOpenModal(false)
        router.refresh()
    }

    return (
        <Dialog open={openModal} onOpenChange={setOpenModal} >
            <Button onClick={() => setOpenModal((prev) => !prev)}>+ Ajouter Thème</Button>
            <DialogContent>
                <DialogHeader >
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

    )


}


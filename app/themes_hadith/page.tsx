import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MessageCircleWarning } from "lucide-react";

export default async function ThemesHadithsPage() {
  return (
    <Alert>
      <MessageCircleWarning className="h-4 w-4" />

      <AlertTitle>Oups</AlertTitle>
      <AlertDescription>
        Pas encore implémenté! Bientot Incha Allah
      </AlertDescription>
    </Alert>
  );
}

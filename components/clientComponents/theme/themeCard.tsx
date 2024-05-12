import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { theme } from "@prisma/client";
import Link from "next/link";

import { PropsWithChildren } from "react";

export const ThemeCard = (props: PropsWithChildren<theme>) => {
  return (
    <Card>
      <CardHeader>
        <Link href={`/themes_coran/${props.id}`}>
          <CardTitle>{props.name}</CardTitle>
        </Link>
        <CardDescription>efefejfoeifjeofiejoefijefoeifjeofij</CardDescription>
      </CardHeader>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
};

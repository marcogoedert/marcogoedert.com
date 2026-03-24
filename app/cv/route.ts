import { redirect } from "next/navigation";

export function GET() {
  redirect("/cv.pdf");
}

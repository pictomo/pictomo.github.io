import Home from "@/app/components/home";
import { I18nLocale } from "../i18n/config";

export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ locale: "ja" }, { locale: "en" }];
}

const Page = async ({
  params,
}: {
  params: Promise<{ locale: I18nLocale }>;
}) => {
  const resolvedParams = await params;

  return <Home locale={resolvedParams.locale} />;
};

export default Page;

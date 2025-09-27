import Home from "./home";
import { i18nLocales, I18nLocale } from "../i18n/config";

export const dynamicParams = false;

export async function generateStaticParams() {
  return i18nLocales.map((locale) => ({ locale }));
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

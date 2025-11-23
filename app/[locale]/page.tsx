import Home from "./home";
import { i18nLocales, I18nLocale } from "@/app/i18n/config";
import P5Container from "@/app/components/p5-container";

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

  return (
    <>
      <Home locale={resolvedParams.locale} />
      <P5Container />
    </>
  );
};

export default Page;

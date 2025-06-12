import { ReactNode } from "react";

export const i18nLocales = ["ja", "en"] as const;
export type I18nLocale = (typeof i18nLocales)[number];
type I18nDict = { [key in I18nLocale]?: string | ReactNode };

export const defaultLocale: I18nLocale = "ja";

/**
 * 指定されたロケールに基づいて国際化された値を返します。
 *
 * @param i18n_dict - ロケールごとの翻訳を含む辞書
 * @param locale - 取得したい翻訳のロケール
 * @returns 指定されたロケールの翻訳値。存在しない場合は以下の順序でフォールバックします：
 * 1. デフォルトロケール（"ja"）の値
 * 2. 辞書内の最初の有効な値
 * 3. 空文字列（辞書が完全に空の場合）
 */
export const t = (
  i18n_dict: I18nDict,
  locale: I18nLocale
): string | ReactNode => {
  if (i18n_dict[locale]) {
    return i18n_dict[locale];
  } else if (i18n_dict[defaultLocale]) {
    return i18n_dict[defaultLocale];
  } else {
    const firstAvailableValue = Object.values(i18n_dict).find(
      (value) => value !== undefined && value !== null
    );
    return firstAvailableValue ?? "";
  }
};

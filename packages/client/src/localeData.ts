import { addLocaleData } from "react-intl";

import enLocaleData from "react-intl/locale-data/en";
import zhLocaleData from "react-intl/locale-data/zh";

export const localeData = [enLocaleData, zhLocaleData];

export const addAppLocaleData = () =>
  localeData.forEach(locale => addLocaleData(locale));

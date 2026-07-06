import i18n from "i18next"
import {initReactI18next} from "react-i18next"
import ar from "./ar.json"
import de from "./de.json"
import en from "./en.json"
import es from "./es.json"
import fr from "./fr.json"
import it from "./it.json"
import ko from "./ko.json"
import zhCN from "./zh-CN.json"
import AsyncStorage from "@react-native-async-storage/async-storage"

const LANGUAGES = {
  en: { translation: en },
  ar: { translation: ar },
  de: { translation: de },
  es: { translation: es },
  fr: { translation: fr },
  it: { translation: it },
  ko: { translation: ko },
  "zh-CN": { translation: zhCN },
}

const LANGUAGE_DETECTOR = {
  type: "languageDetector",
  async: true,
  detect: async(callback: (lang: string) => void ) =>{
    try {
      const savedLang = await AsyncStorage.getItem("LANG");
      if(savedLang){
        callback(savedLang)
        return
      }
    } catch (error) {
      console.log('====================================');
      console.log("error retrieving language, ", error);
      console.log('====================================');
    }
    callback("en")
  },
  cacheUserLanguage: async(lang: string) =>{
    try {
      await AsyncStorage.setItem("LANG", lang)
    } catch (error) {
      console.log('====================================');
      console.log("error saving language, ", error);
      console.log('====================================');
    }
 
  },
  
}

i18n.use(LANGUAGE_DETECTOR as any).use(initReactI18next).init({
  resources: LANGUAGES,
  fallbackLng: "en",
  defaultNS: "translation",
  ns: ["translation"],
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
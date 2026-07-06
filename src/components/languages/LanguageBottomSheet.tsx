import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import AppText from "../texts/AppText";
import AppButton from "../buttons/AppButton";
import { s, vs } from "react-native-size-matters";
import RadioInputAndTitle from "../inputs/RadioInputAndTitle";
import { useTranslation } from "react-i18next";
import i18n from "../../localization/i18n";
import { languagesList } from "../../localization/languagesList";

const LanguageBottomSheet = () => {
  const [selectedLang, setSelectedLang] = useState(i18n.language);
  const handleSubmit = () => {
    SheetManager.hide("LANG_SHEET");
    i18n.changeLanguage(selectedLang);
  };
  const { t } = useTranslation();
  return (
    <ActionSheet id="LANG_SHEET">
      <View style={styles.container}>
        <AppText style={{ marginBottom: vs(20), textAlign: "center" }}>
          {t("language_sheet_title")}
        </AppText>

        {languagesList.map((lang) => (
          <RadioInputAndTitle
            title={lang.label}
            key={lang.code}
            selected={selectedLang === lang.code}
            onPress={() => setSelectedLang(lang.code)}
          />
        ))}
      </View>
      <AppButton
        style={{ marginBottom: vs(10) }}
        title={t("language_confirm")}
        onPress={() => {
          handleSubmit()
        }}
      />
    </ActionSheet>
  );
};

export default LanguageBottomSheet;

const styles = StyleSheet.create({
  container: {
    padding: s(16),
  },
});

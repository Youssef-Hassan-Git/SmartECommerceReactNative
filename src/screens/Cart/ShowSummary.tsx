import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import CartTotals from "./CartTotals";
import ShowSummaryButton from "../../components/buttons/ShowSummaryButton";
import { useTranslation } from "react-i18next";

const ShowSummary = () => {
  const { t } = useTranslation();
  const [showSummaryCheckout, setShowSummaryCheckout] = useState(false);

  return (
    <View>
      <ShowSummaryButton
        
        title={
          showSummaryCheckout ? t("cart_collapse_summary") : t("cart_view_summary")
        }
        onPress={() => setShowSummaryCheckout((prev) => !prev)}
        showSummaryCheckout={showSummaryCheckout}
      />

      {showSummaryCheckout && (
        <CartTotals />
      )}
    </View>
  );
};

export default ShowSummary;

const styles = StyleSheet.create({});

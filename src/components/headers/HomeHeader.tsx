import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { IMAGES } from '../../constants/images'
import { s, vs } from 'react-native-size-matters'
import { AppColors } from '../../styles/colors'
import AppText from '../texts/AppText'
import { useTranslation } from 'react-i18next'

const HomeHeader = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoWrapper}>
        <Image source={IMAGES.appLogo} style={styles.image} />
        <AppText variant="bold">
          {t('home_brand_smart')}<AppText style={styles.orangeText}>{t('home_brand_ecommerce')}</AppText>
        </AppText>
      </View>
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: AppColors.surface, 
    paddingVertical: vs(12),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border,
    
    //ios
    shadowColor: AppColors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    //android
    elevation: 5, 
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(8), 
  },
  image: {
    width: s(45), 
    height: vs(45),
    resizeMode: 'cover',
  },
  orangeText: {
    color: AppColors.primary, 
  },
})
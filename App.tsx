/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';

import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import mobileAds, {
  BannerAd,
  BannerAdSize,
  MaxAdContentRating,
  TestIds,
} from 'react-native-google-mobile-ads';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const configureAdMob = async () => {
  await mobileAds().setRequestConfiguration({
    // Update all future requests suitable for parental guidance
    maxAdContentRating: MaxAdContentRating.G,

    // Indicates that you want the ad request to be handled in a
    // manner suitable for users under the age of consent.
    tagForUnderAgeOfConsent: true,

    // An array of test device IDs to allow.
    testDeviceIdentifiers: ['EMULATOR'],
  });
};

export const initializeAdMob = async () => {
  const result = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
  if (result === RESULTS.DENIED) {
    // The permission has not been requested, so request it.
    await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
  }
  await configureAdMob();
  const adapterStatuses = await mobileAds().initialize();
  await mobileAds().openAdInspector();
  console.log(adapterStatuses);
  return adapterStatuses;
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  useEffect(() => {
    const runInitializeAdMob = async () => initializeAdMob();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    runInitializeAdMob();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Text>"테스트"</Text>
      <AdMobBanner />
    </SafeAreaView>
  );
}

const AdMobBanner = () => {
  return (
    <View>
      <Text>admobbanner</Text>
      <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.FULL_BANNER} />
    </View>
  );
};

export default App;

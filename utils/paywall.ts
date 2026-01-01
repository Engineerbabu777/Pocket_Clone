import Purchases from 'react-native-purchases';
import RevenueCatUI, { PAYWALL_RESULT } from 'react-native-purchases-ui';

export async function presentPaywall(): Promise<boolean> {
  // Present paywall for current offering:
  const paywallResult: PAYWALL_RESULT = await RevenueCatUI.presentPaywall();

  switch (paywallResult) {
    case PAYWALL_RESULT.NOT_PRESENTED:
    case PAYWALL_RESULT.ERROR:
    case PAYWALL_RESULT.CANCELLED:
      return false;
    case PAYWALL_RESULT.PURCHASED:
    case PAYWALL_RESULT.RESTORED:
      return true;
    default:
      return false;
  }
}

export async function presentPaywallIfNeeded() {
  // Present paywall for current offering:
  const paywallResult: PAYWALL_RESULT = await RevenueCatUI.presentPaywallIfNeeded({
    requiredEntitlementIdentifier: 'premium',
  });
}

export async function isUsePremium() {
  const customerInfo = await Purchases.getCustomerInfo();
  return typeof customerInfo.entitlements.active['premium'] !== 'undefined';
}
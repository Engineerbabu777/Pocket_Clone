


import { COLORS } from '@/utils/Colors';
import { Redirect } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';


export default function HomeScreen() {
  return (
   <Redirect href={"/saves"}/>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 30,
    paddingTop: 80,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  logoIcon: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  buttonSection: {
    gap: 12,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 16,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderColor: COLORS.border,
  },
  buttonText: {
    fontSize: 16,
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  orText: {
    marginHorizontal: 16,
    color: COLORS.textLight,
    fontSize: 14,
  },
  emailSection: {
    marginBottom: 30,
  },
  emailInput: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  nextButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    marginTop: 20,
  },
  termsText: {
    fontSize: 12,
    color: COLORS.textGray,
    textAlign: 'center',
    lineHeight: 18,
  },
  link: {
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
});
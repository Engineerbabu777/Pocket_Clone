import { COLORS } from "@/utils/Colors";
import { StyleSheet } from "react-native";



interface ArticlesFeedProps {
  maxItems?: number;
  feedSource?: 'expo' | 'react-native';
  title?: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: COLORS.textGray,
    fontSize: 14,
  },
  separator: {
    height: 16,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  horizontalScroll: {
    paddingHorizontal: 20,
  },
  horizontalScrollContent: {
    paddingRight: 20,
  },
  compactCardWrapper: {
    marginRight: 16,
    width: 280,
    marginVertical: 4,
  },
  // Featured card styles
  featuredCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 20,
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  featuredImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#f5f5f5',
  },
  featuredContent: {
    padding: 16,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textDark,
    lineHeight: 26,
    marginBottom: 8,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Compact card styles
  compactCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  compactContent: {
    padding: 12,
  },
  compactTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  compactTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  compactTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
    lineHeight: 20,
  },
  compactImage: {
    width: 60,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  compactBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  compactMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  compactSaveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  // Shared styles
  metaText: {
    fontSize: 12,
    color: COLORS.textGray,
    marginRight: 4,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  saveText: {
    marginLeft: 4,
    fontSize: 12,
    color: COLORS.textGray,
    fontWeight: '500',
  },
});
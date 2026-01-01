import { COLORS } from "@/utils/Colors";
import { StyleSheet } from "react-native";




const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  itemText: {
    flex: 1,
    marginRight: 12,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textDark,
    lineHeight: 24,
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    color: COLORS.textGray,
    lineHeight: 18,
  },
  itemImage: {
    width: 100,
    height: 60,
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
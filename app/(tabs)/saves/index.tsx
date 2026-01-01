import { COLORS } from "@/utils/Colors";
import { StyleSheet, Text, View } from "react-native";

export default function SavesScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  listContent: {
    paddingVertical: 10,
    backgroundColor: COLORS.white,
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginStart: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: COLORS.textGray,
    textAlign: 'center',
  },
});
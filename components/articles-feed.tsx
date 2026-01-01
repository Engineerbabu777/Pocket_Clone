import { RssArticle, rssArticles } from "@/db/schema";
import { COLORS } from "@/utils/Colors";
import { desc } from "drizzle-orm";
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as Crypto from "expo-crypto";
import { useRouter } from "expo-router";
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from "react";
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ArticleCardProps {
    article: RssArticle;
    onSave: (article: RssArticle) => void;
    variant?: 'featured' | 'compact';
}

function ArticleCard({ article, onSave, variant = 'compact' }: ArticleCardProps) {
    const hasImage = article.image_url && article.image_url.length > 0;

    const handlePress = () => {
        if (article.url) {
            Linking.openURL(article.url);
        }
    };

    if (variant === 'featured') {
        return (
            <TouchableOpacity style={styles.featuredCard} onPress={handlePress}>
                {hasImage && (
                    <Image source={{ uri: article.image_url || '' }} style={styles.featuredImage} />
                )}
                <View style={styles.featuredContent}>
                    <Text style={styles.featuredTitle} numberOfLines={2}>
                        {article.title}
                    </Text>

                    <View style={styles.cardActions}>
                        <View style={styles.featuredMeta}>
                            <Text style={styles.metaText}>{article.source}</Text>
                            <Text style={styles.metaText}>• {article.estimated_read_time} min read</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={(e) => {
                                e.stopPropagation();
                                onSave(article);
                            }}>
                            <Image
                                source={require('@/assets/images/icon.png')}
                                style={{ width: 24, height: 24 }}
                            />

                            <Text style={styles.saveText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity style={styles.compactCard} onPress={handlePress}>
            <View style={styles.compactContent}>
                {/* First row: Title and Image */}
                <View style={styles.compactTopRow}>
                    <View style={styles.compactTitleContainer}>
                        <Text style={styles.compactTitle} numberOfLines={2}>
                            {article.title}
                        </Text>
                    </View>
                    {hasImage && (
                        <Image source={{ uri: article.image_url || '' }} style={styles.compactImage} />
                    )}
                </View>

                {/* Second row: Meta and Save button */}
                <View style={styles.compactBottomRow}>
                    <View style={styles.compactMeta}>
                        <Text style={styles.metaText}>{article.source}</Text>
                        <Text style={styles.metaText}>• {article.estimated_read_time} min read</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.compactSaveButton}
                        onPress={(e) => {
                            e.stopPropagation();
                            onSave(article);
                        }}>
                        <Image source={require('@/assets/images/icon.png')} style={{ width: 20, height: 20 }} />

                        <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
}




interface ArticlesFeedProps {
    maxItems?: number;
    feedSource?: 'expo' | 'react-native';
    title?: string;
}

export default function ArticlesFeed({
    maxItems = 10,
    feedSource = 'react-native',
    title,
}: ArticlesFeedProps) {
    const [articles, setArticles] = useState<RssArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);




    const router = useRouter();

    const db = useSQLiteContext();
    const drizzleDb = drizzle(db);


     const loadArticles = async () => {
    try {
      const cachedArticles = await drizzleDb
        .select()
        .from(rssArticles)
        .orderBy(desc(rssArticles.published_date))
        .limit(maxItems);

      if (cachedArticles.length > 0) {
        setArticles(cachedArticles);
        setLoading(false);
      } else {
        await fetchFreshArticles();
      }
    } catch (error) {
      console.error('Failed to load cached articles:', error);
    }
  };

const fetchFreshArticles = async () => {
    try {
      // Fetch from specified RSS feed
      const response = await fetch(`/api/rss-feed?url=${feedSource}`);
      const result = await response.json();

      if (result.success) {
        // Clear existing articles and insert new ones
        await drizzleDb.delete(rssArticles);

        const articlesToInsert = result.data.items.map((item: any) => ({
          id: Crypto.randomUUID(),
          title: item.title,
          url: item.url,
          description: item.description,
          published_date: item.publishedDate, // Now in ISO format for proper sorting
          author: item.author,
          category: item.category,
          image_url: item.image,
          source: item.source,
          estimated_read_time: item.estimatedReadTime,
          feed_url: result.data.feedUrl,
          is_saved: false,
        }));

        await drizzleDb.insert(rssArticles).values(articlesToInsert);
        await loadArticles();
      }
    } catch (error) {
      console.error('Failed to fetch fresh articles:', error);
    } finally {
      setRefreshing(false);
    }
  };

    useEffect(() => {
    loadArticles();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchFreshArticles();
  };



    return (
        <View style={styles.container}>
        </View>
    );
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
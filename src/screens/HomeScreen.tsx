// src/screens/HomeScreen.tsx
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowDownCircle, ArrowUpCircle, FileText, Search, Users } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SummaryCard from '../components/SummaryCard';
import TradeCard from '../components/TradeCard';
import { mockTrades } from '../data/mockTrades';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, radius, spacing } from '../theme/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
    const navigation = useNavigation<NavigationProp>();

    const totalTransactions = mockTrades.length;
    const totalPurchaseValue = mockTrades
        .filter((t) => t.type === 'purchase')
        .reduce((sum, t) => sum + t.value, 0);
    const totalSaleValue = mockTrades
        .filter((t) => t.type === 'sale')
        .reduce((sum, t) => sum + t.value, 0);

    const latestTrades = mockTrades.slice(0, 4);

    const summaryStats = [
        {
            icon: <FileText size={14} color={colors.analytics} />,
            label: 'Transactions',
            value: `${totalTransactions}`,
            sublabel: 'demo filings today',
        },
        {
            icon: <ArrowUpCircle size={14} color={colors.purchase} />,
            label: 'Purchase value',
            value: `$${(totalPurchaseValue / 1000000).toFixed(1)}M`,
            sublabel: 'demo purchases',
            valueColor: colors.purchase,
        },
        {
            icon: <ArrowDownCircle size={14} color={colors.sale} />,
            label: 'Sale value',
            value: `$${(totalSaleValue / 1000000).toFixed(1)}M`,
            sublabel: 'demo sales',
            valueColor: colors.sale,
        },
    ];

    const topSignals = [
        { icon: <ArrowUpCircle size={14} color={colors.purchase} />, label: 'Large CEO Purchase', count: 6 },
        { icon: <Users size={14} color={colors.analytics} />, label: 'Cluster Buy', count: 4 },
        { icon: <ArrowDownCircle size={14} color={colors.sale} />, label: 'Executive Sale', count: 3 },
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
                {/* Header Section */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>Market Pulse</Text>
                        <Text style={styles.tagline}>Discover notable insider activity</Text>
                    </View>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>Fictional demo data</Text>
                    </View>
                </View>

                {/* Search Bar */}
                <TouchableOpacity
                    style={styles.searchBar}
                    onPress={() => navigation.navigate('Screener')}
                    activeOpacity={0.5}
                    accessibilityRole="button"
                    accessibilityLabel="Search ticker or company, opens Screener"
                >
                    <Search size={18} color={colors.textSecondary} />
                    <Text style={styles.searchPlaceholder}>Search ticker or company</Text>
                </TouchableOpacity>

                {/* Summary Cards */}
                <View style={styles.summaryRow}>
                    {summaryStats.map((stat) => (
                        <SummaryCard key={stat.label} {...stat} />
                    ))}
                </View>

                {/* Signals Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Top signals today</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Screener')}
                        activeOpacity={0.5}
                        accessibilityRole="button"
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Text style={styles.viewAll}>View all</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.signalsRow}>
                    {topSignals.map((signal) => (
                        <View style={styles.signalChip} key={signal.label}>
                            <View style={styles.signalIconCircle}>{signal.icon}</View>
                            <Text style={styles.signalLabel}>{signal.label}</Text>
                            <Text style={styles.signalCount}>{signal.count} alerts</Text>
                        </View>
                    ))}
                </View>

                {/* Latest Activity Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Latest activity</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Screener')}
                        activeOpacity={0.5}
                        accessibilityRole="button"
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Text style={styles.viewAll}>View all</Text>
                    </TouchableOpacity>
                </View>

                {/* Rendered Trade Cards using View mapping */}
                <View style={styles.tradesList}>
                    {latestTrades.map((item) => (
                        <TradeCard
                            key={item.id}
                            trade={item}
                            onPress={() => navigation.navigate('Details', { tradeId: item.id })}
                        />
                    ))}
                </View>
            </ScrollView>

            {/* Bottom Sticky Action Footer */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.browseButton} onPress={() => navigation.navigate('Screener')}>
                    <Search size={16} color={colors.textPrimary} />
                    <Text style={styles.browseText}>Browse trades</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        padding: spacing.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.md,
    },
    title: {
        color: colors.textPrimary,
        fontSize: 20,
        fontWeight: '500',
    },
    tagline: {
        color: colors.textSecondary,
        fontSize: 11,
        marginTop: 2,
    },
    badge: {
        backgroundColor: colors.surfaceAlt,
        paddingHorizontal: spacing.xs,
        paddingVertical: 4,
        borderRadius: 20,
    },
    badgeText: {
        color: colors.textSecondary,
        fontSize: 9,
        fontWeight: '500',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: radius.card,
        paddingHorizontal: spacing.sm,
        height: 40,
        gap: spacing.xs,
        marginBottom: spacing.md,
    },
    searchPlaceholder: {
        flex: 1,
        color: colors.textSecondary,
        fontSize: 13,
    },
    summaryRow: {
        flexDirection: 'row',
        gap: spacing.xs,
        marginBottom: spacing.md,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    sectionTitle: {
        color: colors.textPrimary,
        fontSize: 14,
        fontWeight: '500',
    },
    viewAll: {
        color: colors.analytics,
        fontSize: 12,
    },
    signalsRow: {
        flexDirection: 'row',
        gap: spacing.xs,
        marginBottom: spacing.md,
    },
    signalChip: {
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: radius.card,
        padding: spacing.sm,
        alignItems: 'flex-start',
    },
    signalIconCircle: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: colors.surfaceAlt,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    signalLabel: {
        color: colors.textPrimary,
        fontSize: 11,
        fontWeight: '500',
        marginBottom: 2,
    },
    signalCount: {
        color: colors.textSecondary,
        fontSize: 9,
    },
    tradesList: {
        gap: spacing.xs,
    },
    footer: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderTopWidth: 0.3,
        borderTopColor: colors.surfaceAlt,
        backgroundColor: colors.background,
    },
    browseButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.surfaceAlt,
        borderRadius: radius.card,
        padding: spacing.md,
        gap: spacing.xs,
    },
    browseText: {
        color: colors.textPrimary,
        fontSize: 14,
        fontWeight: '500',
    },
});
// src/screens/TradeDetailsScreen.tsx
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowDown, ArrowUp, ChevronLeft } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MockActivityChart from '../components/MockActivityChart';
import { mockTrades } from '../data/mockTrades';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, radius, spacing } from '../theme/colors';
import { formatCurrency } from '../utils/formatters';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type DetailsRouteProp = RouteProp<RootStackParamList, 'Details'>;

const TradeDetailsScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<DetailsRouteProp>();
    const { tradeId } = route.params;

    const trade = mockTrades.find((t) => t.id === tradeId);

    if (!trade) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.notFound}>Trade not found.</Text>
            </SafeAreaView>
        );
    }

    const isPurchase = trade.type === 'purchase';
    const actionColor = isPurchase ? colors.purchase : colors.sale;

    const detailRows = [
        { label: 'Insider', value: `${trade.insider} · ${trade.role}` },
        { label: 'Transaction', value: `${isPurchase ? 'Purchase' : 'Sale'} · Code ${trade.transactionCode}` },
        { label: 'Shares', value: `${trade.shares.toLocaleString()} shares` },
        { label: 'Price per share', value: `$${trade.pricePerShare.toFixed(2)} (demo)` },
        { label: 'Total value', value: `${formatCurrency(trade.value)} (demo)` },
        { label: 'Transaction date', value: trade.transactionDate },
        {
            label: 'Filed date',
            value: new Date(trade.filedAt).toLocaleString(undefined, {
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            }),
        },
        { label: 'Signal strength', value: `${trade.signalStrength} · ${trade.signal}` },
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
            <View style={styles.header}>
                <View style={styles.headerTopRow}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                        accessibilityRole="button"
                        accessibilityLabel="Back"
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        <ChevronLeft size={25} color={colors.textPrimary} />
                    </TouchableOpacity>

                    <View style={styles.headerInfo}>
                        <Text style={styles.companyName} numberOfLines={2} ellipsizeMode="tail">
                            {trade.company}
                        </Text>
                        <Text style={styles.subtitle} numberOfLines={1}>
                            {trade.ticker} · {trade.sector}
                        </Text>
                    </View>

                    <Text style={styles.badgeText} numberOfLines={1}>
                        Fictional demo data
                    </Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.signalCard}>

                    <View style={styles.signalValueRow}>
                        <View style={styles.iconWrapper}>
                            {isPurchase ? (
                                <ArrowUp size={25} color={actionColor} />
                            ) : (
                                <ArrowDown size={25} color={actionColor} />
                            )}
                        </View>
                        <View>
                            <Text style={[styles.signalLabel, { color: actionColor }]}>{trade.signal}</Text>
                            <Text style={[styles.signalValue, { color: actionColor }]}>
                                {formatCurrency(trade.value)} fictional demo insider {isPurchase ? 'buy' : 'sale'}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.detailGrid}>
                    {detailRows.map((row) => (
                        <View style={styles.detailRow} key={row.label}>
                            <Text style={styles.detailLabel}>{row.label}</Text>
                            <Text style={styles.detailValue}>{row.value}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.chartCard}>
                    <MockActivityChart data={trade.activityChart} />
                </View>

                <View style={styles.educationCard}>
                    <Text style={styles.educationTitle}>Why this matters</Text>
                    <Text style={styles.educationText}>
                        {isPurchase
                            ? "A senior executive purchase can be a data point for further research because it shows a disclosed transaction by someone close to the company. It does not reveal the person's full financial situation or predict future performance."
                            : "An executive sale can happen for many personal or financial reasons unrelated to company performance. It does not necessarily reflect the company's outlook or predict future stock movement."}
                    </Text>
                </View>

                <View style={styles.disclaimerCard}>
                    <Text style={styles.disclaimerText}>
                        This prototype uses mock data for demonstration only. Insider-trading filings are public
                        disclosures and do not constitute investment advice. Past activity does not guarantee future
                        stock performance.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default TradeDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.sm,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.surfaceAlt,
    },
    headerTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    backButton: {
        flexShrink: 0,
        padding: 2,
    },
    headerInfo: {
        flex: 1,
    },
    companyName: {
        color: colors.textPrimary,
        fontSize: 16,
        fontWeight: '500',
    },
    subtitle: {
        color: colors.textSecondary,
        fontSize: 11,
        marginTop: 1,
    },
    badgeText: {
        backgroundColor: colors.surfaceAlt,
        color: colors.textSecondary,
        fontSize: 9,
        paddingHorizontal: spacing.xs,
        paddingVertical: 4,
        borderRadius: 18,
    },
    scrollContent: {
        padding: spacing.md,
        paddingBottom: spacing.md,
    },
    signalCard: {
        backgroundColor: colors.surface,
        borderRadius: radius.card,
        padding: spacing.md,
        marginBottom: spacing.xs,
    },
    signalLabel: {
        fontSize: 12,
        fontWeight: '600',
        // marginBottom: spacing.xs,
    },
    signalValueRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    iconWrapper: {
        flexShrink: 0,
    },
    signalValue: {
        fontSize: 16,
        fontWeight: '600',
        flexShrink: 1,
    },
    detailGrid: {
        backgroundColor: colors.surface,
        borderRadius: radius.card,
        padding: spacing.sm,
        marginBottom: spacing.sm,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.surfaceAlt,
    },
    detailLabel: {
        color: colors.textSecondary,
        fontSize: 12,
    },
    detailValue: {
        color: colors.textPrimary,
        fontSize: 12,
        fontWeight: '500',
        flexShrink: 1,
        textAlign: 'right',
        marginLeft: spacing.sm,
    },
    chartCard: {
        backgroundColor: colors.surface,
        borderRadius: radius.card,
        padding: spacing.md,
        marginBottom: spacing.sm,
    },
    educationCard: {
        backgroundColor: colors.surface,
        borderRadius: radius.card,
        padding: spacing.md,
        marginBottom: spacing.sm,
    },
    educationTitle: {
        color: colors.analytics,
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 6,
    },
    educationText: {
        color: colors.textSecondary,
        fontSize: 12,
        lineHeight: 18,
    },
    disclaimerCard: {
        backgroundColor: colors.surfaceAlt,
        borderRadius: radius.card,
        padding: spacing.sm,
    },
    disclaimerText: {
        color: colors.textSecondary,
        fontSize: 10,
        lineHeight: 15,
    },
    notFound: {
        color: colors.textPrimary,
        padding: spacing.md,
        textAlign: 'center',
    },
});
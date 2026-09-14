// src/components/TradeCard.tsx
import { ArrowDown, ArrowUp } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, spacing } from '../theme/colors';
import { InsiderTrade } from '../types/trade';
import { avatarColor, formatCurrency, timeAgo } from '../utils/formatters';
import SignalBadge from './SignalBadge';

type TradeCardProps = {
    trade: InsiderTrade;
    onPress: () => void;
};

const TradeCard = ({ trade, onPress }: TradeCardProps) => {
    const isPurchase = trade.type === 'purchase';
    const arrowColor = isPurchase ? colors.purchase : colors.sale;

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={`${trade.ticker}, ${trade.company}, ${isPurchase ? 'purchase' : 'sale'} of ${formatCurrency(
                trade.value
            )} by ${trade.insider}, ${trade.role}`}
        >
            <View style={[styles.avatar, { backgroundColor: avatarColor(trade.ticker) }]}>
                <Text style={styles.avatarText}>{trade.ticker.charAt(0)}</Text>
            </View>

            <View style={styles.middle}>
                <Text style={styles.ticker} numberOfLines={1}>{trade.ticker}</Text>
                <Text style={styles.company} numberOfLines={1} ellipsizeMode="tail">
                    {trade.company}
                </Text>
                <Text style={styles.meta} numberOfLines={1} ellipsizeMode="tail">
                    {trade.insider} ({trade.role})
                </Text>
            </View>

            <View style={styles.right}>
                <View style={styles.typeRow}>
                    {isPurchase ? (
                        <ArrowUp size={12} color={arrowColor} />
                    ) : (
                        <ArrowDown size={12} color={arrowColor} />
                    )}
                    <Text style={[styles.type, { color: arrowColor }]}>
                        {isPurchase ? 'Purchase' : 'Sale'}
                    </Text>
                </View>

                <Text style={styles.value}>{formatCurrency(trade.value)}</Text>

                <View style={styles.bottomRow}>
                    <SignalBadge strength={trade.signalStrength} />
                    <Text style={styles.time}>{timeAgo(trade.filedAt)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default TradeCard;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: radius.card,
        padding: spacing.sm,
        gap: 12,
        // marginBottom: spacing.xs,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: colors.textPrimary,
        fontSize: 15,
        fontWeight: '600',
    },
    middle: {
        flex: 1,
        justifyContent: 'center',
        marginRight: spacing.xs,
    },
    ticker: {
        color: colors.textPrimary,
        fontSize: 14,
        fontWeight: '600',
    },
    company: {
        color: colors.textSecondary,
        fontSize: 12,
        fontWeight: '500',
        marginTop: 2,
    },
    meta: {
        color: colors.textSecondary,
        fontSize: 10,
        marginTop: 2,
        flexShrink: 1,
    },
    right: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        flexShrink: 0,
    },
    typeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    type: {
        fontSize: 11,
        fontWeight: '600',
    },
    value: {
        color: colors.textPrimary,
        fontSize: 13,
        fontWeight: '600',
        marginTop: 2,
    },
    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 4,
    },
    time: {
        color: colors.textSecondary,
        fontSize: 10,
    },
});
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme/colors';

type SummaryCardProps = {
    icon: React.ReactNode;
    label: string;
    value: string;
    sublabel: string;
    valueColor?: string;
};

const SummaryCard = ({ icon, label, value, sublabel, valueColor }: SummaryCardProps) => {
    return (
        <View style={styles.card}>
            <View style={styles.iconCircle}>{icon}</View>
            <Text style={styles.label}>{label}</Text>
            <Text style={[styles.value, valueColor ? { color: valueColor } : null]}>{value}</Text>
            <Text style={styles.sublabel}>{sublabel}</Text>
        </View>
    );
};

export default SummaryCard;

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: radius.card,
        padding: spacing.sm,
    },
    iconCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: colors.surfaceAlt,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    label: {
        color: colors.textSecondary,
        fontSize: 11,
        marginBottom: 2,
    },
    value: {
        color: colors.textPrimary,
        fontSize: 15,
        fontWeight: '500',
        marginBottom: 2,
    },
    sublabel: {
        color: colors.textSecondary,
        fontSize: 9,
    },
});
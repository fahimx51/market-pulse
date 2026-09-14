// src/components/SignalBadge.tsx
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme/colors';

type SignalStrength = 'High' | 'Medium' | 'Low';

type SignalBadgeProps = {
    strength: SignalStrength;
};

const strengthColors: Record<SignalStrength, string> = {
    High: colors.purchase,
    Medium: colors.analytics,
    Low: colors.textSecondary,
};

const SignalBadge = ({ strength }: SignalBadgeProps) => {
    const color = strengthColors[strength];

    return (
        <View style={[styles.badge, { borderColor: color }]}>
            <View style={[styles.dot, { backgroundColor: color }]} />
            <Text style={[styles.text, { color }]}>{strength}</Text>
        </View>
    );
};

export default SignalBadge;

const styles = StyleSheet.create({
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: spacing.xs,
        paddingVertical: 3,
        borderRadius: radius.card,
        borderWidth: 1,
        alignSelf: 'flex-start',
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    text: {
        fontSize: 10,
        fontWeight: '500',
    },
});
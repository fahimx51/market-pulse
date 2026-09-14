import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, radius, spacing } from '../theme/colors';

type FilterChipProps = {
    label: string;
    active: boolean;
    onPress: () => void;
};

const FilterChip = ({ label, active, onPress }: FilterChipProps) => {
    return (
        <TouchableOpacity
            style={[styles.chip, active ? styles.chipActive : null]}
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={label}
            accessibilityState={{ selected: active }}
        >
            <Text style={[styles.text, active ? styles.textActive : null]}>{label}</Text>
        </TouchableOpacity>
    );
};

export default FilterChip;

const styles = StyleSheet.create({
    chip: {
        paddingHorizontal: spacing.sm,
        paddingVertical: 6,
        borderRadius: radius.card,
        backgroundColor: colors.surfaceAlt,
        marginRight: spacing.xs,
        marginBottom: spacing.xs,
    },
    chipActive: {
        backgroundColor: colors.analytics,
    },
    text: {
        color: colors.textSecondary,
        fontSize: 12,
        fontWeight: '500',
    },
    textActive: {
        color: colors.textPrimary,
    },
});
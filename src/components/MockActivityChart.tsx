import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme/colors';

type MockActivityChartProps = {
    data: number[];
};

const MockActivityChart = ({ data }: MockActivityChartProps) => {
    const max = Math.max(...data);

    return (
        <View>
            <View style={styles.chart}>
                {data.map((value, index) => {
                    const heightPercent = max > 0 ? (value / max) * 100 : 0;
                    return (
                        <View key={index} style={styles.barWrapper}>
                            <View style={[styles.bar, { height: `${heightPercent}%` }]} />
                        </View>
                    );
                })}
            </View>
            <Text style={styles.label}>Mock 7-day activity</Text>
        </View>
    );
};

export default MockActivityChart;

const styles = StyleSheet.create({
    chart: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: 60,
        gap: 4,
    },
    barWrapper: {
        flex: 1,
        height: '100%',
        justifyContent: 'flex-end',
    },
    bar: {
        backgroundColor: colors.analytics,
        minHeight: 4,
    },
    label: {
        color: colors.analyticsAlt,
        fontSize: 9,
        marginTop: spacing.xs,
        fontStyle: 'italic',
    },
});
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FilterChip from '../components/FilterChip';
import TradeCard from '../components/TradeCard';
import { mockTrades } from '../data/mockTrades';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, radius, spacing } from '../theme/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type TypeFilter = 'All' | 'Purchase' | 'Sale';
type RoleFilter = 'All' | 'CEO' | 'CFO' | 'Director';
type ValueFilter = 'Any' | 100000 | 500000 | 1000000;

const ScreenerScreen = () => {
    const navigation = useNavigation<NavigationProp>();

    const [searchText, setSearchText] = useState('');
    const [typeFilter, setTypeFilter] = useState<TypeFilter>('All');
    const [roleFilter, setRoleFilter] = useState<RoleFilter>('All');
    const [valueFilter, setValueFilter] = useState<ValueFilter>('Any');
    const [filtersOpen, setFiltersOpen] = useState(false);

    const activeFilterCount =
        (typeFilter !== 'All' ? 1 : 0) + (roleFilter !== 'All' ? 1 : 0) + (valueFilter !== 'Any' ? 1 : 0);

    const filteredTrades = useMemo(() => {
        const cleanSearch = searchText.trim().toLowerCase();

        return mockTrades.filter((trade) => {
            const matchesSearch =
                cleanSearch === '' ||
                trade.ticker.toLowerCase().includes(cleanSearch) ||
                trade.company.toLowerCase().includes(cleanSearch);

            const matchesType =
                typeFilter === 'All' ||
                (typeFilter === 'Purchase' && trade.type === 'purchase') ||
                (typeFilter === 'Sale' && trade.type === 'sale');

            const matchesRole = roleFilter === 'All' || trade.role === roleFilter;

            const matchesValue = valueFilter === 'Any' || trade.value >= valueFilter;

            return matchesSearch && matchesType && matchesRole && matchesValue;
        });
    }, [searchText, typeFilter, roleFilter, valueFilter]);

    // console.log(filteredTrades);

    const clearFilters = () => {
        setSearchText('');
        setTypeFilter('All');
        setRoleFilter('All');
        setValueFilter('Any');
    };

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
            {/* Header Row: Search Bar + Icon Filter Toggle */}
            <View style={styles.headerRow}>
                <View style={styles.searchBar}>
                    <Search size={18} color={colors.textSecondary} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search ticker or company"
                        placeholderTextColor={colors.textSecondary}
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                </View>

                <TouchableOpacity
                    style={[
                        styles.filterToggle,
                        (filtersOpen || activeFilterCount > 0) && styles.filterToggleActive,
                    ]}
                    onPress={() => setFiltersOpen(!filtersOpen)}
                    accessibilityRole="button"
                    accessibilityLabel={filtersOpen ? 'Hide filters' : 'Show filters'}
                    activeOpacity={0.7}
                >
                    <SlidersHorizontal
                        size={18}
                        color={activeFilterCount > 0 ? colors.analytics : colors.textPrimary}
                    />

                    {/* Absolute Positioned Filter Badge */}
                    {activeFilterCount > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{activeFilterCount}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            {/* Expandable Filter Panel */}
            {filtersOpen && (
                <View style={styles.filterPanel}>
                    <View style={styles.filterHeader}>
                        <Text style={styles.filterTitle}>Filters</Text>
                        <TouchableOpacity onPress={clearFilters} activeOpacity={0.5}>
                            <Text style={styles.clearAll}>Clear all</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.filterLabel}>Action</Text>
                    <View style={styles.chipRow}>
                        {(['All', 'Purchase', 'Sale'] as TypeFilter[]).map((option) => (
                            <FilterChip
                                key={option}
                                label={option}
                                active={typeFilter === option}
                                onPress={() => setTypeFilter(option)}
                            />
                        ))}
                    </View>

                    <Text style={styles.filterLabel}>Value threshold</Text>
                    <View style={styles.chipRow}>
                        <FilterChip label="Any" active={valueFilter === 'Any'} onPress={() => setValueFilter('Any')} />
                        <FilterChip label="$100K+" active={valueFilter === 100000} onPress={() => setValueFilter(100000)} />
                        <FilterChip label="$500K+" active={valueFilter === 500000} onPress={() => setValueFilter(500000)} />
                        <FilterChip label="$1M+" active={valueFilter === 1000000} onPress={() => setValueFilter(1000000)} />
                    </View>

                    <Text style={styles.filterLabel}>Insider Role</Text>
                    <View style={styles.chipRow}>
                        {(['All', 'CEO', 'CFO', 'Director'] as RoleFilter[]).map((option) => (
                            <FilterChip
                                key={option}
                                label={option}
                                active={roleFilter === option}
                                onPress={() => setRoleFilter(option)}
                            />
                        ))}
                    </View>
                </View>
            )}

            {/* Results Count Line */}
            <Text style={styles.resultCount}>{filteredTrades.length} results</Text>

            {/* Filtered Trade List */}
            <FlatList
                data={filteredTrades}
                keyExtractor={(item) => item.id}
                style={styles.list}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <TradeCard trade={item} onPress={() => navigation.navigate('Details', { tradeId: item.id })} />
                )}
                ItemSeparatorComponent={() => <View style={{ height: spacing.xs }} />}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No fictional demo trades match those filters.</Text>
                        <TouchableOpacity onPress={clearFilters} style={styles.clearButton}>
                            <Text style={styles.clearButtonText}>Clear filters</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

export default ScreenerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: spacing.md,
        paddingTop: spacing.sm,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        marginBottom: spacing.sm,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: radius.card,
        paddingHorizontal: spacing.sm,
        height: 40,
        gap: spacing.xs,
        borderWidth: 1,
        borderColor: colors.surfaceAlt,
    },
    searchInput: {
        flex: 1,
        color: colors.textPrimary,
        fontSize: 13,
    },
    filterToggle: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surface,
        borderRadius: radius.card,
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: colors.surfaceAlt,
    },
    filterToggleActive: {
        borderColor: colors.analytics,
        backgroundColor: colors.surfaceAlt,
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: colors.analytics,
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
        borderWidth: 1.5,
        borderColor: colors.background,
    },
    badgeText: {
        color: colors.background,
        fontSize: 10,
        fontWeight: '700',
    },
    filterPanel: {
        backgroundColor: colors.surface,
        borderRadius: radius.card,
        padding: spacing.sm,
        marginBottom: spacing.sm,
        borderWidth: 1,
        borderColor: colors.surfaceAlt,
    },
    filterHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xs,
        paddingBottom: 6,
        borderBottomWidth: 1,
        borderBottomColor: colors.surfaceAlt,
    },
    filterTitle: {
        color: colors.textPrimary,
        fontSize: 14,
        fontWeight: '500',
    },
    clearAll: {
        color: colors.analytics,
        fontSize: 12,
    },
    filterLabel: {
        color: colors.textSecondary,
        fontSize: 11,
        marginTop: spacing.xs,
        marginBottom: 6,
    },
    chipRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.xs,
    },
    resultCount: {
        color: colors.textSecondary,
        fontSize: 11,
        marginBottom: spacing.xs,
    },
    list: {
        flex: 1,
    },
    listContent: {
        paddingBottom: spacing.md,
        marginTop: spacing.xs,
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: spacing.xl,
    },
    emptyText: {
        color: colors.textSecondary,
        fontSize: 13,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    clearButton: {
        backgroundColor: colors.surfaceAlt,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: radius.card,
    },
    clearButtonText: {
        color: colors.textPrimary,
        fontSize: 13,
        fontWeight: '500',
    },
});
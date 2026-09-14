import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ScreenerScreen from '../screens/ScreenerScreen';
import TradeDetailsScreen from '../screens/TradeDetailsScreen';
import { colors } from '../theme/colors';

export type RootStackParamList = {
    Home: undefined;
    Screener: undefined;
    Details: { tradeId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerStyle: { backgroundColor: colors.surface },
                    headerTintColor: colors.textPrimary,
                    headerShadowVisible: false,
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Screener" component={ScreenerScreen} options={{ title: 'Screener' }} />
                <Stack.Screen name="Details" component={TradeDetailsScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DashboardScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [selectedStatus, setSelectedStatus] = useState(null);

    const statusData = [
        { label: 'Running', count: 254, color: '#4CAF50' },
        { label: 'Idle', count: 131, color: '#FF9800' },
        { label: 'Stop', count: 1260, color: '#F44336' },
        { label: 'Unread', count: 200, color: '#6C3FE8' },
        { label: 'New', count: 44, color: '#9E9E9E' },
    ];

    const vehicles = [
        {
            id: 1,
            name: 'RJ22TA3910',
            owner: '(rajsa)',
            icon: '🚗',
            speed: '0 km/h',
            fuelUsed: '0.00 L',
            distance: '0 km',
            since: '52d 12h 59m',
            location: 'Begti Khurd Rajasthan 342301 India',
            timestamp: '28/11/2025 17:39:02',
        },
        {
            id: 2,
            name: 'SIYARAM',
            owner: '(RJ21GB0534)',
            icon: '🚚',
            speed: '0 km/h',
            fuelUsed: '2.91 L',
            distance: '0 km',
            since: '141d 14h 17m',
            location: "Dr. Anil's Kothari Dental Hospital, Merta City, Merta Tehsil, Rajasthan, 341510, India",
            timestamp: '31/08/2025 16:29:03',
        },
        {
            id: 3,
            name: 'RJ14TE7995',
            owner: '',
            icon: '🚗',
            speed: '0 km/h',
            fuelUsed: '9.48 L',
            distance: '0 km',
            since: '69d 13h 29m',
            location: '',
            timestamp: '',
        },
    ];

    return (
        <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.menuButton}>
                        <View style={styles.menuIcon}>
                            <View style={styles.menuLine} />
                            <View style={styles.menuLine} />
                            <View style={styles.menuLine} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Dashboard</Text>
                    <View style={styles.headerSpacer} />
                </View>

                {/* Status Cards */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.statusScrollView}
                    contentContainerStyle={styles.statusContainer}>
                    {statusData.map((status, index) => {
                        const isSelected = selectedStatus === status.label;
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setSelectedStatus(isSelected ? null : status.label)}
                                style={[
                                    styles.statusCard,
                                    isSelected && styles.statusCardSelected,
                                ]}
                                activeOpacity={0.7}>
                                <Text
                                    style={[
                                        styles.statusLabel,
                                        isSelected && styles.statusLabelSelected,
                                    ]}>
                                    {status.label}
                                </Text>
                                <Text
                                    style={[
                                        styles.statusCount,
                                        isSelected && styles.statusCountSelected,
                                    ]}>
                                    {status.count}
                                </Text>
                                <View
                                    style={[
                                        styles.statusUnderline,
                                        { backgroundColor: isSelected ? '#fff' : status.color }
                                    ]}
                                />
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                {/* Vehicle List */}
                <ScrollView style={styles.vehicleList} showsVerticalScrollIndicator={false}>
                    {vehicles.map((vehicle) => (
                        <TouchableOpacity
                            key={vehicle.id}
                            style={styles.vehicleCard}
                            onPress={() => navigation.navigate('Map', { vehicle })}
                            activeOpacity={0.7}
                        >
                            {/* Vehicle Header */}
                            <View style={styles.vehicleHeader}>
                                <Text style={styles.vehicleIcon}>{vehicle.icon}</Text>
                                <View style={styles.vehicleInfo}>
                                    <Text style={styles.vehicleName}>{vehicle.name}</Text>
                                    {vehicle.owner && (
                                        <Text style={styles.vehicleOwner}>{vehicle.owner}</Text>
                                    )}
                                </View>
                            </View>

                            {/* Vehicle Stats */}
                            <View style={styles.statsContainer}>
                                <View style={styles.statsRow}>
                                    <View style={styles.statItem}>
                                        <View style={styles.statIconContainer}>
                                            <Text style={styles.statIconText}>🚫</Text>
                                        </View>
                                        <Text style={styles.statLabel}>Speed</Text>
                                        <Text style={styles.statValue}>{vehicle.speed}</Text>
                                    </View>
                                    <View style={styles.statItem}>
                                        <View style={styles.statIconContainer}>
                                            <Text style={styles.statIconText}>⛽</Text>
                                        </View>
                                        <Text style={styles.statLabel}>Fuel Used</Text>
                                        <Text style={styles.statValue}>{vehicle.fuelUsed}</Text>
                                    </View>
                                </View>
                                <View style={styles.statsRow}>
                                    <View style={styles.statItem}>
                                        <View style={styles.statIconContainer}>
                                            <Text style={styles.statIconText}>📍</Text>
                                        </View>
                                        <Text style={styles.statLabel}>Distance</Text>
                                        <Text style={styles.statValue}>{vehicle.distance}</Text>
                                    </View>
                                    <View style={styles.statItem}>
                                        <View style={styles.statIconContainer}>
                                            <Text style={styles.statIconText}>⏱️</Text>
                                        </View>
                                        <Text style={styles.statLabel}>Since</Text>
                                        <Text style={styles.statValue}>{vehicle.since}</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Location */}
                            {vehicle.location && (
                                <View style={styles.locationContainer}>
                                    <Text style={styles.locationIcon}>📍</Text>
                                    <Text style={styles.locationText}>{vehicle.location}</Text>
                                </View>
                            )}

                            {/* Footer */}
                            <View style={styles.vehicleFooter}>
                                {vehicle.timestamp && (
                                    <Text style={styles.timestamp}>{vehicle.timestamp}</Text>
                                )}
                                <View style={styles.footerIcons}>
                                    <TouchableOpacity style={styles.footerIcon}>
                                        <Text style={styles.footerIconText}>📹</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.footerIcon}>
                                        <Text style={styles.footerIconText}>🔋</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.footerIcon}>
                                        <Text style={styles.footerIconText}>📶</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.footerIcon}>
                                        <View style={styles.moreIcon}>
                                            <Text style={styles.moreIconText}>⋮</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    // Header Styles
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    menuButton: {
        padding: 8,
    },
    menuIcon: {
        width: 24,
        height: 24,
        justifyContent: 'space-around',
    },
    menuLine: {
        width: 24,
        height: 3,
        backgroundColor: '#333',
        borderRadius: 2,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        flex: 1,
        textAlign: 'center',
    },
    headerSpacer: {
        width: 40,
    },
    // Status Cards Styles
    statusScrollView: {
        backgroundColor: '#fff',
        maxHeight: 100,
    },
    statusContainer: {
        paddingHorizontal: 12,
        paddingVertical: 16,
        gap: 8,
    },
    statusCard: {
        minWidth: 100,
        padding: 12,
        marginHorizontal: 4,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusCardSelected: {
        backgroundColor: '#6C3FE8',
        borderColor: '#6C3FE8',
        transform: [{ scale: 1.02 }],
    },
    statusLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    statusLabelSelected: {
        color: '#fff',
    },
    statusCount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    statusCountSelected: {
        color: '#fff',
    },
    statusUnderline: {
        width: '100%',
        height: 3,
        borderRadius: 2,
        marginTop: 4,
    },
    // Vehicle List Styles
    vehicleList: {
        flex: 1,
        paddingTop: 8,
    },
    vehicleCard: {
        backgroundColor: '#fff',
        marginHorizontal: 12,
        marginBottom: 12,
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    vehicleHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    vehicleIcon: {
        fontSize: 48,
        marginRight: 12,
    },
    vehicleInfo: {
        flex: 1,
    },
    vehicleName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    vehicleOwner: {
        fontSize: 14,
        color: '#999',
        marginTop: 2,
    },
    // Stats Styles
    statsContainer: {
        marginBottom: 12,
    },
    statsRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    statItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    statIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    statIconText: {
        fontSize: 16,
    },
    statLabel: {
        fontSize: 12,
        color: '#999',
        marginRight: 4,
    },
    statValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    // Location Styles
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        marginBottom: 8,
    },
    locationIcon: {
        fontSize: 16,
        marginRight: 8,
        marginTop: 2,
    },
    locationText: {
        flex: 1,
        fontSize: 13,
        color: '#666',
        lineHeight: 18,
    },
    // Footer Styles
    vehicleFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    timestamp: {
        fontSize: 12,
        color: '#999',
    },
    footerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    footerIcon: {
        padding: 4,
    },
    footerIconText: {
        fontSize: 18,
    },
    moreIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    moreIconText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666',
    },
});

export default DashboardScreen;

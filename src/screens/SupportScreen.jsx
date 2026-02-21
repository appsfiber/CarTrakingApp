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

const SupportScreen = () => {
    const insets = useSafeAreaInsets();
    const [selectedVehicle] = useState('HR16AA7016 (BOLERO)');

    const tripReports = [
        {
            id: 1,
            startTime: '22/01/2026 12:14',
            endTime: '22/01/2026 12:15',
            duration: '36S',
            distance: '0.00',
            startLocation: 'Loharu - Bhiwani Rd, Malwas Devsar, Haryana 127021, India',
            endLocation: 'Loharu - Bhiwani Rd, Malwas Devsar, Haryana 127021, India',
            borderColor: '#4CAF50',
        },
        {
            id: 2,
            startTime: '22/01/2026 12:44',
            endTime: '22/01/2026 14:21',
            duration: '1H 37M 19S',
            distance: '92.76',
            startLocation: 'Loharu - Bhiwani Rd, Malwas Devsar, Haryana 127021, India',
            endLocation: 'Loharu - Bhiwani Rd, Malwas Devsar, Haryana 127021, India',
            borderColor: '#4CAF50',
        },
        {
            id: 3,
            startTime: '22/01/2026 14:25',
            endTime: '22/01/2026 16:09',
            duration: '1H 44M 11S',
            distance: '87.24',
            startLocation: 'Loharu - Bhiwani Rd, Malwas Devsar, Haryana 127021, India',
            endLocation: 'Julani, Haryana 126102, India',
            borderColor: '#4CAF50',
        },
        {
            id: 4,
            startTime: '22/01/2026 16:30',
            endTime: '22/01/2026 17:49',
            duration: '1H 19M 28S',
            distance: '74.57',
            startLocation: 'Julani, Haryana 126102, India',
            endLocation: 'SH 17, Bhiwani, Haryana 127021, India',
            borderColor: '#4CAF50',
        },
    ];

    const totalDistance = '254.57';
    const totalDuration = '4h 41m 34s';

    return (
        <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerSpacer} />
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitle}>Status Report</Text>
                        <Text style={styles.headerSubtitle}>{selectedVehicle}</Text>
                    </View>
                    <View style={styles.headerSpacer} />
                </View>

                {/* Trip Reports List */}
                <ScrollView
                    style={styles.reportList}
                    contentContainerStyle={styles.reportListContent}
                    showsVerticalScrollIndicator={false}>
                    {tripReports.map((trip) => (
                        <TouchableOpacity
                            key={trip.id}
                            style={[styles.reportCard, { borderLeftColor: trip.borderColor }]}
                            activeOpacity={0.7}>
                            {/* Time Range */}
                            <View style={styles.timeRow}>
                                <Text style={styles.clockIcon}>🕐</Text>
                                <Text style={styles.timeText}>
                                    {trip.startTime} to {trip.endTime}
                                </Text>
                            </View>

                            {/* Stats Row */}
                            <View style={styles.statsRow}>
                                <View style={styles.statItem}>
                                    <Text style={styles.statIcon}>⏱️</Text>
                                    <Text style={styles.statText}>{trip.duration}</Text>
                                </View>
                                <View style={styles.statItem}>
                                    <Text style={styles.statIcon}>🛣️</Text>
                                    <Text style={styles.statText}>{trip.distance}</Text>
                                </View>
                            </View>

                            {/* Locations */}
                            <View style={styles.locationsContainer}>
                                <View style={styles.locationRow}>
                                    <View style={[styles.locationDot, styles.startDot]} />
                                    <Text style={styles.locationText}>{trip.startLocation}</Text>
                                </View>
                                <View style={styles.locationRow}>
                                    <View style={[styles.locationDot, styles.endDot]} />
                                    <Text style={styles.locationText}>{trip.endLocation}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Footer Summary */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Total Distance: <Text style={styles.footerValue}>{totalDistance} km</Text>
                    </Text>
                    <Text style={styles.footerText}>
                        Total Duration: <Text style={styles.footerValue}>{totalDuration}</Text>
                    </Text>
                </View>

                {/* Floating Action Button */}
                <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
                    <Text style={styles.fabIcon}>+</Text>
                </TouchableOpacity>
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
        backgroundColor: '#E8E8E8',
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
    headerSpacer: {
        width: 40,
    },
    headerTitleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    // Report List Styles
    reportList: {
        flex: 1,
    },
    reportListContent: {
        padding: 16,
        paddingBottom: 80,
    },
    reportCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        borderLeftWidth: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    // Time Row
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    clockIcon: {
        fontSize: 18,
        marginRight: 8,
    },
    timeText: {
        fontSize: 14,
        color: '#333',
        flex: 1,
    },
    // Stats Row
    statsRow: {
        flexDirection: 'row',
        marginBottom: 12,
        gap: 24,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statIcon: {
        fontSize: 16,
        marginRight: 6,
    },
    statText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    // Locations
    locationsContainer: {
        gap: 8,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    locationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginTop: 6,
        marginRight: 8,
    },
    startDot: {
        backgroundColor: '#4CAF50',
    },
    endDot: {
        backgroundColor: '#F44336',
    },
    locationText: {
        fontSize: 13,
        color: '#666',
        flex: 1,
        lineHeight: 18,
    },
    // Footer Styles
    footer: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerText: {
        fontSize: 13,
        color: '#666',
    },
    footerValue: {
        fontWeight: '600',
        color: '#333',
    },
    // FAB Styles
    fab: {
        position: 'absolute',
        right: 24,
        bottom: 90,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    fabIcon: {
        fontSize: 32,
        color: '#666',
        fontWeight: '300',
    },
});

export default SupportScreen;

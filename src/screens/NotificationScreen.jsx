import React from 'react';
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

const NotificationScreen = () => {
    const insets = useSafeAreaInsets();
    const notifications = [
        {
            id: 1,
            vehicleId: 'RJ15UA2774',
            timestamp: '20/01/2026 18:36',
            alertType: 'Overspeeding with 80',
            location: 'Jaisalmer - Barmer - Sanchore - Radhanpur Road, Goonga, Rajasthan 344705, India',
            iconColor: '#FF9800',
        },
        {
            id: 2,
            vehicleId: 'RJ15UA2774',
            timestamp: '20/01/2026 18:33',
            alertType: 'Overspeeding with 80',
            location: 'Jaisalmer - Barmer - Sanchore - Radhanpur Road, Goonga, Rajasthan 344701, India',
            iconColor: '#FF9800',
        },
        {
            id: 3,
            vehicleId: 'RJ15UA2774',
            timestamp: '20/01/2026 18:30',
            alertType: 'vehicle is idle',
            location: 'Jaisalmer - Barmer - Sanchore - Radhanpur Road, Goonga, Rajasthan 344701, India',
            iconColor: '#FFC107',
        },
        {
            id: 4,
            vehicleId: 'RJ15UA2774',
            timestamp: '20/01/2026 18:21',
            alertType: 'Overspeeding with 80',
            location: 'Jaisalmer - Barmer - Sanchore - Radhanpur Road, Shiv, Rajasthan 344701, India',
            iconColor: '#FF9800',
        },
        {
            id: 5,
            vehicleId: 'RJ15UA2774',
            timestamp: '20/01/2026 18:10',
            alertType: 'Overspeeding with 80',
            location: 'Jaisalmer - Barmer - Sanchore - Radhanpur Road, Nimbla, Rajasthan 344701, India',
            iconColor: '#FF9800',
        },
    ];

    return (
        <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerSpacer} />
                    <Text style={styles.headerTitle}>Notification Alerts</Text>
                    <View style={styles.headerSpacer} />
                </View>

                {/* Notification List */}
                <ScrollView
                    style={styles.notificationList}
                    contentContainerStyle={styles.notificationListContent}
                    showsVerticalScrollIndicator={false}>
                    {notifications.map((notification) => (
                        <TouchableOpacity
                            key={notification.id}
                            style={styles.notificationCard}
                            activeOpacity={0.7}>
                            {/* Icon */}
                            <View style={[styles.iconContainer, { backgroundColor: notification.iconColor }]}>
                                <Text style={styles.iconText}>⚡</Text>
                            </View>

                            {/* Content */}
                            <View style={styles.notificationContent}>
                                <View style={styles.notificationHeader}>
                                    <Text style={styles.vehicleId}>{notification.vehicleId}</Text>
                                    <Text style={styles.timestamp}>{notification.timestamp}</Text>
                                </View>
                                <Text style={styles.alertType}>{notification.alertType}</Text>
                                <Text style={styles.location}>{notification.location}</Text>
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
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        flex: 1,
        textAlign: 'center',
    },
    headerSpacer: {
        width: 56,
    },
    // Notification List Styles
    notificationList: {
        flex: 1,
    },
    notificationListContent: {
        padding: 16,
        paddingBottom: 24,
    },
    notificationCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    iconText: {
        fontSize: 20,
        color: '#fff',
    },
    notificationContent: {
        flex: 1,
    },
    notificationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 6,
    },
    vehicleId: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    timestamp: {
        fontSize: 13,
        color: '#666',
    },
    alertType: {
        fontSize: 14,
        color: '#333',
        marginBottom: 6,
    },
    location: {
        fontSize: 13,
        color: '#666',
        lineHeight: 18,
    },
});

export default NotificationScreen;

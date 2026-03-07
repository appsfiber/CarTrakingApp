import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Platform,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const customMapStyle = [
    { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { featureType: "water", stylers: [{ color: "#e9e9e9" }] },
    { featureType: "road", stylers: [{ color: "#ffffff" }] },
];

// Vehicle data with coordinates
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
        coordinates: { latitude: 26.6518, longitude: 75.0479 }, // Begti Khurd
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
        coordinates: { latitude: 26.6404, longitude: 74.0489 }, // Merta City
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
        coordinates: { latitude: 26.6124, longitude: 74.7873 }, // Jaipur (default)
    },
];

const MapScreen = ({ route, navigation }) => {
    const insets = useSafeAreaInsets();
    const { vehicle } = route.params || {};
    const mapRef = useRef(null);
    const [selectedCar, setSelectedCar] = useState(null);

    return (
        <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top - 30 }]}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backButtonText}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>
                        {vehicle ? vehicle.name : 'Map View'}
                    </Text>
                    <View style={styles.headerSpacer} />
                </View>

                {/* Map */}
                <MapView
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                        latitude: 26.6349,
                        longitude: 74.6280,
                        latitudeDelta: 0.1,
                        longitudeDelta: 1.2,
                    }}
                    showsUserLocation={false}
                    showsMyLocationButton={false}
                    showsCompass={true}
                    customMapStyle={customMapStyle}
                >
                    {/* Vehicle Markers */}
                    {vehicles.map((vehicle) => (
                        <Marker
                            key={vehicle.id}
                            coordinate={vehicle.coordinates}
                            title={vehicle.name}
                            description={vehicle.owner}
                            onPress={() => setSelectedCar(vehicle)}
                        >
                            <View style={styles.carMarker}>
                                <Text style={styles.carMarkerIcon}>{vehicle.icon}</Text>
                            </View>
                        </Marker>
                    ))}
                </MapView>

                {/* Car Details Card (when selectedCar exists) */}
                {selectedCar && (
                    <View style={styles.infoCard}>
                        <View style={styles.cardHeader}>
                            <View style={styles.infoHeader}>
                                <Text style={styles.vehicleIcon}>{selectedCar.icon}</Text>
                                <View style={styles.vehicleDetails}>
                                    <Text style={styles.vehicleName}>{selectedCar.name}</Text>
                                    {selectedCar.owner && (
                                        <Text style={styles.vehicleOwner}>{selectedCar.owner}</Text>
                                    )}
                                </View>
                            </View>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setSelectedCar(null)}
                            >
                                <Text style={styles.closeButtonText}>×</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.detailsContainer}>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Speed:</Text>
                                <Text style={styles.detailValue}>{selectedCar.speed}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Distance:</Text>
                                <Text style={styles.detailValue}>{selectedCar.distance}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Fuel Used:</Text>
                                <Text style={styles.detailValue}>{selectedCar.fuelUsed}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Idle Since:</Text>
                                <Text style={styles.detailValue}>{selectedCar.since}</Text>
                            </View>
                            {selectedCar.location ? (
                                <View style={styles.locationInfo}>
                                    <Text style={styles.locationLabel}>Location:</Text>
                                    <Text style={styles.locationValue}>{selectedCar.location}</Text>
                                </View>
                            ) : null}
                            {selectedCar.timestamp ? (
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Last Update:</Text>
                                    <Text style={styles.detailValue}>{selectedCar.timestamp}</Text>
                                </View>
                            ) : null}
                        </View>
                    </View>
                )}
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 12,
        paddingTop: Platform.OS === 'ios' ? 50 : 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        zIndex: 10,
    },
    backButton: {
        padding: 8,
    },
    backButtonText: {
        fontSize: 28,
        color: '#6C3FE8',
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        flex: 1,
        textAlign: 'center',
    },
    headerSpacer: {
        width: 44,
    },
    map: {
        flex: 1,
    },
    carMarker: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 6,
        borderWidth: 2,
        borderColor: '#6C3FE8',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    carMarkerIcon: {
        fontSize: 24,
    },
    infoCard: {
        position: 'absolute',
        bottom: 20,
        left: 16,
        right: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    infoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    closeButton: {
        padding: 4,
        marginLeft: 8,
    },
    closeButtonText: {
        fontSize: 32,
        color: '#666',
        fontWeight: '300',
        lineHeight: 32,
    },
    vehicleIcon: {
        fontSize: 40,
        marginRight: 12,
    },
    vehicleDetails: {
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
    detailsContainer: {
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 6,
    },
    detailLabel: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    detailValue: {
        fontSize: 14,
        color: '#333',
        fontWeight: '600',
    },
    statusText: {
        fontWeight: 'bold',
    },
    locationInfo: {
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        marginTop: 6,
    },
    locationLabel: {
        fontSize: 12,
        color: '#999',
        marginBottom: 4,
    },
    locationValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
});

export default MapScreen;
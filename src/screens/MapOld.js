import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    PermissionsAndroid,
    Alert,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const customMapStyle = [
    { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { featureType: "water", stylers: [{ color: "#e9e9e9" }] },
    { featureType: "road", stylers: [{ color: "#ffffff" }] },
];

const MapScreen = ({ route, navigation }) => {
    const insets = useSafeAreaInsets();
    const { vehicle } = route.params || {};
    const mapRef = useRef(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const [loadingLocation, setLoadingLocation] = useState(true);
    const [error, setError] = useState(null);

    // ----------------------------------------
    //   ASK LOCATION PERMISSION
    // ----------------------------------------
    useEffect(() => {
        const requestPermission = async () => {
            if (Platform.OS === 'android') {
                try {
                    const fine = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Location Permission',
                            message: 'This app needs access to your location.',
                            buttonNeutral: 'Ask Me Later',
                            buttonNegative: 'Cancel',
                            buttonPositive: 'OK',
                        }
                    );

                    if (fine !== PermissionsAndroid.RESULTS.GRANTED) {
                        Alert.alert('Location Required', 'Enable GPS to continue');
                        setLoadingLocation(false);
                        setError('Location permission denied');
                        return;
                    }
                } catch (err) {
                    console.warn(err);
                    setLoadingLocation(false);
                    setError('Error requesting location permission');
                    return;
                }
            }

            getUserLocation();
        };

        requestPermission();
    }, []);

    // ----------------------------------------
    //  PRIMARY LOCATION GETTER
    // ----------------------------------------
    const getUserLocation = () => {
        setLoadingLocation(true);
        setError(null);

        Geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude, accuracy } = pos.coords;

                console.log('FAST Location:', latitude, longitude, 'accuracy:', accuracy);

                if (accuracy > 80 && retryCount < 2) {
                    console.log('Accuracy low. Retrying...');
                    retryLocation();
                    return;
                }

                updateLocation(latitude, longitude);
            },
            (err) => {
                console.log('GPS ERROR:', err);
                retryLocation();
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 3000,
            }
        );
    };

    // ----------------------------------------
    //  RETRY (LOW ACCURACY MODE)
    // ----------------------------------------
    const retryLocation = () => {
        setLoadingLocation(true);

        if (retryCount >= 2) {
            console.log('Using last known location');
            getLastKnownLocation();
            return;
        }

        setRetryCount((c) => c + 1);

        setTimeout(() => {
            Geolocation.getCurrentPosition(
                (pos) => {
                    console.log('Retry Success:', pos.coords);
                    updateLocation(pos.coords.latitude, pos.coords.longitude);
                },
                (err) => {
                    console.log('Retry Failed:', err);
                    getLastKnownLocation();
                },
                {
                    enableHighAccuracy: false,
                    timeout: 10000,
                    maximumAge: 10000,
                }
            );
        }, 1500);
    };

    // ----------------------------------------
    //  LAST KNOWN LOCATION (FALLBACK)
    // ----------------------------------------
    const getLastKnownLocation = () => {
        setLoadingLocation(true);

        Geolocation.getCurrentPosition(
            (pos) => {
                console.log('Last known location:', pos.coords);
                updateLocation(pos.coords.latitude, pos.coords.longitude);
            },
            (err) => {
                console.log('Last known failed:', err);
                setError('Unable to detect location. Using default location.');
                setLoadingLocation(false);
                // Set default location (Rajasthan, India)
                updateLocation(26.9124, 75.7873);
            },
            {
                enableHighAccuracy: false,
                timeout: 8000,
                maximumAge: 60000,
            }
        );
    };

    // ----------------------------------------
    //  UPDATE LOCATION + ZOOM
    // ----------------------------------------
    const updateLocation = (latitude, longitude) => {
        const location = { latitude, longitude };
        setCurrentLocation(location);
        setLoadingLocation(false);

        setTimeout(() => {
            mapRef.current?.animateToRegion(
                {
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                },
                500
            );
        }, 400);
    };

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
                    initialRegion={currentLocation || {
                        latitude: 26.9124,
                        longitude: 75.7873,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                    showsUserLocation={false}
                    showsMyLocationButton={true}
                    showsCompass={true}
                    customMapStyle={customMapStyle}
                >
                    {currentLocation && (
                        <Marker
                            coordinate={currentLocation}
                            title="Your Location"
                            description="You are here"
                            pinColor="#6C3FE8"
                        />
                    )}
                </MapView>

                {/* GPS LOADING MESSAGE (CENTERED) */}
                {loadingLocation && (
                    <View style={styles.loadingBox}>
                        <Text style={styles.loadingText}>Detecting location…</Text>
                    </View>
                )}

                {/* Vehicle Info Card (if vehicle data is passed) */}
                {vehicle && currentLocation && !loadingLocation && (
                    <View style={styles.infoCard}>
                        <View style={styles.infoHeader}>
                            <Text style={styles.vehicleIcon}>{vehicle.icon}</Text>
                            <View style={styles.vehicleDetails}>
                                <Text style={styles.vehicleName}>{vehicle.name}</Text>
                                {vehicle.owner && (
                                    <Text style={styles.vehicleOwner}>{vehicle.owner}</Text>
                                )}
                            </View>
                        </View>
                        <View style={styles.locationInfo}>
                            <Text style={styles.locationLabel}>Current Coordinates:</Text>
                            <Text style={styles.locationValue}>
                                {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
                            </Text>
                        </View>
                    </View>
                )}

                {/* Error Message */}
                {error && !loadingLocation && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity
                            style={styles.retryButton}
                            onPress={() => {
                                setRetryCount(0);
                                getUserLocation();
                            }}
                        >
                            <Text style={styles.retryButtonText}>Retry</Text>
                        </TouchableOpacity>
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
    loadingBox: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -80 }, { translateY: -20 }],
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 10,
        zIndex: 9999,
        elevation: 15,
    },
    loadingText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
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
    infoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
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
    locationInfo: {
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
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
    errorContainer: {
        position: 'absolute',
        top: 100,
        left: 16,
        right: 16,
        backgroundColor: '#F44336',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    errorText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
        marginBottom: 12,
    },
    retryButton: {
        paddingHorizontal: 24,
        paddingVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 6,
    },
    retryButtonText: {
        color: '#F44336',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default MapScreen;

import { useEffect, useState } from "react";

export interface Location {
  lat: number | null;
  lng: number | null;
}

export default function useGeolocation() {
  const [location, setLocation] = useState<Location>({ lat: null, lng: null });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      (err: GeolocationPositionError) => {
        setError(err.message);
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  return { location, error, loading };
}

import "@goongmaps/goong-js/dist/goong-js.css";

// @ts-expect-error: Library not support Typescript.
import * as GoongJS from "@goongmaps/goong-js";
import type { InteractiveMapProps } from "@goongmaps/goong-map-react/src/components/interactive-map";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";

import { GOONG_API_KEY, GOONG_API_URL, GOONG_MAP_KEY } from "@/config";
import { fetchWithGet } from "@/lib/request";
import type { GoongPlaceDetailResponse, Prediction } from "@/types";

export default function OrderGoongMap({}: InteractiveMapProps) {
  const markers = useRef(null);
  const mapRef = useRef(null);
  const { watch, setValue } = useFormContext();

  const shippingAddress: Prediction = watch("shippingAddress");
  const [lat, lng] = watch(["lat", "lng"]);

  useQuery({
    queryKey: [
      "/Place/Detail",
      {
        place_id: shippingAddress?.place_id || undefined,
        api_key: GOONG_API_KEY,
      },
    ],
    queryFn: ({ queryKey, signal }) =>
      fetchWithGet<GoongPlaceDetailResponse, string>({
        queryKey,
        signal,
        baseURL: GOONG_API_URL,
      }),
    select: (data) => data?.data.result,
    enabled: !!shippingAddress?.place_id,
    onSuccess: (data) => {
      if (!mapRef.current) return;
      if (!data?.geometry?.location?.lat && !data?.geometry?.location?.lng)
        return;

      if (markers.current) {
        (markers.current as any).remove();
      }

      setValue("lat", data.geometry.location.lat);
      setValue("lng", data.geometry.location.lng);
    },
  });

  useEffect(() => {
    GoongJS.accessToken = GOONG_MAP_KEY;
    const map = new GoongJS.Map({
      container: "map",
      style: "https://tiles.goong.io/assets/goong_map_web.json",
      center: [106.6237464220227, 10.823417923919319],
      zoom: 10,
    });

    mapRef.current = map;

    return () => {
      if (mapRef.current) map.remove();
    };
  }, []);

  useEffect(() => {
    if (!shippingAddress && markers.current) {
      (markers.current as any).remove();
      (mapRef.current as any).flyTo({
        center: [106.6237464220227, 10.823417923919319],
        zoom: 10,
        essential: true,
      });
    }
  }, [shippingAddress]);

  useEffect(() => {
    if (!lat && !lng) return;
    markers.current = new GoongJS.Marker()
      .setLngLat([lng, lat])
      .addTo(mapRef.current);
    (mapRef.current as any).flyTo({
      center: [lng, lat],
      zoom: 15,
      essential: true,
    });
  }, [lat, lng]);

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: 500,
      }}
    ></div>
  );
}

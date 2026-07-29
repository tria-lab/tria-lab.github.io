"use client"

import {
  Map,
  MapControls,
  MapMarker,
  MapRoute,
  MarkerContent,
  MarkerTooltip,
} from "@/components/ui/map"
import { Loader2, Route } from "lucide-react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

type Location = {
  name: string
  coordinates: [number, number]
}

const start = {
  name: "start",
  coordinates: [126.923432, 37.556616],
} as const satisfies Location
const hongmungwan = {
  name: "hongmungwan",
  coordinates: [126.924747, 37.552485],
} as const satisfies Location
const end = {
  name: "destination",
  coordinates: [126.924594, 37.550121],
} as const satisfies Location

type RouteData = {
  coordinates: [number, number][]
  distance: number
}

type OsrmRouteResponse = {
  routes?: {
    geometry: { coordinates: [number, number][] }
    distance: number
  }[]
}

function formatDistance(meters: number, language: string): string {
  const unit = meters < 1000 ? "meter" : "kilometer"
  const value = meters < 1000 ? Math.round(meters) : Number((meters / 1000).toFixed(1))
  return new Intl.NumberFormat(language, { style: "unit", unit, unitDisplay: "short" }).format(
    value,
  )
}

export default function ContactMap() {
  const { t, i18n } = useTranslation()
  const [routes, setRoutes] = useState<RouteData[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchRoutes() {
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${start.coordinates.join(",")};${end.coordinates.join(",")}?overview=full&geometries=geojson&alternatives=true`,
          { signal: controller.signal },
        )
        if (!response.ok) throw new Error(`OSRM request failed: ${response.status}`)

        const data = (await response.json()) as OsrmRouteResponse
        if (!data.routes?.length) throw new Error("OSRM did not return any routes")

        setRoutes(
          data.routes.map((route) => ({
            coordinates: [start.coordinates, ...route.geometry.coordinates, end.coordinates],
            distance: route.distance,
          })),
        )
        setSelectedIndex(0)
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return

        console.error("Failed to fetch directions:", error)
        setError(t("contact.routeError"))
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    fetchRoutes()
    return () => controller.abort()
  }, [t])

  // Render the selected route last so it remains above the alternatives.
  const sortedRoutes = [...routes]
    .map((route, index) => ({ route, index }))
    .sort((a, b) => Number(a.index === selectedIndex) - Number(b.index === selectedIndex))

  return (
    <section aria-labelledby="map-heading">
      <h2 id="map-heading" className="mb-3 text-lg font-semibold">
        {t("contact.directions")}
      </h2>
      <div className="h-160 overflow-hidden rounded-lg border border-hongik-light-gray">
        <Map center={[126.9245, 37.5533]} zoom={15.1} loading={isLoading}>
          {sortedRoutes.map(({ route, index }) => {
            const isSelected = index === selectedIndex

            return (
              <MapRoute
                key={index}
                id={`route-${index}`}
                coordinates={route.coordinates}
                color={isSelected ? "#1833db" : "#8d99ae"}
                width={isSelected ? 6 : 5}
                opacity={isSelected ? 1 : 0.6}
                onClick={() => setSelectedIndex(index)}
              />
            )
          })}
          {[start, hongmungwan, end].map((stop) => (
            <MapMarker
              key={stop.name}
              longitude={stop.coordinates[0]}
              latitude={stop.coordinates[1]}
            >
              <MarkerContent>
                <div className="rounded-full border-2 border-white bg-hongik-medium-blue px-2 py-1 text-xs font-semibold whitespace-nowrap text-white shadow-lg">
                  {t(`contact.${stop.name}`)}
                </div>
              </MarkerContent>
              <MarkerTooltip className="bg-hongik-black text-hongik-white">
                {t(`contact.${stop.name}`)}
              </MarkerTooltip>
            </MapMarker>
          ))}
          {routes.length > 0 && (
            <div className="absolute top-3 left-3 z-10 flex max-w-[calc(100%-1.5rem)] flex-col gap-2">
              {routes.map((route, index) => {
                const isSelected = index === selectedIndex

                return (
                  <button
                    key={index}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedIndex(index)}
                    className="flex items-center gap-3 rounded-md border border-hongik-light-gray bg-hongik-white px-3 py-2 text-left text-xs text-hongik-black shadow-md transition-colors hover:bg-hongik-light-gray focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hongik-medium-blue aria-pressed:border-hongik-medium-blue aria-pressed:bg-hongik-medium-blue aria-pressed:text-hongik-white"
                  >
                    <span className="flex items-center gap-1.5 opacity-80">
                      <Route className="size-3" aria-hidden="true" />
                      {formatDistance(route.distance, i18n.language)}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
          {isLoading && (
            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
              <Loader2 className="size-6 animate-spin text-hongik-medium-blue" aria-hidden="true" />
              <span className="sr-only">{t("contact.loadingRoutes")}</span>
            </div>
          )}
          {error && (
            <p
              role="status"
              className="absolute inset-x-3 bottom-3 z-10 rounded-md bg-hongik-black px-3 py-2 text-sm text-hongik-white shadow-md"
            >
              {error}
            </p>
          )}
          <MapControls />
        </Map>
      </div>
    </section>
  )
}

"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchLocations } from "@/lib/api"
import type { Location } from "@/types/api"
import { Pagination } from "@/components/ui/pagination"

export function LocationGrid() {
  const [currentPage, setCurrentPage] = useState(1)
  const [locations, setLocations] = useState<Location[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState<number>(0)

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetchLocations(currentPage)

        if (response && response.meta && response.meta.pagination) {
          setLocations(response.data)

          const totalPages = Math.ceil(
            (response.meta.pagination.total || 0) / (response.meta.pagination.pageSize || 10)
          )
          setTotalPages(totalPages)
        } else {
          throw new Error("Invalid API response: missing meta or pagination data.")
        }
      } catch {
        setError("Failed to load locations. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [currentPage])

  if (isLoading) return <div className="text-center py-12">Loading...</div>
  if (error) return <div className="text-center py-12 text-destructive">{error}</div>

  return (
    <div id="locations">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <Card key={location.id} className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-primary">{location.attributes.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">{location.attributes.description}</p>
               {location.attributes.first_appearance && (
                <p className="text-sm">
                  <span className="font-semibold text-primary">First Appearance:</span>{" "}
                  <span className="text-muted-foreground">
                    {location.attributes.first_appearance}
                  </span>
                </p>
              )}
              {location.attributes.creator && (
                <p className="text-sm">
                  <span className="font-semibold text-primary">Creator:</span>{" "}
                  <span className="text-muted-foreground">{location.attributes.creator}</span>
                </p>
              )}
              {location.attributes.type && (
                <p className="text-sm">
                  <span className="font-semibold text-primary">Type:</span>{" "}
                  <span className="text-muted-foreground">{location.attributes.type}</span>
                </p>
              )}
              {location.attributes.notable_events?.length > 0 && (
                <div className="text-sm">
                  <span className="font-semibold text-primary">Notable Events:</span>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {location.attributes.notable_events.map((event, index) => (
                      <li key={index}>{event}</li>
                    ))}
                  </ul>
                </div>
              )}
              {location.attributes.related_characters?.length > 0 && (
                <div className="text-sm">
                  <span className="font-semibold text-primary">Related Characters:</span>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {location.attributes.related_characters.map((character, index) => (
                      <li key={index}>{character}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />
    </div>
  )
}

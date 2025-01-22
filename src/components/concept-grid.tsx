"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchConcepts } from "@/lib/api"
import type { Concept } from "@/types/api"
import { Pagination } from "@/components/ui/pagination"

export function ConceptGrid() {
  const [currentPage, setCurrentPage] = useState(1)
  const [concepts, setConcepts] = useState<Concept[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState<number>(0)

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const data = await fetchConcepts(currentPage)
        setConcepts(data.data) 
        setTotalPages(Math.ceil(data.meta.pagination.total / data.meta.pagination.pageSize))
      } catch (err) {
        setError("Failed to load concepts. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [currentPage]) 

  if (isLoading) return <div className="text-center py-12">Loading...</div>
  if (error)
    return <div className="text-center py-12 text-destructive">{error}</div>

  return (
    <div id="concepts">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {concepts.map((concept) => (
          <Card key={concept.id} className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-primary">{concept.attributes.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{concept.attributes.description}</p>
                <div className="mt-4">
                {concept.attributes.creator && (
                  <p className="text-sm">
                    <span className="font-semibold text-primary">Creator:</span>{" "}
                    <span className="text-muted-foreground">{concept.attributes.creator}</span>
                  </p>
                )}
              </div>
              <div className="mt-4">
                {concept.attributes.first_appearance && (
                  <p className="text-sm">
                    <span className="font-semibold text-primary">First appearance: </span>{" "}
                    <span className="text-muted-foreground">{concept.attributes.first_appearance}</span>
                  </p>
                )}
              </div>
              <div className="mt-4">
                <strong>Related Characters:</strong>
                <ul className="list-disc pl-5">
                  {concept.attributes.related_characters.length > 0 ? (
                    concept.attributes.related_characters.map((character, index) => (
                      <li key={index} className="text-sm text-muted-foreground">{character}</li> 
                    ))
                  ) : (
                    <li className="text-sm text-muted-foreground">No related characters</li>
                  )}
                </ul>
              </div>
              <div className="mt-4">
                <strong>Related Locations:</strong>
                <ul className="list-disc pl-5">
                  {concept.attributes.related_locations.length > 0 ? (
                    concept.attributes.related_locations.map((location, index) => (
                      <li key={index} className="text-sm text-muted-foreground">{location}</li> 
                    ))
                  ) : (
                    <li className="text-sm text-muted-foreground">No related locations</li>
                  )}
                </ul>
              </div>
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

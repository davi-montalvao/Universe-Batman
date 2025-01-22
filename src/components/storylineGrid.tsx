"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchStorylines } from "@/lib/api"
import type { Storyline } from "@/types/api"
import { Pagination } from "@/components/ui/pagination"

export function StorylineGrid() {
  const [currentPage, setCurrentPage] = useState(1)
  const [storylines, setStorylines] = useState<Storyline[]>([]) 
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState<number>(0)

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const data = await fetchStorylines(currentPage)
        setStorylines(data?.data) 
        setTotalPages(Math.ceil(data.meta.pagination.total / data.meta.pagination.pageSize)) 
      } catch (err) {
        setError("Failed to load storylines. Please try again later.")
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
    <div id="storylines">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {storylines.map((storyline) => (
        <Card key={storyline.id} className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-primary">{storyline.attributes.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {storyline.attributes.description && (
              <p className="text-sm">
                <span className="font-semibold text-primary">Description:</span>{" "}
                <span className="text-muted-foreground">
                  {storyline.attributes.description}
                </span>
              </p>
            )}
            {storyline.attributes.publication_date && (
              <p className="text-sm">
                <span className="font-semibold text-primary">Publication date:</span>{" "}
                <span className="text-muted-foreground">
                  {storyline.attributes.publication_date}
                </span>
              </p>
            )}
            {storyline.attributes.writer && (
              <p className="text-sm">
                <span className="font-semibold text-primary">Writer:</span>{" "}
                <span className="text-muted-foreground">
                  {storyline.attributes.writer}
                </span>
              </p>
            )}
            {storyline.attributes.characters && storyline.attributes.characters.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-primary">Characters:</p>
                <ul className="list-disc pl-5 text-muted-foreground">
                  {storyline.attributes.characters.map((character, index) => (
                    <li key={index}>{character}</li>
                  ))}
                </ul>
              </div>
            )}
            {storyline.attributes.locations && storyline.attributes.locations.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-primary">Locations:</p>
                <ul className="list-disc pl-5 text-muted-foreground">
                  {storyline.attributes.locations.map((location, index) => (
                    <li key={index}>{location}</li>
                  ))}
                </ul>
              </div>
            )}
            {storyline.attributes.issues && storyline.attributes.issues.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-primary">Issues:</p>
                <ul className="list-disc pl-5 text-muted-foreground">
                  {storyline.attributes.issues.map((issue, index) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-sm">
              <span className="font-semibold text-primary">Artist:</span>{" "}
              <span className="text-muted-foreground">
                {storyline.attributes.artist}
              </span>
            </p>
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

"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchCharacters } from "@/lib/api"
import type { Character  } from "@/types/api"
import { Pagination } from "@/components/ui/pagination"

export function CharacterGrid() {
  const [currentPage, setCurrentPage] = useState(1)
  const [characters, setCharacters] = useState<Character[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  const loadCharacters = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetchCharacters(currentPage)


      if (response && response.meta && response.meta.pagination) {
        setCharacters(response.data)
        
        const totalPages = Math.ceil(
          (response.meta.pagination.total || 0) / (response.meta.pagination.pageSize || 10)
        )
        setTotalPages(totalPages)
      } else {
        throw new Error("Invalid API response: missing meta or pagination data.")
      }

    } catch {
      setError("Failed to load characters. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }


  useEffect(() => {
    loadCharacters()
  }, [currentPage])

  if (isLoading) return <div className="text-center py-12">Loading...</div>

  if (error) {
    return <div className="text-center py-12 text-destructive">{error}</div>
  }

  return (
    <div id="characters">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map((character: Character) => (
          <Card key={character.id} className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-primary">{character.attributes.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {character.attributes.description}
              </p>
              {character.attributes.alias && (
                <p className="text-sm">
                  <span className="font-semibold text-primary">Alias:</span>{" "}
                  <span className="text-muted-foreground">
                    {character.attributes.alias}
                  </span>
                </p>
              )}
              {character.attributes.first_appearance && (
                <p className="text-sm">
                  <span className="font-semibold text-primary">First Appearance:</span>{" "}
                  <span className="text-muted-foreground">
                    {character.attributes.first_appearance}
                  </span>
                </p>
              )}
              {character.attributes.alive !== undefined && (
                <p className="text-sm">
                  <span className="font-semibold text-primary">Alive:</span>{" "}
                  <span className="text-muted-foreground">
                    {character.attributes.alive ? "Yes" : "No"}
                  </span>
                </p>
              )}
              {character.attributes.role && (
                <p className="text-sm">
                  <span className="font-semibold text-primary">Role:</span>{" "}
                  <span className="text-muted-foreground">
                    {character.attributes.role}
                  </span>
                </p>
              )}
              {character.attributes.creator && (
                <p className="text-sm">
                  <span className="font-semibold text-primary">Creator:</span>{" "}
                  <span className="text-muted-foreground">
                    {character.attributes.creator}
                  </span>
                </p>
              )}
              {character.attributes.gender && (
                <p className="text-sm">
                  <span className="font-semibold text-primary">Gender:</span>{" "}
                  <span className="text-muted-foreground">
                    {character.attributes.gender}
                  </span>
                </p>
              )}
              {character.attributes.abilities?.length > 0 && (
                <div className="text-sm">
                  <span className="font-semibold text-primary">Abilities:</span>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {character.attributes.abilities.map((ability, index) => (
                      <li key={index}>{ability}</li>
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

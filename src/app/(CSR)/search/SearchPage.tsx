"use client";

import { UnsplashImage, UnsplashSearchResponse } from "@/models/unshplash-image";
import Image from "next/image";
import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState<UnsplashImage[] | null>(null);
  const [searchResultsLoading, setSearchResultsLoading] = useState(false);
  const [searchResultsLoadingError, setSearchResultsLoadingError] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("query")?.toString().trim();

    if (query) {
      try {
        setSearchResults(null);
        setSearchResultsLoadingError(false);
        setSearchResultsLoading(true);

        const url = `/api/search?query=${query}`;
        const response = await fetch(url);
        const data: UnsplashSearchResponse = await response.json();

        setSearchResults(data.results);
        setSearchValue("");
      } catch (e) {
        console.error(e);
        setSearchResultsLoadingError(true);
      } finally {
        setSearchResultsLoading(false);
        (e.target as HTMLFormElement).query.focus();
      }
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="search-input">
          <Form.Label>Search query</Form.Label>
          <Form.Control
            name="query"
            placeholder="E.g. cats, hotdogs, ..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" className="mb-3 bg-blue-500" disabled={searchResultsLoading}>
          Search
        </Button>
      </Form>
      <div className="flex flex-col items-center">
        {searchResultsLoading && <Spinner animation="border" />}
        {searchResultsLoadingError && <p>Something went wrong. Please try again.</p>}
        {searchResults?.length === 0 && <p>Nothing found. Try a different query.</p>}
      </div>
      <div className="flex flex-wrap gap-3">
        {searchResults &&
          searchResults.map((image) => {
            return (
              <Image
                key={image.id}
                src={image.urls.raw}
                width={250}
                height={250}
                alt={image.description}
                className="object-cover"
              />
            );
          })}
      </div>
    </div>
  );
};

export default SearchPage;

import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { yearsAgo } from "./utils";

const Container = styled.div`
  padding: 20px;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  box-sizing: border-box;
  background: white;
  color: black;
`;

const Content = styled.div`
  display: flex;
`;

const Filters = styled.div`
  width: 200px;
  padding: 20px;
  background: #f5f5f5;
`;

const Results = styled.div`
  width: 70%;
  padding: 20px;
`;

const FilterItem = styled.div`
  margin-bottom: 10px;
`;

interface Person {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  created: string;
}

const useFetchPeople = (searchTerm: string) => {
  const [people, setPeople] = useState<Person[]>([]);
  useEffect(() => {
    if (searchTerm.length > 0) {
      axios
        .get(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`)
        .then((response) => {
          setPeople(response.data.results);
        });
    } else {
      setPeople([]);
    }
  }, [searchTerm]);
  return people;
};

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const people = useFetchPeople(searchTerm);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>(people);
  const [filter, setFilter] = useState({
    species: "",
    status: "",
    gender: "",
  });

  useEffect(() => {
    let filtered = people;
    if (filter.species) {
      filtered = filtered.filter((person) => person.species === filter.species);
    }
    if (filter.status) {
      filtered = filtered.filter((person) => person.status === filter.status);
    }
    if (filter.gender) {
      filtered = filtered.filter((person) => person.gender === filter.gender);
    }
    setFilteredPeople(filtered);
  }, [people]);

  return (
    <Container>
      <SearchBar
        type="text"
        placeholder="Search for a person..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Content>
        <Filters>
          <h3>Filters</h3>
          <FilterItem>
            <label>Species: </label>
            <select
              value={filter.species}
              onChange={(e) =>
                setFilter((prev) => ({ ...prev, species: e.target.value }))
              }
            >
              <option value="">All</option>
              <option value="Human">Human</option>
            </select>
          </FilterItem>
          <FilterItem>
            <label>Status: </label>
            <select
              value={filter.status}
              onChange={(e) =>
                setFilter((prev) => ({ ...prev, status: e.target.value }))
              }
            >
              <option value="">All</option>
              <option value="Human">Human</option>
              <option value="Dead">Dead</option>
              <option value="Unknown">Unknown</option>
            </select>
          </FilterItem>
          <FilterItem>
            <label>Gender: </label>
            <select
              value={filter.gender}
              onChange={(e) =>
                setFilter((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Genderless">Genderless</option>
              <option value="Unknown">Unknown</option>
            </select>
          </FilterItem>
        </Filters>
        <Results>
          <h3>Search Results</h3>
          {filteredPeople.length > 0 ? (
            filteredPeople.map((person, index) => (
              <div key={index}>
                <h4>{person.name}</h4>
                <p>Gender: {person.gender}</p>
                <p>Species: {person.species}</p>
                <p>Status: {person.status}</p>
                {/* <p>Created: {yearsAgo(person.created)}</p> */}
                <hr />
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </Results>
      </Content>
    </Container>
  );
};

export default App;

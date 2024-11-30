import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  padding: 20px;
`;

const SearchBar = styled.input`
  width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    font-size: 16px;
    box-sizing: border-box;
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
  name: string;
  gender: string;
  hair_color: string;
  eye_color: string;
}

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [filter, setFilter] = useState({
    hair_color: '',
    eye_color: '',
    gender: '',
  });

  useEffect(() => {
    if (searchTerm.length > 0) {
      axios
        .get(`https://swapi.dev/api/people/?search=${searchTerm}`)
        .then((response) => {
          setPeople(response.data.results);
          setFilteredPeople(response.data.results);
        });
    } else {
      setPeople([]);
      setFilteredPeople([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    let filtered = people;
    if (filter.hair_color) {
      filtered = filtered.filter(
        (person) => person.hair_color === filter.hair_color
      );
    }
    if (filter.eye_color) {
      filtered = filtered.filter(
        (person) => person.eye_color === filter.eye_color
      );
    }
    if (filter.gender) {
      filtered = filtered.filter((person) => person.gender === filter.gender);
    }
    setFilteredPeople(filtered);
  }, [filter, people]);

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
            <label>Hair Color: </label>
            <select
              value={filter.hair_color}
              onChange={(e) =>
                setFilter((prev) => ({ ...prev, hair_color: e.target.value }))
              }
            >
              <option value="">All</option>
              <option value="blond">Blond</option>
              <option value="brown">Brown</option>
              <option value="black">Black</option>
              <option value="n/a">N/A</option>
            </select>
          </FilterItem>
          <FilterItem>
            <label>Eye Color: </label>
            <select
              value={filter.eye_color}
              onChange={(e) =>
                setFilter((prev) => ({ ...prev, eye_color: e.target.value }))
              }
            >
              <option value="">All</option>
              <option value="blue">Blue</option>
              <option value="brown">Brown</option>
              <option value="yellow">Yellow</option>
              <option value="red">Red</option>
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
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="n/a">N/A</option>
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
                <p>Hair Color: {person.hair_color}</p>
                <p>Eye Color: {person.eye_color}</p>
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

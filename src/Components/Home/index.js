import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { ThreeDots } from "react-loader-spinner";
import "./index.css";

const Home = () => {
  const [jokes, setJokes] = useState([]);

  const [loading, setLoading] = useState(true);
  const getData = async () => {
    const url =
      "https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10";
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        console.error("Error fetching jokes:", data.error);
      }

      const jokesData = data.jokes.map((jokeObj) => ({
        id: jokeObj.id,
        joke: jokeObj.joke,
      }));
      jokesData.sort((a, b) => a.id - b.id);
      setLoading(false);
      setJokes(jokesData);
    } catch (error) {
      // Handle fetch error
      console.error("Error fetching jokes:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="main">
      <div className="container bg">
        <div>
          <h2 className="heading">Jokes Table</h2>

          {loading ? (
            <div className="loading-spinner">
              <ThreeDots color="#000" height={80} width={80} />
            </div>
          ) : (
            <div className="table-responsive">
              <Table striped bordered hover className="custom-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Joke</th>
                  </tr>
                </thead>
                <tbody>
                  {jokes.map((joke) => (
                    <tr key={joke.id}>
                      <td>{joke.id}</td>
                      <td>{joke.joke}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

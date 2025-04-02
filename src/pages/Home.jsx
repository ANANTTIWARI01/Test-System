import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/Auth";
import { Link } from "react-router-dom";

function Home() {
  const { fetchTests, startTest } = useAuth();
  const sno = useRef(1);

  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    setTests(await fetchTests());
    setLoading(false);
  }

  if (loading) return <div id="loading">LOADING...</div>;

  return (
    <>
      <Link to="">View Scores</Link>

      <h3>Tests</h3>

      <table>
        <thead>
          <tr>
            <th>S.no</th>
            <th>Test</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tests &&
            tests.map((test) => {
              return (
                <tr key={test._id}>
                  <td>{sno.current++}</td>
                  <td>{test.name}</td>
                  <td>
                    <Link to={`/attempt-test/${test._id}`}>Attempt Test</Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

export default Home;

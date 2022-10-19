import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { baseUrl } from "./axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddSkill from "./components/add-skill/add-skill";
import AddWilder from "./components/add-wilder/add-wilder";
import Footer from "./components/footer/footer";
import IProfileCard from "./interfaces/wilder/IProfileCard";
import IWilderFromDb from "./interfaces/wilder/IWilderFromDb";
import ProfileGrid from "./components/profile-grid/profile-grid";

function App() {
  const [wilders, setWilders] = useState<IProfileCard[]>([]);
  const [needUpdateAfterCreation, setNeedUpdateAfterCreation] = useState(false);
  const [wilderToEdit, setWilderToEdit] = useState<IWilderFromDb | null>(null);

  const fetchWilders = useCallback(async () => {
    try {
      const res = await axios.get(`${baseUrl}/wilders`);
      if (res && res.data && res.data.wilders) {
        setWilders(res.data.wilders);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchWilders();
  }, [fetchWilders]);

  useEffect(() => {
    if (needUpdateAfterCreation) {
      fetchWilders();
      setWilderToEdit(null);
    }
    setNeedUpdateAfterCreation(false);
  }, [fetchWilders, needUpdateAfterCreation]);

  return (
    <Router>
      <div>
        <header>
          <div className="container">
            <div>
              <Link to="/">
                <h1>Wilders Book</h1>
              </Link>
            </div>
            <nav>
              <Link to="/add-wilder">
                <span>Add Wilder</span>
              </Link>
              <Link to="/add-skill">
                <span>Add Skill</span>
              </Link>
            </nav>
          </div>
        </header>
        <main className="container">
          <Routes>
            <Route
              path="/add-wilder"
              element={
                <AddWilder
                  setNeedUpdateAfterCreation={setNeedUpdateAfterCreation}
                  needUpdateAfterCreation={needUpdateAfterCreation}
                  setWilderToEdit={setWilderToEdit}
                  wilderToEdit={wilderToEdit}
                />
              }
            />
            <Route
              path="/update-wilder"
              element={
                <AddWilder
                  setWilderToEdit={setWilderToEdit}
                  wilderToEdit={wilderToEdit}
                  setNeedUpdateAfterCreation={setNeedUpdateAfterCreation}
                  needUpdateAfterCreation={needUpdateAfterCreation}
                />
              }
            />
            <Route
              path="/add-skill"
              element={
                <AddSkill
                  setNeedUpdateAfterCreation={setNeedUpdateAfterCreation}
                />
              }
            />
            <Route
              path="/"
              element={
                <ProfileGrid
                  wilders={wilders}
                  setNeedUpdateAfterCreation={setNeedUpdateAfterCreation}
                  setWilderToEdit={setWilderToEdit}
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

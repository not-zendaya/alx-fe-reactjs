import { Routes , Route} from "react-router-dom";
import HomePage from "./components/HomePage";
import RecipeDetail from ""

function App(){
    return(
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/recipe/:id" element={<RecipeDetail />} />
            </Routes>
    );
}
export default App;
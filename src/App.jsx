import './App.css'
import UserNotesPage from "./pages/UserNotesPage"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import NoteModal from "./modal/NoteModal"
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import {NeedHeaderComponent} from "./components/NeedHeaderComponent";
import {AuthProvider} from "./contexts/AuthContext";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/notes" element={<NeedHeaderComponent Component={UserNotesPage}/>}/>
                    <Route path="/notes/:id" element={<NeedHeaderComponent Component={NoteModal}/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App

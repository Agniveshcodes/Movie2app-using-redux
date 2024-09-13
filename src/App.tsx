import { BrowserRouter, Route, Routes } from "react-router-dom"
import ShowsListPage from "./Pages/ShowsList.Page"
import ShowDetailsPage from "./Pages/ShowDetails.Page"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShowsListPage />} />
          <Route path="/show/:showId" element={<ShowDetailsPage />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

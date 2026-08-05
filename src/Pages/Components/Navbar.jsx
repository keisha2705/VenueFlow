import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Home() {
  return <h1>Home Page</h1>;
}

function AboutUs() {
  return <h1>About Page</h1>;
}

function ApplicationForm() {
  return <h1>Application Form</h1>;
}


function Events(){
  return <h1>All Events</h1>
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="./AboutUs">About Us</Link> |{" "}
        <Link to="./ApplicationForm">Application Form</Link>
        <link to="./Events">Events</link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="./About Us" element={<AboutUs />} />
        <Route path="./ApplicationForm" element={<ApplicationForm />} />
        <Route path="./Events" element={<Events/>}/>
      </Routes>
    </BrowserRouter>
  );
}
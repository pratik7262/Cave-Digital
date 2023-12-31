import AfterLogin from "./components/AfterLogin";
import BeforeLogin from "./components/BeforeLogin";

function App() {
  return (
    <>{localStorage.getItem("token") ? <AfterLogin /> : <BeforeLogin />}</>
  );
}

export default App;

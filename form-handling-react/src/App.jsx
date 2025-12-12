import React from "react";
import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/formikForm";

function App() {
  return (
    <div>
      <RegistrationForm />
      <hr />
      <formikForm />
    </div>
  );
}

export default App;
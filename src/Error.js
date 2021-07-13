/** this is used to redirect the user to a error page if he goes to a page which is not authorized to access */

import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Error.css";
function Error() {
  const history = useHistory();

  const home = () => {
    history.push("/"); //pushing to main the homepage
  };

  return (
    <div className="error">
      <img
        src="https://images.fineartamerica.com/images-medium-large-5/abstract-cubed-102-tim-allen.jpg"
        alt=""
      />
      <div className="error_info">
        <img
          src="https://agentestudio.com/uploads/post/image/69/main_how_to_design_404_page.png"
          alt=""
        />
        <h1>Please Login/SignUp to access this page</h1>
        <Button onClick={home} className="err_but">
          Back to Home Page
        </Button>
      </div>
    </div>
  );
}

export default Error;

import { SignIn, SignOutButton, UserButton } from "@clerk/clerk-react";


function App() {
    return (
      <div className="container">
        <div className="sign-in-container">
          <SignIn forceRedirectUrl={"/create"} />
        
        </div>
  
        {/* Inline CSS */}
        <style>
          {`
            .container {
              position: relative;
              width: 100%;
              height: 100vh; /* Full viewport height */
              background-image: url("https://img.freepik.com/premium-photo/white-background-with-green-leaves-left-side-leaving-space-text-right_1308352-21720.jpg");
              background-size: cover;
              background-position: center;
              margin: 0;
              padding:0;
            }
  
            .sign-in-container {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%); /* Centers the login card */
              padding: 20px;
              background-color: olivegreen; /* Optional: gives the card a slight background */
              border-radius: 10px; /* Optional: rounded corners */
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Optional: adds shadow to the card */
            }
            .sign-in-container .sign-in-content {
            background-color: transparent; /* Ensure no conflicting background from SignIn */
            color: black;
          }
          `}
        </style>
      </div>
    );
  }
  
  export default App;
import React, { useState, useRef, useEffect } from "react";
import "../styles/dashboard.css";
import { SignOutButton, UserButton, UserProfile, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import api from "../api/db";
import { toast } from "sonner";
import { SignedIn } from "@clerk/clerk-react";

export default function Dashboard() {
  const navRef = useRef(null);
  const [rows, setRows] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    time: "",
    task: "",
    day: "Monday",
  });

  const user = useUser();
  console.log(user)
  const navigate = useNavigate();


  const handleClick = () => {
    if (navRef.current) {
      navRef.current.classList.toggle("navclose");
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleAddButtonClick = () => {
    setShowForm(true);
  };

  const handleCancelButtonClick = () => {
    setShowForm(false);
    setFormData({ name: "", time: "", task: "", day: "Monday" });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newRow = { ...formData };
    setRows([...rows, newRow]);
    setShowForm(false);
    setFormData({ name: "", time: "", task: "", status: "Monday" });

    console.log(formData)
    const response = await api.set_schedule(user.user.primaryEmailAddress.emailAddress, formData.name, formData.time, formData.task, formData.day);
    console.log(response)
    if (response.data.content.error) {
      toast.error(response.data.content.error);
      return;
    }

    toast.success(response.data.content.success)
  };
  const handleDeleteRow = async (id) => {
    try {
      const response = await api.delete_schedule(id);
      console.log(response)
      if (response.data.content.error) {
        toast.error(response.data.content.error);
        return;
      }

      // Update the schedule state by filtering out the deleted item
      setSchedule((prevSchedule) => prevSchedule.filter(item => item.id !== id)); toast.success(response.data.content.success);
    } catch (error) {
      console.error("Error deleting schedule:", error);
      toast.error("Failed to delete schedule item.");
    }
  };

  useEffect(() => {
    // Check if user and its nested properties are defined
    if (user && user.user && user.user.primaryEmailAddress) {
      console.log("User:", user);

      async function get_data() {
        try {
          // Fetch schedule data
          const response = await api.get_schedule(user.user.primaryEmailAddress.emailAddress);
          console.log("API Response:", response);

          // Check if the response has the expected structure
          if (response.data && response.data.content && response.data.content.success) {
            // Update schedule state only if the data has changed
            setSchedule((prevSchedule) => {
              if (JSON.stringify(prevSchedule) !== JSON.stringify(response.data.content.success)) {
                return response.data.content.success;
              }
              return prevSchedule; // No change, return previous state
            });
          } else {
            console.error("Invalid API response structure:", response);
          }
        } catch (error) {
          console.error("Error fetching schedule:", error);
        }
      }

      get_data();
    } else {
      console.log("User data not available yet.");
    }
  }, [formData, schedule, user]); // Use specific property as dependency



  return (
    <div>
      <SignedIn>
        <>

          <header>

            <div className="logosec">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="150"
                fill="currentColor"
                className="icn menuicn"
                viewBox="0 0 16 16"
                onClick={handleClick}
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                />
              </svg>
            </div>

            <div className="logo">
              <img src="./src/images/image.png" alt="logo" id="logo1"/>
              </div>

 


          </header>


          <div className="main-container">
            <div className="navcontainer" ref={navRef}>
              <nav className="nav">
                <div className="nav-upper-options">
                  <div className="option2 nav-option">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="36"
                      fill="currentColor"
                      className="nav-img"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M9.5 7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m3 0h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M2 10.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5" />
                    </svg>
                    <a href="/dashboard"><h3> Schedule</h3></a>
                  </div>

                  <div className="nav-option option3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="36"
                      fill="currentColor"
                      className="nav-img"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.933.87a2.89 2.89 0 0 1 4.134 0l.622.638.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01zM7.002 11a1 1 0 1 0 2 0 1 1 0 0 0-2 0m1.602-2.027c.04-.534.198-.815.846-1.26.674-.475 1.05-1.09 1.05-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.7 1.7 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745.336 0 .504-.24.554-.627" />
                    </svg>
                    <a href="/askai"><h3> Ask AI</h3></a>
                  </div>

                  <div className="nav-option option4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="36"
                      fill="currentColor"
                      className="nav-img"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5m2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.04 8.04 0 0 0 .86 5.387M11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.04 8.04 0 0 0-3.527-3.527" />
                    </svg>
                    <a href="/reminder"><h3>Remainder</h3></a>
                  </div>

                  <div className="nav-option option3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="36" fill="currentColor" class="bi bi-envelope-at" viewBox="0 0 16 16">
  <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z"/>
  <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"/>
</svg>
                    <a href="/contactus"><h3> Contact Us </h3></a>
                  </div>

                  <SignOutButton redirectUrl="/">
                    <button className="nav-option logout">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="36"
                        fill="currentColor"
                        className="nav-img"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"
                        />
                        <path
                          fillRule="evenodd"
                          d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"
                        />
                      </svg>
                      <h3>Logout</h3>
                    </button>
                  </SignOutButton>
                </div>
              </nav>
            </div>

            <div className="main">
              <div className="searchbar2">
                <input type="text" placeholder="Search" />
                <div className="searchbtn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="white"
                    className="icn srchicn"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018" />
                    <path d="M13 6.5a6.47 6.47 0 0 1-1.258 3.844q.06.044.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11" />
                  </svg>
                </div>
              </div>

              <div className="report-container">
                <div className="report-header">
                  <h1 className="your-Schedule">Your Schedule</h1>
                  <button className="add" onClick={handleAddButtonClick}>
                    ADD+
                  </button>
                </div>

                <table id="scheduleTable" className="report-table">
                  <thead>
                    <tr>
                      <th>Plant Name</th>
                      <th>Time</th>
                      <th>Task</th>
                      <th>Day</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule && schedule.map((row, index) => (
                      <tr key={index}>
                        <td>{row.plant_name}</td>
                        <td>{row.time}</td>
                        <td>{row.task}</td>
                        <td>{row.day}</td>
                        <td>
                          <button onClick={() => handleDeleteRow(row.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                    {showForm && (
                      <tr>
                        <td colSpan="4">
                          <form id="scheduleForm" onSubmit={handleFormSubmit}>
                            <input
                              type="text"
                              id="name"
                              placeholder="Plant Name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                            />
                            <input
                              type="time"
                              id="time"
                              placeholder="HH:MM"
                              value={formData.time}
                              onChange={handleInputChange}
                              required
                            />
                            <input
                              type="text"
                              id="task"
                              placeholder="Task"
                              value={formData.task}
                              onChange={handleInputChange}
                              required
                            />
                            <div>
                              <label htmlFor="day">Day</label>

                              <select name="day" onChange={handleInputChange} id="day" value={formData.day}>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                              </select>
                            </div>
                            <br />
                            <div>
                              <button type="submit">Save</button>
                              <button type="button" onClick={handleCancelButtonClick}>
                                Cancel
                              </button>
                            </div>
                          </form>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      </SignedIn>


    </div>
  );
}
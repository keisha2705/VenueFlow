import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import "../Styling/SuperAdmin.css";
import Navbar from "../Components/Navbar";
// import Profile from "../public/Profile.webp;

function SuperAdmin() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("manager");

  useEffect(() => {
    getUsers()
  }, []);

  async function getUsers() {
    try {
      if (!auth.currentUser) {
        alert("You are not logged in.");
        return
      }
      const token = await auth.currentUser.getIdToken();
      const response = await fetch("http://localhost:3000/users",{ method: "GET", headers: {Authorization: `Bearer ${token}`}});
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert(error.message);
    }
  }
// this is for that small person thing at the top for it to get the users info
  async function getProfile() {
    try {
      if (!auth.currentUser) {
        alert("You are not logged in.");
        return
      }
      // getting the firebase token
      const token = await auth.currentUser.getIdToken();
      //getting Firebase uid
      const uid = auth.currentUser.uid;
      //this gets the user's information from MongoDB
      const response = await fetch(`http://localhost:3000/users/${uid}`,{ method: "GET", headers: {Authorization: `Bearer ${token}`}});
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      //storing profile information
      setProfile(data);
      //the profile modal
      setShowProfile(true);

    } catch (error) {
      console.error("Error getting profile:", error);
      alert(error.message);
    }
  }
// function to promote user
  async function handlePromote() {
    if (!email.trim()) {
      alert("Please enter an email.");
      return
    }

    if (!auth.currentUser) {
      alert("You are not logged in.");
      return;
    }
    try {
      const token = await auth.currentUser.getIdToken();
      const response = await fetch("http://localhost:3000/users/promote",{method: "PUT",headers: {"Content-Type": "application/json",Authorization: `Bearer ${token}`},
        body: JSON.stringify({email: email.trim().toLowerCase(),role: role})});
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      alert(data.message);
      setShowModal(false);
      setEmail("");
      setRole("manager");
      await getUsers();

    } catch (error) {
      console.error("Promotion error:", error);
      alert(error.message);
    }
  }
// remove a users special role back to user
  async function handleRemoveRole(user) {
    const confirmRemove = window.confirm(`Are you sure you want to remove ${user.email}'s ${user.role} role?`);
    if (!confirmRemove) {
      return
    }

    try {
      if (!auth.currentUser) {
        alert("You are not logged in.");
        return
      }
      const token = await auth.currentUser.getIdToken();
      const response = await fetch(`http://localhost:3000/users/${user._id}/demote`,{method: "PUT",
          headers: {Authorization: `Bearer ${token}`,}}
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      alert(data.message);
      await getUsers();
    } catch (error) {
      console.error("Remove role error:", error);
      alert(error.message);
    }
  }

  function closeModal() {
    setShowModal(false);
    setEmail("");
    setRole("manager");
  }

  function closeProfile() {
    setShowProfile(false);
  }

  return (
    <div className="superadmin-container">
      <Navbar />
      <button type="button" className="profile-button" onClick={getProfile} title="View Profile">
        <img src="./Profile.webp" alt="Profile" className="profile-icon" width="40"/>
      </button>

      <h1>SUPER ADMIN</h1>
      <p>Manage users and their roles.</p>

      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {/* if there are no user */}
          {users.length === 0 ? (
            <tr>
              <td colSpan="4">No managers or superAdmins found.</td>
            </tr>
            ) : 
            (users.map((user) => (
              <tr key={user._id}>
                <td>{user.username ||user.name ||"No name"}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                {/* this will prevent superadmin from removing themselves */}
                <td>{user.role === "superAdmin" ? (<span>No action</span>
                  ) : (
                <button type="button" className="remove-role-button" onClick={() =>handleRemoveRole(user)}>Remove Role</button>)}
                </td>
              </tr>)))}
        </tbody>
      </table>

      <button type="button" className="add-button" onClick={() => setShowModal(true)}>+</button>
      {/* promoting a user form */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Promote User</h2>
            <p> Enter the email address of the user you want to promote.</p>
            <label htmlFor="user-email">Email</label>
            <input id="user-email" type="email" value={email} onChange={(event) =>setEmail(event.target.value)}placeholder="Enter user email"/>
            <label htmlFor="user-role">Role</label>
            <select id="user-role" value={role} onChange={(event) =>setRole(event.target.value)}>
              <option value="user">User</option>
              <option value="manager">Manager</option>
            </select>

            <button type="button" onClick={handlePromote}>Promote</button>
            <button type="button" className="cancel" onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}

{/* the profile modal */}
      {showProfile && profile && (
        <div className="modal-overlay" onClick={closeProfile}>
          <div className="profile-modal" onClick={(event) => event.stopPropagation()}>
          <div>
            <img src="./Profile.webp" alt="Profile" className="profile-icon" width="40"/>
          </div>
            <h2>My Profile ^_^</h2>
            <div className="profile-info">
              <div className="profile-row">
              <b>Name:</b>
                <span>{profile.username || "Not provided"}</span>
              </div>
              <div className="profile-row">
                <b>Email:</b>
                <span>{profile.email || "Not provided"}</span>
              </div>

              <div className="profile-row">
                <b>Role:</b>
                <span className="profile-role">{profile.role}</span>
              </div>
            </div>

            <button type="button" className="cancel" onClick={closeProfile}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SuperAdmin
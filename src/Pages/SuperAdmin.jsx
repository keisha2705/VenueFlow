import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import "../Styling/SuperAdmin.css";
import Navbar from "../Components/Navbar";

function SuperAdmin() {
  const [users, setUsers] = useState([]);

  // Promote modal
  const [showModal, setShowModal] = useState(false);

  // Profile modal
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState(null);

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("municipality");

  // ==========================================
  // GET USERS WHEN PAGE LOADS
  // ==========================================

  useEffect(() => {
    getUsers();
  }, []);

  // ==========================================
  // GET USERS
  // ==========================================

  async function getUsers() {
    try {
      if (!auth.currentUser) {
        alert("You are not logged in.");
        return;
      }

      const token = await auth.currentUser.getIdToken();

      const response = await fetch(
        "http://localhost:3000/users",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

  // ==========================================
  // GET SUPER ADMIN PROFILE
  // ==========================================

  async function getProfile() {
    try {
      if (!auth.currentUser) {
        alert("You are not logged in.");
        return;
      }

      // Get Firebase token
      const token = await auth.currentUser.getIdToken();

      // Get Firebase UID
      const uid = auth.currentUser.uid;

      // Get this user's information from MongoDB
      const response = await fetch(
        `http://localhost:3000/users/${uid}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      // Store profile information
      setProfile(data);

      // Show profile modal
      setShowProfile(true);

    } catch (error) {
      console.error("Error getting profile:", error);
      alert(error.message);
    }
  }

  // ==========================================
  // PROMOTE USER
  // ==========================================

  async function handlePromote() {
    if (!email.trim()) {
      alert("Please enter an email.");
      return;
    }

    if (!auth.currentUser) {
      alert("You are not logged in.");
      return;
    }

    try {
      const token = await auth.currentUser.getIdToken();

      const response = await fetch(
        "http://localhost:3000/users/promote",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            role: role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      alert(data.message);

      setShowModal(false);
      setEmail("");
      setRole("municipality");

      await getUsers();

    } catch (error) {
      console.error("Promotion error:", error);
      alert(error.message);
    }
  }

  // ==========================================
  // REMOVE USER ROLE
  // ==========================================

  async function handleRemoveRole(user) {
    const confirmRemove = window.confirm(
      `Are you sure you want to remove ${user.email}'s ${user.role} role?`
    );

    if (!confirmRemove) {
      return;
    }

    try {
      if (!auth.currentUser) {
        alert("You are not logged in.");
        return;
      }

      const token = await auth.currentUser.getIdToken();

      const response = await fetch(
        `http://localhost:3000/users/${user._id}/demote`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

  // ==========================================
  // CLOSE PROMOTE MODAL
  // ==========================================

  function closeModal() {
    setShowModal(false);
    setEmail("");
    setRole("municipality");
  }

  // ==========================================
  // CLOSE PROFILE MODAL
  // ==========================================

  function closeProfile() {
    setShowProfile(false);
  }

  return (
    <div className="superadmin-container">

      <Navbar />

      {/* ====================================== */}
      {/* PROFILE BUTTON */}
      {/* ====================================== */}

      <button
        type="button"
        className="profile-button"
        onClick={getProfile}
        title="View Profile"
      >
        👤
      </button>


      {/* ====================================== */}
      {/* PAGE HEADER */}
      {/* ====================================== */}

      <h1>Super Admin Dashboard</h1>

      <p>Manage users and their roles.</p>


      {/* ====================================== */}
      {/* USERS TABLE */}
      {/* ====================================== */}

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

          {users.length === 0 ? (

            <tr>
              <td colSpan="4">
                No managers or superAdmins found.
              </td>
            </tr>

          ) : (

            users.map((user) => (

              <tr key={user._id}>

                {/* NAME */}
                <td>
                  {user.username ||
                    user.name ||
                    "No name"}
                </td>

                {/* EMAIL */}
                <td>
                  {user.email}
                </td>

                {/* ROLE */}
                <td>
                  {user.role}
                </td>

                {/* ACTION */}
                <td>

                  {user.role === "superAdmin" ? (

                    <span>
                      No action
                    </span>

                  ) : (

                    <button
                      type="button"
                      className="remove-role-button"
                      onClick={() =>
                        handleRemoveRole(user)
                      }
                    >
                      Remove Role
                    </button>

                  )}

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>


      {/* ====================================== */}
      {/* ADD / PROMOTE BUTTON */}
      {/* ====================================== */}

      <button
        type="button"
        className="add-button"
        onClick={() => setShowModal(true)}
      >
        +
      </button>


      {/* ====================================== */}
      {/* PROMOTE USER MODAL */}
      {/* ====================================== */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <h2>Promote User</h2>

            <p>
              Enter the email address of the user
              you want to promote.
            </p>

            <label htmlFor="user-email">
              Email
            </label>

            <input
              id="user-email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="Enter user email"
            />

            <label htmlFor="user-role">
              Role
            </label>

            <select
              id="user-role"
              value={role}
              onChange={(event) =>
                setRole(event.target.value)
              }
            >

              <option value="municipality">
                Municipality
              </option>

              <option value="manager">
                Manager
              </option>

            </select>

            <button
              type="button"
              onClick={handlePromote}
            >
              Promote
            </button>

            <button
              type="button"
              className="cancel"
              onClick={closeModal}
            >
              Cancel
            </button>

          </div>

        </div>

      )}


      {/* ====================================== */}
      {/* SUPER ADMIN PROFILE MODAL */}
      {/* ====================================== */}

      {showProfile && profile && (

        <div
          className="modal-overlay"
          onClick={closeProfile}
        >

          <div
            className="profile-modal"
            onClick={(event) => event.stopPropagation()}
          >

            {/* PROFILE ICON */}

            <div className="profile-icon-large">
              👤
            </div>

            <h2>
              My Profile
            </h2>

            {/* USERNAME */}

            <div className="profile-info">

              <div className="profile-row">
                <strong>Name:</strong>

                <span>
                  {profile.username ||
                    profile.name ||
                    "Not provided"}
                </span>
              </div>


              {/* EMAIL */}

              <div className="profile-row">
                <strong>Email:</strong>

                <span>
                  {profile.email || "Not provided"}
                </span>
              </div>


              {/* ROLE */}

              <div className="profile-row">
                <strong>Role:</strong>

                <span className="profile-role">
                  {profile.role}
                </span>
              </div>

            </div>


            {/* CLOSE */}

            <button
              type="button"
              className="cancel"
              onClick={closeProfile}
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default SuperAdmin;
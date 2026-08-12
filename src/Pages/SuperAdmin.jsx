// import { useEffect, useState } from "react";
// import "../Styling/SuperAdmin.css";

// function SuperAdmin() {
//     // const {user, logout} = useAuth();
//     const [users, setUsers] = useState([]);
//     const [showModal, setShowModal] = useState(false)
//     const [email, setEmail] = useState("");
//     const [role, setRole] = useState("user");

// useEffect(() => {
//     async function getUsers() {
//         try {
//             const response = await fetch( "http://localhost:3000/users", { headers: { Authorization: `Bearer ${user.token}`}});
//             const data = await response.json();
//             // console.log("Users:", data);
//             if (!response.ok) {
//                 // console.log(data.message);
//                 return
//             } setUsers(data);
//         } catch (error) {
//             console.error("Error fetching users:", error);
//         }
//     }
//     // if (user?.token) {
//     //     getUsers();
//     // }
// }, []);
// const handlePromote = async () => {
//     if (!email) {
//         alert("Please enter an email");
//         return
//     }
//     if (!role) {
//         alert("Please select a role");
//         return
//     }
//     try {
//         const response = await fetch("http://localhost:3000/users/promote",
//             {
//                 method: "PUT",
//                 headers: { Authorization: `Bearer ${user.token}`,"Content-Type": "application/json"},
//                 body: JSON.stringify({email: email,role: role})
//             }
//         );
//         const data = await response.json();
//         // console.log("Promotion response:", data);
//         if (!response.ok) {
//             alert(data.message);
//             return
//         }
//         // Adding the promoted user to table
//         setUsers((currentUsers) => [...currentUsers,data.user]);

//         setShowModal(false);
//         setEmail("");
//         setRole("user");
//     } catch (error) {
//         console.error(
//             "Promotion error:",error
//         );

//         alert("Unable to promote user.");
//     }
// };

// return (
//           <div className="superadmin-container">
//             <h1>Super Admin Dashboard</h1>
//             <p>Welcome</p>
//             <button> Logout</button>

//             <h2>Users</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Role</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {users.map((user) => (
//                         <tr key={user._id}>
//                             <td>{user.name}</td>
//                             <td>{user.email}</td>
//                             <td>{user.role}</td>
//                         </tr>
//                     ))}
//                 </tbody>

//             </table>
//             <button className="add-button" onClick={()=>setShowModal(true)}> + </button>
             
//     {showModal && ( 
//         <div className="modal-overlay">
//         <div className="modal">
//             <h2> Promote Users </h2>

//             <p> Promote users by entering their email and selecting new roles</p>
            
//             <label>Email</label>
//             <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter user email"/>
            
//             <label>Role</label>

//             <select value={role} onChange={(event) => setRole(event.target.value)}>
//             <option value="user"> User</option>
//             {/* <option value="superAdmin"> SuperAdmin </option> */}
//             <option value="municipality">Municipality </option>
//             </select>

//             <button onClick={handlePromote}>Promote</button>
//             <button className="cancel" onClick={() => setShowModal(false)}> Cancel </button>
//         </div>
//     </div>)}
//     </div>
// );
// }

// export default SuperAdmin
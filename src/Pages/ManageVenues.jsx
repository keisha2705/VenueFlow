import { useState } from "react";
import { auth } from "../lib/firebase";

function ManageVenues() {
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [capacity, setCapacity] = useState("");
    const [rows, setRows] = useState("");
    const [seatsPerRow, setSeatsPerRow] = useState("");

async function handleSubmit(event) {
    event.preventDefault();

    try {
        if (!auth.currentUser) {
            alert("Heya, You are not logged in!");
            return;
        }

        const token = await auth.currentUser.getIdToken();
        console.log("Firebase user:", auth.currentUser);
        console.log("Token exists:", !!token);
        console.log("Token:", token);

        const venue = {
            name,
            description,
            address,
            capacity: Number(capacity),
            rows: Number(rows),
            seatsPerRow: Number(seatsPerRow)
        };

        const response = await fetch("http://localhost:3000/venues", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(venue)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        // console.log(data);

        alert("Venue created successfully!");

        setName("");
        setDescription("");
        setAddress("");
        setCapacity("");
        setRows("");
        setSeatsPerRow("");

        setShowForm(false);

    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

    return (
        <div>
            <h1>Manage Venues</h1>

            <p>Here you can create and manage your venues.</p>

            <button onClick={() => setShowForm(!showForm)}>
                + Add Venue
            </button>

            {showForm && (
                <form onSubmit={handleSubmit}>

                    <h2>Create Venue</h2>

                    <label>Venue Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />

                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(event) =>
                            setDescription(event.target.value)
                        }
                        required
                    />

                    <label>Address</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(event) =>
                            setAddress(event.target.value)
                        }
                        required
                    />

                    <label>Capacity</label>
                    <input
                        type="number"
                        value={capacity}
                        onChange={(event) =>
                            setCapacity(event.target.value)
                        }
                        required
                    />

                    <label>Number of Rows</label>
                    <input
                        type="number"
                        value={rows}
                        onChange={(event) =>
                            setRows(event.target.value)
                        }
                        required
                    />

                    <label>Seats Per Row</label>
                    <input
                        type="number"
                        value={seatsPerRow}
                        onChange={(event) =>
                            setSeatsPerRow(event.target.value)
                        }
                        required
                    />

                    <button type="submit">
                        Create Venue
                    </button>

                    <button
                        type="button"
                        onClick={() => setShowForm(false)}
                    >
                        Cancel
                    </button>

                </form>
            )}
        </div>

    );
}

export default ManageVenues;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getAll, saveCommunity, deleteCommunity, editCommunity } from "utils/communitiesDB";

export default function AdminCommunities() {
    
    const [districts, setDistricts] = useState([]);
    const [schools, setSchools] = useState([]);
    const [form, setForm] = useState({
        type: "district",
        name: "",
        image: "",
        description: "",
        campaigns: "",
    });
    const [editing, setEditing] = useState(null);

    // Load from communities DB
    useEffect(() => {
        loadData();
    }, []);

    // Load data
    const loadData = async () => {
        try {
            setDistricts(await getAll("districts"));
            setSchools(await getAll("schools"));
        } catch (e) {
            console.error("error loading data ", e);
        }
    }

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: form.name,
            image: form.image,
            description: form.description,
            campaigns: form.type === "district" ? form.campaigns : undefined,
        };
        if (editing) {
            await saveToDB(form.type === "district" ? "districts" : "schools", data, editing);
            setEditing(null);
        } else {
            await saveToDB(form.type === "district" ? "districts" : "schools", data);
        }
        setForm({
            type: form.type,
            name: "",
            image: "",
            description: "",
            campaigns: "",
        });
    };

    // Save to DB
    const saveToDB = async (type, data, editId = null) => {
        if (editId) {
            await editCommunity(type, editId, data);
        } else {
            await saveCommunity(type, data)
        }

        if (type === "districts") {
            setDistricts(await getAll("districts"));
        } else if (type === "schools") {
            setSchools(await getAll("schools"));
        }
    };

    // delete from db
    const deleteFromDB = async (type, id) => {
        await deleteCommunity(type, id);

        if (type === "districts") {
            setDistricts(await getAll("districts"));
        } else if (type === "schools") {
            setSchools(await getAll("schools"));
        }
    };

    // Edit
    const handleEdit = (type, item) => {
        setEditing(item.id);
        setForm({
            type,
            name: item.name,
            image: item.image,
            description: item.description,
            campaigns: item.campaigns || "",
        });
    };

    // Cancel edit
    const handleCancel = () => {
        setEditing(null);
        setForm({
            type: "district",
            name: "",
            image: "",
            description: "",
            campaigns: "",
        });
    };

    // Delete
    const handleDelete = async (type, id) => {
        if (window.confirm("Are you sure you want to delete this entry?")) {
            await deleteFromDB(type, id);
        }
    };

  return (
    <>
        <div className="flex flex-wrap mt-4">
            <div className="w-full px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700">
                                    Manage Communities
                                </h3>
                            </div>
                        </div>


                        {/* Add/Edit Form */}
                        <form onSubmit={handleSubmit} className="mb-8 space-y-4 mt-8">
                            <div className="flex gap-4 mb-2">
                            <label>
                                <input
                                    type="radio"
                                    name="type"
                                    value="district"
                                    checked={form.type === "district"}
                                    onChange={() => setForm({ ...form, type: "district" })}
                                />{" "}
                                    District
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="type"
                                    value="school"
                                    checked={form.type === "school"}
                                    onChange={() => setForm({ ...form, type: "school" })}
                                />{" "}
                                School
                            </label>
                            </div>
                            <input
                                type="text"
                                placeholder={form.type === "district" ? "District Name" : "School Name"}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Image URL"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={form.image}
                                onChange={(e) => setForm({ ...form, image: e.target.value })}
                            />
                            <textarea
                                placeholder="Description"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                            />
                            {form.type === "district" && (
                            <input
                                type="text"
                                placeholder="Campaigns (comma separated)"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={form.campaigns}
                            />
                            )}
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-600 transition-all"
                                >
                                    {editing ? "Save" : "Add"}
                                </button>
                                {editing && (
                                    <button
                                        type="button"
                                        className="bg-gray-300 text-blueGray-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-400 transition-all"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>

                        {/* Districts List */}
                    <h3 className="text-xl font-semibold mb-4 text-blueGray-700">Districts</h3>
                    <ul className="divide-y divide-blueGray-100 mb-8">
                        {districts.length === 0 ? (
                            <li className="text-blueGray-400 py-4">No districts added yet.</li>
                            ) : (
                            districts.map((d) => (
                                <li key={d.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        {d.image && (
                                            <img src={d.image} alt={d.name} className="w-16 h-16 object-cover rounded-lg border" />
                                        )}
                                        <div>
                                        <div className="font-bold text-blueGray-800 text-lg">{d.name}</div>
                                        <div className="text-blueGray-500 text-sm">{d.description}</div>
                                        {d.campaigns && (
                                            <div className="text-xs text-blue-500 mt-1">
                                            Campaigns: {d.campaigns}
                                            </div>
                                        )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-2 md:mt-0">
                                        <button
                                            className="bg-yellow-400 text-white px-4 py-1 rounded-lg font-bold hover:bg-yellow-500 transition-all"
                                            onClick={() => handleEdit("district", d)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-4 py-1 rounded-lg font-bold hover:bg-red-600 transition-all"
                                            onClick={() => handleDelete("districts", d.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>

                    {/* Schools List */}
                    <h3 className="text-xl font-semibold mb-4 text-blueGray-700">Schools</h3>
                    <ul className="divide-y divide-blueGray-100">
                        {schools.length === 0 ? (
                        <li className="text-blueGray-400 py-4">No schools added yet.</li>
                        ) : (
                        schools.map((s) => (
                            <li key={s.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between">
                            <div className="flex items-center gap-4">
                                {s.image && (
                                <img src={s.image} alt={s.name} className="w-16 h-16 object-cover rounded-lg border" />
                                )}
                                <div>
                                <div className="font-bold text-blueGray-800 text-lg">{s.name}</div>
                                <div className="text-blueGray-500 text-sm">{s.description}</div>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-2 md:mt-0">
                                <button
                                className="bg-yellow-400 text-white px-4 py-1 rounded-lg font-bold hover:bg-yellow-500 transition-all"
                                onClick={() => handleEdit("school", s)}
                                >
                                Edit
                                </button>
                                <button
                                className="bg-red-500 text-white px-4 py-1 rounded-lg font-bold hover:bg-red-600 transition-all"
                                onClick={() => handleDelete("schools", s.id)}
                                >
                                Delete
                                </button>
                            </div>
                            </li>
                        ))
                        )}
                    </ul>
                </div>
            </div>
            </div>
        </div>
    </>
  );
}

import React, { useEffect, useState } from 'react';
import './ListProjects.css';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal'; // Import the confirmation modal component

const ListProjects = () => {
    // State for storing all projects
    const [projects, setProjects] = useState([]);
    // State for storing filtered projects based on search
    const [filteredProjects, setFilteredProjects] = useState([]);
    // State for storing the project currently being edited
    const [editProject, setEditProject] = useState(null);
    // State for storing search term for title and description
    const [searchTerm, setSearchTerm] = useState("");
    // State for storing search term for project ID
    const [searchByIdTerm, setSearchByIdTerm] = useState("");
    // State for controlling the visibility of the delete confirmation modal
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    // State for storing the ID of the project to be deleted
    const [projectToDelete, setProjectToDelete] = useState(null);

    // Fetch all projects from the API
    const fetchProjects = async () => {
        try {
            const response = await fetch('http://localhost:4000/allprojects');
            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }
            const data = await response.json();
            setProjects(data);
            setFilteredProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    // Fetch projects when the component mounts
    useEffect(() => {
        fetchProjects();
    }, []);

    // Handle the confirmation of project deletion
    const confirmDelete = (id) => {
        setProjectToDelete(id);
        setShowConfirmModal(true);
    };

    // Remove a project by ID after confirmation
    const removeProject = async () => {
        try {
            const response = await fetch('http://localhost:4000/removeproject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: projectToDelete }),
            });
            if (!response.ok) {
                throw new Error('Failed to remove project');
            }
            await fetchProjects(); // Refresh the project list
            setShowConfirmModal(false);
            setProjectToDelete(null);
        } catch (error) {
            console.error('Error removing project:', error);
        }
    };

    // Start editing a project
    const startEditing = (project) => {
        setEditProject(project);
    };

    // Cancel the editing mode
    const cancelEditing = () => {
        setEditProject(null);
    };

    // Save changes made to the project
    const saveChanges = async () => {
        try {
            const response = await fetch('http://localhost:4000/updateproject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editProject),
            });
            if (!response.ok) {
                throw new Error('Failed to update project');
            }
            setEditProject(null);
            await fetchProjects(); // Refresh the project list
        } catch (error) {
            console.error('Error updating project:', error);
            alert('Failed to update project');
        }
    };

    // Handle input changes during project editing
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditProject({ ...editProject, [name]: value });
    };

    // Handle search term change for title and description
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        const searchValue = e.target.value.toLowerCase();
        const filtered = projects.filter(project =>
            project.title.toLowerCase().includes(searchValue) ||
            project.description.toLowerCase().includes(searchValue)
        );
        setFilteredProjects(filtered);
    };

    // Handle search term change for project ID
    const handleSearchByIdChange = (e) => {
        setSearchByIdTerm(e.target.value);
    };

    // Filter projects by ID
    const filteredById = filteredProjects.filter(project =>
        project._id.toString().includes(searchByIdTerm.toLowerCase())
    );

    return (
        <div className='listprojects'>
            <h1>Project List</h1>
            <div className="listprojects-search-container">
                <input
                    type="text"
                    placeholder="Search by title or description..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="listprojects-search"
                />
                <input
                    type="text"
                    placeholder="Search by ID..."
                    value={searchByIdTerm}
                    onChange={handleSearchByIdChange}
                    className="listprojects-search"
                />
            </div>
            <div className="listprojects-format-main">
                <p>ID</p>
                <p>Title</p>
                <p>Description</p>
                <p>Image</p>
                <p>Client Link</p>
                <p>Status</p>
                <p>Actions</p>
            </div>
            <div className="listprojects-allprojects">
                {filteredById.map((project) => (
                    <div key={project._id} className="listprojects-format">
                        <p>{project._id}</p>
                        <p>{project.title}</p>
                        <p>{project.description}</p>
                        <img src={project.image} alt={project.title} className="listprojects-project-icon" />
                        <p>{project.client_link}</p>
                        <p>{project.status}</p>
                        <div className="listprojects-action-buttons">
                            {editProject && editProject._id === project._id ? (
                                <div className="listprojects-edit-mode">
                                    <input type="text" name="title" value={editProject.title} onChange={handleInputChange} />
                                    <textarea name="description" value={editProject.description} onChange={handleInputChange} />
                                    <input type="text" name="image" value={editProject.image} onChange={handleInputChange} />
                                    <input type="text" name="client_link" value={editProject.client_link} onChange={handleInputChange} />
                                    <select name="status" value={editProject.status} onChange={handleInputChange}>
                                        <option value="shown">Shown</option>
                                        <option value="hidden">Hidden</option>
                                    </select>
                                    <div className="listprojects-edit-actions">
                                        <button onClick={saveChanges}>Save</button>
                                        <button onClick={cancelEditing}>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <button className="listprojects-edit-button" onClick={() => startEditing(project)}>Edit</button>
                                    <button className="listprojects-remove-button" onClick={() => confirmDelete(project._id)}>Delete</button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {showConfirmModal && (
                <ConfirmDeleteModal 
                    message="Are you sure you want to delete this project?"
                    onConfirm={removeProject}
                    onCancel={() => setShowConfirmModal(false)}
                />
            )}
        </div>
    );
};

export default ListProjects;

import React, { useEffect, useState } from 'react';
import { ProjectCard } from "./ProjectCard";
import colorSharp2 from "../assets/images/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { Container, Row, Col, Button } from "react-bootstrap";

export const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [visibleProjectsCount, setVisibleProjectsCount] = useState(3); // Start with 3 projects visible

    // Fetch projects from the server
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:4000/allprojects');
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const data = await response.json();
                setProjects(data.filter(project => project.status === "shown")); // Filter only shown projects
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    // Show more projects
    const handleShowMore = () => {
        setVisibleProjectsCount(prevCount => Math.min(prevCount + 3, projects.length)); // Increase count but not exceed total projects
    };

    // Show fewer projects
    const handleShowLess = () => {
        setVisibleProjectsCount(prevCount => Math.max(prevCount - 3, 3)); // Decrease count but not below 3
    };

    return (
        <section className="project" id="projects">
            <Container>
                <Row>
                    <Col size={12}>
                        <TrackVisibility>
                            {({ isVisible }) =>
                                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                                    <h2>Projects</h2>
                                    <p>Explore a collection of my digital creations, ranging from intricate illustrations to dynamic design projects. Each piece showcases my passion for combining technology with artistic vision, tailored to bring innovative concepts to life. Dive into my portfolio to see how these projects push the boundaries of creativity.</p>
                                    <Row>
                                        {projects.slice(0, visibleProjectsCount).map((project) => (
                                            <ProjectCard
                                                key={project._id}
                                                title={project.title}
                                                description={project.description}
                                                imgUrl={project.image}
                                                clientLink={project.client_link}
                                            />
                                        ))}
                                    </Row>
                                    <div className="text-center mt-4">
                                        {visibleProjectsCount < projects.length && (
                                           <Button onClick={handleShowMore} className="btn show-more mr-2">
                                           Show More
                                       </Button>
                                        )}
                                        {visibleProjectsCount > 3 && (
                                            <Button onClick={handleShowLess} className="btn show-less">
                                            Show Less
                                        </Button>
                                        )}
                                    </div>
                                </div>
                            }
                        </TrackVisibility>
                    </Col>
                </Row>
            </Container>
            <img className="background-image-right" src={colorSharp2} alt="Background Shape"/>
        </section>
    );
};

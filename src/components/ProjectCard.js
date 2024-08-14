import { Col } from "react-bootstrap";

export const ProjectCard = ({ title, description, imgUrl, clientLink, status }) => {
    // Conditionally render based on status
    if (status === "hidden") {
        return null;
    }

    return (
        <Col sm={6} md={4}>
            <div className="proj-imgbx">
                <img src={imgUrl} alt={title} />
                <div className="proj-txtx">
                    <h4>{title}</h4>
                    <span>{description}</span>
                    {/* Conditionally render the link if it's available */}
                    {clientLink && (
                        <a href={clientLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            View Project
                        </a>
                    )}
                </div>
            </div>
        </Col>
    );
};

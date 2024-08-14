import { Container, Col, Row } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import meter1 from "../assets/images/meter1.svg"
import meter2 from "../assets/images/meter2.svg"
import meter3 from "../assets/images/meter3.svg"
import colorSharp from "../assets/images/color-sharp.png"

export const Skills = () => {
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    return (
        <section className="skill" id="skills">
            <Container>
                <Row>
                 <Col>
                    <div className="skill-bx">
                        <h2>
                            Skills
                        </h2>
                        <p>
                        As a digital artist, I specialize in digital illustration, graphic design, 3D modeling, and animation. I create visually compelling content for various media, including concept art, motion graphics, and web design. <br></br>My skills in photo manipulation, typography, and color theory ensure cohesive and impactful visuals, while my proficiency in design software and attention to detail guarantee polished results.</p>
                        <Carousel responsive={responsive} infinite={true} className="skill-slider">
                            <div className="item">
                                <img src={meter1} alt="Image" />
                                <h5>Concept Art</h5>
                            </div>
                            <div className="item">
                                <img src={meter2} alt="Image" />
                                <h5>Animation</h5>
                            </div>
                            <div className="item">
                                <img src={meter3} alt="Image" />
                                <h5>Web Design</h5>
                            </div>
                            <div className="item">
                                <img src={meter1} alt="Image" />
                                <h5>Concept Art</h5>
                            </div>
                        </Carousel>
                    </div>
                 </Col>
                </Row>
            </Container>
            <img className="background-image-left" src={colorSharp} />
        </section>
    )
}
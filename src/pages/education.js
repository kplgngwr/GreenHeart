import React from 'react';
import './education.css';

function Education() {
    return (
        <div className="education-page">
            <h1>Educational Videos & Content</h1>\
            <p>Feel free to request your query to be answered by our agriculture experts.</p>
            <div className="content-wrapper">

                <div className="left-section">
                    <div className="video-section">
                        <h2>Watch Video</h2>
                        <div className="video-container">
                            <video controls>
                                <source src="./media/Education1.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                    <div className="knowledge-content">
                        <h3>Learn About Organic Farming</h3>
                        <p>Explore various techniques and methods to enhance your farming practices...</p>
                    </div>
                    <div className="comments-section">
                        <h3>Comments</h3>
                        <textarea placeholder="Leave a comment..." rows="4"></textarea>
                        <button type="button">Submit Comment</button>
                    </div>
                </div>

                <div className="right-section">
                    <h2>Contact Us</h2>
                    <form>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required />

                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required />

                        <label htmlFor="query">Your Query:</label>
                        <textarea id="query" name="query" rows="4" required></textarea>

                        <button type="submit">Submit</button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Education;

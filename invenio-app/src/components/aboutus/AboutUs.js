import React, { Component } from 'react';
import pic1 from '../images/pic1.jpg';
import pic2 from '../images/pic2.jpg';

class AboutUs extends Component {
    render() {
        return (


            <div className="w3-content" style={{ 'max-width': '1200px' }}>
                <div className="w3-panel">
                    <i className="w3-xlarge fa fa-bars"></i>
                </div>
                {/* First Grid: Logo & About   */}
                <div className="w3-row">
                    <div className="w3-half w3-container">
                        <h1 className="w3-xxlarge w3-text-light-blue">Welcome</h1>
                        <h1 className="w3-xxlarge w3-text-grey">to Momi's page</h1>
                        <h1 className="w3-xlarge">About Me</h1>
                        <p className="">I love to create and make things beautiful. I am a good cook mainly Indian cuisine. I paint when I feel to paint. I find happiness in enlightening people.</p>
                    </div>
                    <div className="w3-half w3-container w3-xlarge w3-text-grey">
                        
                        <p>My Hobbies</p>
                        <p>My Hobbies</p>
                    </div>
                </div>

                {/* Second Grid: Resent   */}
                <div className="w3-panel w3-text-grey">
                    <h4>MOST RECENT WORK:</h4>
                </div>
                <div className="w3-row">
                    <div className="w3-half w3-container">
                        <img src={pic2} style={{width: '50%', height: '100%', transform: [{ rotate: '90deg' }]}} />
                    </div>
                    <div className="w3-half w3-container">
                        <img src={pic1} style={{width: '50%', maxHeight: '100%', imageOrientation: '90deg'}}  />
                        <p className="w3-xlarge w3-text-grey">
                            Demos, Logos, Reports, Names, Events, Media, Wordpress, Google, Books, Optimisations</p>
                    </div>
                </div>

            </div>

        );
    }
}

export default AboutUs;
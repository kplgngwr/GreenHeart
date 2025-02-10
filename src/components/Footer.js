import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <div id="footer">
            <div className="fboxes">
                <h4>MENU</h4>
                <p>Home</p>
                <p>Educational Resources</p>
                <p>Crop Vision</p>
            </div>
            <div className="fboxes">
                <h4>ABOUT</h4>
                <p>Our Company</p>
                <p>Our People</p>
                <p>FAQ's</p>
            </div>
            <div className="fboxes">
                <h4>LEGAL</h4>
                <p>Terms & Conditions</p>
                <p>Privacy Policy</p>
                <p>Cookies Policy</p>
            </div>
            <div className="fboxes">
                <h4>CONTACT US</h4>
                <p>+91 76176 84105</p>
                <p>kapilgangwar2003@gmail.com</p>
                <div id="linksicon">
                    <a href="https://youtube.com">
                        <img src="https://agrimp.com/assets/icons/youtube-d50ddd3463fca6474d8f6208acfe7fb9b6df4fd0115c7236be8ac898ff2950ec.png" alt="YouTube" />
                    </a>
                    <a href="https://facebook.com">
                        <img src="https://agrimp.com/assets/icons/facebook-095327a666a198711f2d886aca1aa54bc94eab123b47eb21143ca6371903c101.png" alt="Facebook" />
                    </a>
                    <a href="https://www.instagram.com/kapil.gngwr/">
                        <img src="https://agrimp.com/assets/icons/instagram-9be5bfed286b4ddea96d55630886df1171ce5b0373e678223fb985ba42b2962b.png" alt="Instagram" />
                    </a>
                    <a href="https://x.com/kplgngwr">
                        <img src="https://agrimp.com/assets/icons/twitter-decee6f4cc18e3928008dc9752990a79882421798c13b7a05add80724dcdde7b.png" alt="Twitter" />
                    </a>
                    <a href="https://www.linkedin.com/in/kplgngwr/">
                        <img src="https://agrimp.com/assets/icons/linkedin-86c3b329b493ce57e613118b55c8ddb281948e9953d386bb4e475ce04c7d24ab.png" alt="LinkedIn" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Footer;

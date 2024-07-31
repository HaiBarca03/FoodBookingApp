import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>Chúng tôi tự hào mang đến cho bạn những món ăn ngon nhất, được chế biến từ nguyên liệu tươi ngon và công thức độc đáo.
                        Hãy đến và thưởng thức trải nghiệm ẩm thực tuyệt vời cùng chúng tôi. <br /> <br /> Có câu hỏi hay yêu cầu? Hãy liên hệ với chúng tôi để được hỗ trợ nhanh chóng và tận tình. Chúng tôi luôn ở đây để đáp ứng nhu cầu của bạn. </p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+1-212-456-7890</li>
                        <li>contact@tomato.com</li>
                    </ul>
                </div>
                <div className='app-download' id='app-download'>
                    <h2>DOWNLOAD NOW</h2>
                    <p>For Better Experience Download <br /> Tomato App</p>
                    <div className="app-download-platforms">
                        <img src={assets.play_store} alt="" />
                        <img src={assets.app_store} alt="" />
                    </div>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">Copyright 2024 Tomato.com - All Right Reserved.</p>
        </div>
    )
}

export default Footer

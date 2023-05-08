import React from "react";
import styles from  "../styles/styles.module.scss"
function Footer()
{
    return (
        <>
            <footer className={styles.footer}>
                <div className="container">
                    <div className={styles.footer_content}>
                        <div className="footer-section about">
                            <h3 className="logo-text">Online Marketplace</h3>
                            <div className="contact">
                                <span><i className="fa fa-phone"></i> (123) 456-7890</span>
                                <span><i className="fa fa-envelope"></i> info@onlinemarketplace.com</span>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2023 Online Marketplace. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}
export default Footer
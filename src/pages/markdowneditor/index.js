import React from 'react';
import Styles from '../../assets/markdowneditor/styles';
import '../../assets/main.css'

const Markdowneditor = () =>{
    return (
        <div className={Styles.container}>
            <div className={Styles.introdution}>
                <h1>WELCOME TO MY MARKDOWNEDITOR</h1>
                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className={Styles.main}>
                <div className={Styles.leftcontent}>

                </div>
                <div className={Styles.rightcontent}>
                    
                </div>
            </div>
        </div>
    );
};

export default Markdowneditor;
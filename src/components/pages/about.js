import React, { Component } from 'react';
import * as firebase from 'firebase';
import { BrowserRouter } from 'react-router-dom';


class About extends Component {
 
  render() {
    return (
      <div className="about" style={{background:"white",width:"90%",position:"absolute",left:"5%"}}>
     <div className='container-fluid'>

  <div class="w3-container w3-padding-32" id="about">
    <h3 class="w3-border-bottom w3-border-light-grey w3-padding-16">About NiteBite</h3>
    <p>NiteBite is a project that details a way of minimizing food waste, turning more profit for restaurants, and saving money for both clients and businesses. This can be achieved by selling perfectly good food at a discount that would otherwise be thrown out at closing time for restaurants. By providing readily access to said food, businesses can create less waste while boasting an increasingly successful business model that exaggerates more money and less waste. 
    </p>
  </div>

  <div className="w3-row-padding w3-grayscale">
    <div className="w3-col l3 m6 w3-margin-bottom">
      <img src="https://firebasestorage.googleapis.com/v0/b/nitebite-v3.appspot.com/o/images%2F12144878_10153334305237737_7026250362740306234_n.jpg?alt=media&token=690caa00-e4df-4252-87e1-836a4ca70636" alt="Vlad" style={{width:"100%",height:"470px"}}></img>
      <h3>Vlad Puscasu</h3>
      <p className="w3-opacity"style={{color:"darkgrey"}}>Teamlead & Developer</p>
      <p>Vlad worked on the User App back-end/front-end.  Also the Teamlead.</p>
      <p><button className="Contact"style={{width:"100%"}}>Contact</button></p>
    </div>
    <div className="w3-col l3 m6 w3-margin-bottom">
      <img src="https://media.discordapp.net/attachments/305039773259792394/564936737541849089/meonturtle.jpg?width=264&height=468" alt="Jerad" style={{width:"100%",height:"470px"}}></img>
      <h3>Jerad Cho</h3>
      <p className="w3-opacity"style={{color:"darkgrey"}}>Developer</p>
      <p>Jerad worked on the Admin/Vendor module and the back-end of the app.</p>
      <p><button className="Contact"style={{width:"100%"}}>Contact</button></p>
    </div>
    <div className="w3-col l3 m6 w3-margin-bottom">
      <img src="https://firebasestorage.googleapis.com/v0/b/nitebite-v3.appspot.com/o/images%2Fimage1.jpeg?alt=media&token=ab36f4af-e530-4eef-81c5-e5d365e6ad44" alt="Matt" style={{width:"100%",height:"470px"}}></img>
      <h3>Matthew Price</h3>
      <p className="w3-opacity"style={{color:"darkgrey"}}>Developer</p>
      <p>Matthew worked on the Admin/Vendor module and the back-end of the app.</p>
      <p><button className="Contact"style={{width:"100%"}}>Contact</button></p>
    </div>
    <div className="w3-col l3 m6 w3-margin-bottom">
      <img src="http://allthingsd.com/files/2012/01/questionmark.png" alt="Namish" style={{width:"100%",height:"470px"}}></img>
      <h3>Naimish Ribadiya</h3>
      <p className="w3-opacity"style={{color:"darkgrey"}}>Developer</p>
      <p>A consultant coder who worked on various aspects of the project.</p>
      <p><button className="Contact"style={{width:"100%"}}>Contact</button></p>
    </div>
  </div>
</div>
</div>
    );
  }
}

export default About;

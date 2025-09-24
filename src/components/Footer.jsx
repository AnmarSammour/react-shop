import React from 'react';
 import { Fresh , Truck , Daily , Price , Call , Facebook , Twitter , Instagram} from './icon';
 import googleApp from '../images/googleApp.png';
 import appStore from '../images/AppStore.png';
 import payment from '../images/Payment.png';

const Footer = () => {
  return (
    <footer className=" py-5">
      {/* Newsletter Section */}
      <div className="w-100 newsletter-section position-relative overflow-hidden text-white">
        <div className="container h-100 position-relative">
          <div className="row text-center h-100 text-md-start mb-4 p-4 rounded-3 mx-0 d-flex justify-content-between align-items-center">
            <div className="col-md-6 CopunOrder d-flex flex-column justify-content-center align-items-center align-items-md-start mb-3 mb-md-0">
              <p className="mb-2 text-white fw-light" style={{fontSize : 16}}><u>20$ discount</u> for your first order</p>
              <h4 className=" text-white">Join our newsletter and get...</h4>
              <p className=" text-white-50" style={{fontSize : 13}}>
                Join our email subscription now to get updates on promotions and coupons.
              </p>
              <form className="d-flex w-100 w-md-75 FormEmail position-relative ">
                <input
                  type="email"
                  className=" w-100 InputEmail rounded-1 border-0 ps-3"
                  placeholder=  " Your email address"
                />
                <button type="submit" className=" border-0 text-white btnSubmit rounded-1 position-absolute end-0 mx-1">
                  Subscribe
                </button>
              </form>
            </div>
            <div className="col-md-6 d-flex align-items-end justify-content-center justify-content-md-end position-absolute top-0 end-0">
              <img src="images/coupon.png" width={490} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-100 bg-light">
        <div className="container pt-5">
          {/* Feature Section */}
          <div className="row text-center d-flex justify-content-between align-items-center features-section fw-medium border-bottom ">
            <div className="col-6 col-md-3 ">
              <p className="d-flex align-items-center justify-content-center">
                <Fresh /> &nbsp; Everyday fresh products
              </p>
            </div>
            <div className="col-6 col-md-3">
              <p className="d-flex align-items-center justify-content-center border-start">
                <Truck /> &nbsp; Free delivery over 70$
              </p>
            </div>
            <div className="col-6 col-md-3">
              <p className="d-flex align-items-center justify-content-center border-start">
                <Daily /> &nbsp; Daily Mega Discounts
              </p>
            </div>
            <div className="col-6 col-md-3">
              <p className="d-flex align-items-center justify-content-center border-start">
                <Price /> &nbsp; Best price on the market
              </p>
            </div>
          </div>

          {/* Links Section */}
          <div className="row text-center text-md-start mt-4 link-section">
            <div className="col-6 col-md-2 mb-3">
              <h5 className="fw-bold">Confectionery & Chocolate</h5>
              <ul className="list-unstyled fw-normal">
                <li>Quality Street Collisions Caramel & Hazelnut</li>
                <li>KitKat Chunky White Chocolate</li>
                <li>Aero Peppermint Chocolate Bar</li>
                <li>Quality Street Collisions</li>
                <li>KitKat Chunky Peanut Butter</li>
                <li>Aero Milk Chocolate Bar</li>
            
               
              </ul>
            </div>
            <div className="col-6 col-md-2 mb-3">
              <h5 className="fw-bold"> Biscuits & Snacks</h5>
              <ul className="list-unstyled fw-normal">
                <li>SunChips Harvest Cheddar Multigrain Snacks</li>
                <li>Cheetos Frito Lay Crunchy Cheese Flavored</li>
                <li>Frito Lay Cheetos Crunchy Flamin Hot</li>
                <li>Fritos Corn Snacks, Queso Flavored</li>
                     
              </ul>
            </div>
            <div className="col-6 col-md-2 mb-3">
              <h5 className="fw-bold">Breakfast & Dairy</h5>
              <ul className="list-unstyled fw-normal">
                <li>Quaker Instant Oatmeal Maple & Brown Sugar</li>
                <li>Quaker Instant Oatmeal Apples & Cinnamon</li>
                <li>Quaker Instant Grits, Original Flavor</li>
                <li>Quaker Breakfast Flats Blueberry</li>
             
                
              </ul>
            </div>
            <div className="col-6 col-md-2 mb-3">
              <h5 className="fw-bold">Grocery & Staples</h5>
              <ul className="list-unstyled fw-normal">
                <li>Betty Crocker™ Rainbow Chip Rich & Creamy</li>
                <li>Betty Crocker™ Whipped Strawberry Mist</li>
                <li>Betty Crocker™ Whipped Fluffy White </li>
                <li>Betty Crocker™ Lemon Rich & Creamy </li>

              </ul>
            </div>
            <div className="col-6 col-md-2 mb-3">
              <h5 className="fw-bold">BEVERAGES</h5>
              <ul className="list-unstyled fw-normal">
                  <li>Coca-Cola Diet Coke Low-Calorie Soft Drink</li>
                  <li>Coca-Cola Sprite Lemon-Lime Soft Drink</li>
                  <li>Coca-Cola Fanta Orange Flavored Soda</li>
                <li>Coca-Cola 2 Liter Soda Pop Classic</li>
              
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container h-100 mt-4 ">
        <div className="row h-100 d-flex justify-content-between align-items-center text-center text-md-start border-bottom">
          <div className="col-12 col-md-4 mb-3">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start">
              <div className="d-flex">
                <div className="rounded-circle border CallIcon d-flex justify-content-center align-items-center">
                  <Call />
                </div>
                <div className="px-3">
                  <p className="mb-0 numIcon fw-bold">8 800 555-55</p>
                  <p className="small opacity-75 WeakNum">Mon-Fri: 08:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-8 d-flex flex-column flex-md-row justify-content-end align-items-center gap-3">
            <div className="AppMobile text-center text-md-start">
              <p className="mb-0 fw-bold">Download App on Mobile :</p>
              <p className="opacity-75" style={{ fontSize: 12 }}>
                15% discount on your first purchase
              </p>
            </div>
            <div className="d-flex flex-wrap mb-3 justify-content-center gap-2">
              <img src={googleApp} width={110} height={38} alt="" />
              <img src={appStore} width={110} height={38} alt="" />
            </div>
            <div className="TeamIconSocial d-flex justify-content-center gap-2">
              <p className="border rounded-circle d-flex justify-content-center align-items-center">
                <Facebook />
              </p>
              <p className="border rounded-circle d-flex justify-content-center align-items-center">
                <Twitter />
              </p>
              <p className="border rounded-circle d-flex justify-content-center align-items-center">
                <Instagram />
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3 text-center text-md-start copyright-bar">
  <p className="small text-muted mb-2 mb-md-0" style={{ fontSize: 16 }}>
    &copy; 2025 All rights reserved by Blackstone Theme
  </p>

  <div className="d-flex flex-column flex-md-row justify-content-end align-items-center gap-3">
    <ul className="list-inline ListCopy mb-0 d-flex flex-wrap justify-content-center justify-content-md-end">
      <li className="list-inline-item">
        <a href="#" className="nav-link pb-2 text-muted small">Privacy Policy</a>
      </li>
      <li className="list-inline-item">
        <a href="#" className="nav-link pb-2 text-muted small">Terms and Conditions</a>
      </li>
      <li className="list-inline-item">
        <a href="#" className="nav-link pb-2 text-muted small">Cookie</a>
      </li>
    </ul>

    <div className="payment-icons">
      <img src={payment} alt="Payment Methods" />
    </div>
  </div>
</div>

      </div>
    </footer>
  );
};

export default Footer;



import People from "../images/about-people.png"
function AboutUs() {
  return (
    <div className="about-text">
      <div className="about-hero text-center text-white d-flex align-items-center justify-content-center position-relative">
        <div className="w-75 px-4">
          <h1 className="fw-bold display-4">About for Bacola</h1>
          <p className="fs-5">We can be more for you</p>
        </div>
      </div>
      <div className="container my-5">
        <p className="custom-font-size mx-auto about-width">
          In nec porta augue massa euismod felis. Duis condimentum elit a libero
          convallis luctus. Donec eget dapibus orci, iaculis aliquet tellus.
          Etiam convallis est vitae nibh. Nullam ut lorem ac. Aenean at lacus
          rhoncus libero faucibus posuere eu nec ipsum. Quisque vitae varius
          tortor, vel ultricies sapien. Sed volutpat, mauris eget tincidunt
          fermentum, urna leo tincidunt est, in ullamcorper leo velit eu nunc.
          Curabitur accumsan lacus sed lorem facilisis blandit. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas.
        </p>
        <h4 className="w-75 mx-auto my-4 fs-4 px-5 fw-bold about-width">
          Quisque erat urna, congue et libero in
            

          eleifend euismod velit.
        </h4>
        <p className="w-75 mx-auto custom-font-size px-5 about-width">
          In nec porta augue massa euismod felis. Duis condimentum elit a libero
          convallis luctus. Bacola augue dapibus orci, iaculis aliquet tellus.
          Etiam convallis est vitae nibh. Nullam ut lorem ac. Aenean at lacus
          rhoncus libero faucibus posuere eu nec ipsum. Quisque vitae varius
          tortor, vel ultricies sapien. Sed volutpat, mauris eget tincidunt
          fermentum, urna leo tincidunt est, in ullamcorper leo velit eu nunc.
          Curabitur accumsan lacus sed lorem facilisis blandit. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas.
        </p>
      </div>
      <div className="container position-relative about-width">
        <div className="row align-items-center">
          <div className="col-md-6 position-relative">
            <img
              src={People}
              alt="About People"
              className="img-fluid rounded"
            />
            <div className="about-text-box position-absolute start-50 translate-middle-x bg-white p-4 rounded shadow">
              <p className="custom-font-size text-dark mb-0 px-3">
                In nec purus eget neque accumsan finibus. Duis condimentum elit
                ut libero commodo iaculis. Donec augue diam, tristique et
                ultricies nec, consectetur quis enim. Nullam id rutrum ex.
                Aliquam a lectus id lacus rhoncus dapibus non ac justo. Vivamus
                lacinia vestibulum metus in dapibus. Vestibulum sit amet
                sollicitudin enim. Ut id interdum turpis. Curabitur porta auctor
                quam, pretium facilisis nisl. Pellentesque efficitur elit ante,
                vel vulputate tortor blandit nec.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <p className="fw-semibold fs-6 px-4">Rachel Leonard – Bacola CEO</p>
            <h4 className="fw-bold fs-4 mb-4">
              Duis convallis luctus pretium. Pellentesque habitant morbi
            </h4>
            <p className="ms-4 custom-font-size px-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
              accumsan lacus vel facilisis.
            </p>
            <p className="ms-4 custom-font-size px-1">
              In fermentum mi ut sapien semper, a sagittis lorem vulputate.
              Integer gravida, dui eget aliquet tempus, turpis orci vehicula
              ipsum, eget porttitor sapien tortor at neque. Cras id pulvinar
              lacus, ac volutpat neque. Ut at magna id justo bibendum lobortis.
              Integer tortor nulla, ultricies et nisi sit amet, interdum dictum
              felis. In semper laoreet dui vitae pharetra. Etiam sit amet
              molestie nulla, eu efficitur orci. Praesent rutrum ante justo,
              eget malesuada ante ornare ac. Ut dignissim blandit urna, eget
              euismod leo rhoncus nec. Vestibulum ante ipsum primis in faucibus
              orci luctus et ultrices posuere cubilia curae; Quisque lobortis
              libero ante. Nullam in feugiat erat. Aenean sed justo dapibus,
              sodales nisi ut, fringilla lorem. Vestibulum in orci ac nisl
              condimentum fermentum at et sem. Curabitur fermentum dolor eu
              lacus consectetur varius.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white py-lg-5 mt-lg-5 mt-3 "> 
        <div className="container">
          <p className="mx-auto custom-font-size px-4 about-width">
            In nec purus eget neque accumsan finibus. Duis condimentum elit ut
            libero commodo iaculis. Donec augue diam, tristique et ultricies
            nec, consectetur quis enim. Nullam id rutrum ex. Aliquam a lectus id
            lacus rhoncus dapibus non ac justo. Vivamus lacinia vestibulum metus
            in dapibus. Vestibulum sit amet sollicitudin enim. Ut id interdum
            turpis. Curabitur porta auctor quam, pretium facilisis nisl.
            Pellentesque efficitur elit ante, vel vulputate tortor blandit nec.
          </p>
        </div>
      </div>
    </div>
  );
}
export default AboutUs

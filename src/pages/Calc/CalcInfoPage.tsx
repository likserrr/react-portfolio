import React, { FC } from 'react';

import './css/calc.css';

const CalcInfoPage: FC = () => {
  return (
    <div className="widget" style={{ height: '105%' }}>
      <h1>About The Widget</h1>
      <p style={{ textAlign: 'left' }}>
        &nbsp;&nbsp;<b>Work with:</b> states, refs, data attributes, case/switch
        <br />
        &nbsp;&nbsp;<b>Hooks:</b> useState, useRef; &nbsp;&nbsp;
        <br />
        &nbsp;&nbsp;<b>About widget:</b> A primitive, quickly written component
        (less than an hour) with the simplest logic
        <br />
        <br />
        &nbsp;&nbsp;<b>Interesting moments:</b>
        &nbsp;Was much more interesting to implement switching between app
        <br />
        &nbsp;&nbsp;<b>Work with:</b> Routes, link, navigate, useLocation,
        render 2 sides card, useEffect([ location.pathname ]), setTimeout for
        animation
        <br />
        &nbsp;&nbsp;<b>About Work:</b> The main difficulty is that the back side
        of the card must always be drawn. The PageHandler stores all the pages
        and, depending on the location, must pass the content for the reverse
        side card, as well as paths to new app, to the CardFlip wrapper.
        CardFlip, when switching to a new application, must draw the content
        passed through route children onto the reverse side and flip the card,
        after which the PageHandler waits for the animation to finish and passes
        page
      </p>
      <p className="widget_github">
        Check the code !
        <br />
        <a
          href="https://github.com/likserrr/react-portfolio/tree/main/src/pages/Calc"
          target="_blank">
          GitHub && this widget
        </a>
      </p>
      <p className="author">
        Author && Ostashkin Kirill
        <br />
        <a href="https://github.com/likserrr" target="_blank">
          GitHub && likserrr
        </a>
      </p>
    </div>
  );
};

export default CalcInfoPage;

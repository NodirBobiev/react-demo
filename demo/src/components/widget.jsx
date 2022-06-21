import React, { useEffect, useState } from "react";
import styled from "styled-components";

class Vector {
  x = 0;
  y = 0;
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
  }

  getDifference(vct) {
    return new Vector({ x: this.x - vct.x, y: this.y - vct.y });
  }

  getSummation(vct) {
    return new Vector({ x: this.x + vct.x, y: this.y + vct.y });
  }

  getSquaredMagnitude() {
    return Math.pow(this.x, 2) + Math.pow(this.y, 2);
  }

  getMagnitude() {
    return Math.sqrt(this.getSquaredMagnitude());
  }

  getNormalized() {
    const magnitude = this.getMagnitude();
    return new Vector({ x: this.x / magnitude, y: this.y / magnitude });
  }

  getMultiplied(scalar) {
    return new Vector({ x: this.x * scalar, y: this.y * scalar });
  }
}

const Widget = ({ id, size, speed, fps }) => {
  const SECOND_MS = 1000;
  const [destination, setDestination] = useState(new Vector({ x: 0, y: 0 }));
  const [mousePos, setMousePos] = useState(new Vector({ x: 0, y: 0 }));

  const updateOnFrame = () => {
    const wdg = document.getElementById(id);
    const { left, top } = wdg.getBoundingClientRect();
    const widgetPos = new Vector({ x: left, y: top });
    const difference = mousePos.getDifference(
      widgetPos.getSummation({ x: size.width / 2, y: size.height / 2 })
    );
    const diffMagnitude = difference.getMagnitude();
    const frameStep = speed / fps;
    const normVector = difference.getNormalized();
    const newPos = widgetPos.getSummation(
      normVector.getMultiplied(Math.min(frameStep, diffMagnitude))
    );

    // console.log(
    //   mousePos,
    //   widgetPos,
    //   difference,
    //   diffMagnitude,
    //   frameStep,
    //   normVector,
    //   newPos
    // );
    setDestination(newPos);
  };

  const mouseMove = ({ clientX, clientY }) => {
    setMousePos(new Vector({ x: clientX, y: clientY }));
  };

  useEffect(() => {
    document.addEventListener("mousemove", mouseMove);
    const interval = setInterval(updateOnFrame, SECOND_MS / fps);
    return () => {
      document.removeEventListener("mousemove", mouseMove);
      clearInterval(interval);
    };
  });
  return <Div id={id} destination={destination} size={size}></Div>;
};

export default Widget;

const Div = styled.div.attrs(({ destination, size }) => ({
  style: {
    transform: `translate(${destination.x}px, ${destination.y}px)`,
    // transitionDuration: `${transDur}s`,
    width: `${size.width}px`,
    height: `${size.height}px`,
  },
}))`
  background-color: #452345;
  border-radius: 40px;
`;

import React from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

interface FadeTransitionProps {
  children: React.ReactNode;
  keyValue: string;
  timeout?: number;
}

const FadeTransition: React.FC<FadeTransitionProps> = ({ 
  children, 
  keyValue, 
  timeout = 300 
}) => {
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={keyValue}
        timeout={timeout}
        classNames="fade"
        unmountOnExit
        mountOnEnter
      >
        <div className="transition-container">
          {children}
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default FadeTransition;
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Card, CardBody } from '@nextui-org/react';

const AnimatedCard = ({ h1, p, duration }) => {
    const { ref, inView } = useInView({
        threshold: 0.7,
        triggerOnce: false, // Asegúrate de que el observer se active cada vez que el elemento entre/salga de la vista
    });

    return (
        <Card 
            isBlurred={true} 
            ref={ref} 
            shadow="lg" 
            className={`animate-duration-[${duration}ms] animate-ease-in w-72 h-36 bg-background/100 dark:bg-default-100/5 card ${inView ? 'animate-fade-right opacity-100' : 'opacity-0'}`}
        >
            <CardBody className="items-center justify-center">
                <h1 className="text-center text-5xl">{h1}</h1>
                <p className="text-center">{p}</p>
            </CardBody>
        </Card>
    );
};

export default AnimatedCard;

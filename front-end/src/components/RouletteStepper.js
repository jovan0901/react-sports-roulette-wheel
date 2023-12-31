import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button, Container } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import GroupStep from "./GroupStep";
import TeamStep from "./TeamStep";
import EventStep from "./EventStep";
import WheelStep from "./WheelStep";

const steps = ["Select Group", "Select Team", "Select Event", "Select Winner"];

const RouletteStepper = () => {
    const [activeStep, setActiveStep] = useState(0);

    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <GroupStep
                        onSelectGroup={(group) => setSelectedGroup(group)}
                        onHandleNext={handleNext}
                    />
                );
            case 1:
                return (
                    <TeamStep
                        selectedGroup={selectedGroup}
                        onSelectTeam={(team) => setSelectedTeam(team)}
                        onHandleNext={handleNext}
                    />
                );
            case 2:
                return (
                    <EventStep
                        selectedGroup={selectedGroup}
                        selectedTeam={selectedTeam}
                        onSelectEvent={(event) => setSelectedEvent(event)}
                        onHandleNext={handleNext}
                    />
                );
            case 3:
                return (
                    <WheelStep
                        selectedEvent={selectedEvent}
                        onResult={(result) => console.log(result)}
                    />
                );
            default:
                return "Unknown step";
        }
    };

    return (
        <Container>
            <Stepper activeStep={activeStep} alternativeLabel className="p-1 mb-5">
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>
                            <span className="color-white">{label}</span>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div className="d-flex align-flex-start">
                <Button
                    disabled={activeStep === 0 || activeStep === 3}
                    onClick={handleBack}
                    className="mr-2"
                >
                    <ArrowBackIcon
                        fontSize="large"
                        className="cursor-pointer b b-radius-50 color-white"
                    />
                </Button>

                {getStepContent(activeStep)}
            </div>
        </Container>
    );
};

export default RouletteStepper;
